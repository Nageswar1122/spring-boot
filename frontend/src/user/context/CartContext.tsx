import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "@/auth/AuthContext";
import { Product, CartItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  fetchCartFromBackend: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const API_URL = "http://localhost:8081/api/cart";

  /* ================= FETCH ================= */
  const fetchCartFromBackend = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`${API_URL}/${user.id}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err: any) {
      console.error("Failed to fetch cart from backend:", err);
      setCartItems([]);
      toast({
        title: "Failed to fetch cart",
        description: err.response?.data || err.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCartFromBackend();
  }, [user?.id]);

  /* ================= ADD ================= */
  const addToCart = async (product: Product, quantity = 1) => {
  if (!user?.id) return;

  try {
    await axios.post(
      `${API_URL}/${user.id}/add/${product.id}`,
      null,
      {
        params: { quantity },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await fetchCartFromBackend();
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      "Failed to add to cart";

    console.error("Failed to add to cart:", msg);
  }
};

  /* ================= UPDATE ================= */
  const updateQuantity = async (productId: number, quantity: number) => {
  if (!user?.id) return;

  try {
    await axios.put(
      `${API_URL}/update/${user.id}/${productId}`,
      null,
      {
        params: { qty: quantity },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await fetchCartFromBackend();
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      "Failed to update quantity";

    console.error("Failed to update quantity:", msg);
  }
};

  /* ================= REMOVE ================= */
  const removeFromCart = async (productId: number) => {
  if (!user?.id) return;

  try {
    await axios.delete(`${API_URL}/${user.id}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchCartFromBackend();
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      "Failed to remove item";

    console.error("Failed to remove from cart:", msg);
  }
};

  /* ================= CLEAR ================= */
  const clearCart = async () => {
  if (!user?.id) return;

  try {
    await axios.delete(`${API_URL}/${user.id}/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCartItems([]);
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      "Failed to clear cart";

    console.error("Failed to clear cart:", msg);
  }
};

  const getCartSubtotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartSubtotal,
        getCartTotal,
        fetchCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
