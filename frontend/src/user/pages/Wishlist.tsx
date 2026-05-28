import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/user/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/auth/AuthContext';
import axios from 'axios';

/* ================= TYPES ================= */
interface WishlistItem {
  id: number;           // wishlist row ID
  productId: number;    // product ID (IMPORTANT)
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
}

/* ================= COMPONENT ================= */
const Wishlist: React.FC = () => {
  const { user, token } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8081/api/wishlist';

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await axios.get<WishlistItem[]>(
        `${API_URL}/user/${user.id}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setWishlist(res.data || []);
    } catch (err: any) {
      console.error('Failed to fetch wishlist:', err);
      toast({
        title: 'Error',
        description: err?.response?.data?.message || 'Failed to load wishlist',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.id]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.productId,
      name: item.name,
      brand: item.brand,
      image: item.image,
      price: item.price ?? 0,
      originalPrice: item.originalPrice,
      rating: item.rating ?? 0,
      quantity: 1,
    });

    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  /* ================= REMOVE ITEM (FIXED) ================= */
  const handleRemove = async (productId: number) => {
    if (!user?.id) return;

    try {
      const res = await axios.delete(
        `${API_URL}/user/${user.id}/remove/${productId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      setWishlist(
        res.data || wishlist.filter(item => item.productId !== productId)
      );

      toast({ title: 'Removed from wishlist' });
    } catch (err: any) {
      console.error('Failed to remove from wishlist:', err);
      toast({
        title: 'Error',
        description: err?.response?.data?.message || 'Could not remove item',
      });
    }
  };

  /* ================= CLEAR WISHLIST ================= */
  const handleClearWishlist = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.delete(
        `${API_URL}/user/${user.id}/clear`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setWishlist(res.data || []);
      toast({ title: 'Wishlist cleared' });
    } catch (err: any) {
      console.error('Failed to clear wishlist:', err);
      toast({
        title: 'Error',
        description: err?.response?.data?.message || 'Could not clear wishlist',
      });
    }
  };

  /* ================= EMPTY STATE ================= */
  if (!loading && wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-2xl font-display font-bold mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-muted-foreground mb-6">
          Save items you love to your wishlist and shop them later.
        </p>
        <Link to="/products">
          <Button className="gradient-primary shadow-primary">
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlist.length} items saved</p>
        </div>
        <Button variant="outline" onClick={handleClearWishlist}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item, index) => (
          <Card
            key={item.id ?? `${item.productId}-${index}`}
            className="group overflow-hidden border-0 shadow-md"
          >
            <Link to={`/products/${item.productId}`}>
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>

            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {item.brand}
              </p>

              <Link to={`/products/${item.productId}`}>
                <h3 className="font-medium line-clamp-2 mb-2 hover:text-primary">
                  {item.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded text-sm font-medium">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {item.rating ?? 0}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold">
                  ${item.price?.toFixed(2) ?? '0.00'}
                </span>
                {item.originalPrice != null && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 gradient-primary shadow-primary"
                  size="sm"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive"
                  onClick={() => handleRemove(item.productId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
