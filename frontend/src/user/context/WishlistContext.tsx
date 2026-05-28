// src/user/context/WishlistContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import { useAuth } from '@/auth/AuthContext';

export interface WishlistItem {
  id: number; // backend wishlist row ID
  productId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number; // ✅ NEW
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void; // ✅ FIXED MEANING
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  fetchWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const API_URL = 'http://localhost:8081/api/wishlist';

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    if (!user?.id) {
      setWishlist([]);
      return;
    }
    try {
      const res = await axios.get<WishlistItem[]>(
        `${API_URL}/user/${user.id}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setWishlist(res.data || []);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.id]);

  /* ================= ADD TO WISHLIST ================= */
  const addToWishlist = async (productId: number) => {
    if (!user?.id) return;
    try {
      const res = await axios.post(
        `${API_URL}/user/${user.id}/add/${productId}`,
        null,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setWishlist(res.data || []);
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (productId: number) => {
    if (!user?.id) return;
    try {
      const res = await axios.delete(
        `${API_URL}/user/${user.id}/remove/${productId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setWishlist(res.data || []);
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  /* ================= CLEAR WISHLIST ================= */
  const clearWishlist = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.delete(
        `${API_URL}/user/${user.id}/clear`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setWishlist(res.data || []);
    } catch (err) {
      console.error('Failed to clear wishlist:', err);
    }
  };

  /* ================= CHECK ================= */
  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length, // ✅ AUTO UPDATES NAVBAR
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
