// src/user/pages/Orders.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Eye, XCircle, Truck, CheckCircle, Clock, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/auth/AuthContext';
import axios from 'axios';

/* ================= TYPES ================= */
interface OrderItem {
  id: number;
  productId: number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

/* ================= COMPONENT ================= */
const Orders: React.FC = () => {
  const { toast } = useToast();
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:8081/api/orders';

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<Order[]>(`${API_URL}/user/${user.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error('Failed to fetch orders:', err);
      setError(err?.response?.data || 'Failed to load orders');
      setOrders([]);
      toast({
        title: 'Error',
        description: err?.response?.data || 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL ORDER ================= */
  const handleCancelOrder = async (orderId: number) => {
    if (!user?.id) return;

    try {
      await axios.post(
        `${API_URL}/${orderId}/cancel`,
        null,
        {
          params: { userId: user.id },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      toast({
        title: 'Order Cancelled',
        description: `Order ${orderId} has been cancelled successfully.`,
      });

      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
      );
    } catch (err: any) {
      console.error('Failed to cancel order:', err);
      toast({
        title: 'Failed',
        description: err?.response?.data || `Could not cancel order ${orderId}.`,
        variant: 'destructive',
      });
    }
  };

  /* ================= STATUS ICONS & COLORS ================= */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  /* ================= RENDER LOADING ================= */
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <p className="text-lg font-medium">Login to check orders...</p>
      </div>
    );
  }

  /* ================= RENDER EMPTY STATE ================= */
  if (!loading && orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-2xl font-display font-bold mb-2">No Orders Yet</h1>
        <p className="text-muted-foreground mb-6">
          You haven't placed any orders yet. Start shopping!
        </p>
        <Link to="/products">
          <Button className="gradient-primary shadow-primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  /* ================= RENDER ORDERS ================= */
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>

      {error && (
        <p className="text-red-600 mb-4 font-medium">{error}</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="border-0 shadow-lg overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Order ID:</span>{' '}
                  <span className="font-medium">{order.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>{' '}
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total:</span>{' '}
                  <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <Badge className={`${getStatusColor(order.status)} gap-1 capitalize`}>
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Link to={`/products/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/products/${item.productId}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.brand} • Qty: {item.quantity}
                      </p>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" size="sm" asChild>
  <Link
    to={`/orders/${order.id}`}
    state={{ order }}   // 👈 THIS IS THE FIX
  >
    <Eye className="mr-2 h-4 w-4" />
    View Details
  </Link>
</Button>

                {order.status === 'shipped' && (
                  <Button variant="outline" size="sm">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                )}
                {(order.status === 'pending' || order.status === 'confirmed') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
