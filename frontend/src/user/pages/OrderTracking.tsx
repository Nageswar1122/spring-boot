import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Package,
  Truck,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

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

const STATUS_STEPS = ['pending', 'confirmed', 'shipped', 'delivered'];

const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order as Order | undefined;

  // 🔴 SAFETY CHECK
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg font-medium mb-4">
          Order details not found
        </p>
        <Button onClick={() => navigate('/orders')}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const currentStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      {/* ================= ORDER INFO ================= */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
          <Badge className="capitalize mt-2">{order.status}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">
            Total: ${order.totalAmount.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* ================= TRACKING STEPS ================= */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {STATUS_STEPS.map((step, index) => {
          const active = index <= currentStep;
          return (
            <div
              key={step}
              className={`flex flex-col items-center p-4 rounded-lg border ${
                active
                  ? 'bg-green-50 border-green-500'
                  : 'bg-muted border-border'
              }`}
            >
              {step === 'pending' && <Clock />}
              {step === 'confirmed' && <Package />}
              {step === 'shipped' && <Truck />}
              {step === 'delivered' && <CheckCircle />}
              <span className="capitalize mt-2 font-medium">
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================= ORDER ITEMS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.brand} • Qty {item.quantity}
                </p>
                <p className="font-medium">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;
