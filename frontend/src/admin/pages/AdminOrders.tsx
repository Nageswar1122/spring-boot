import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8081/api/orders";

  const fetchOrders = async () => {
    try {
      const res = await axios.get<Order[]>(API_URL);
      setOrders(res.data || []);
    } catch {
      toast({
        title: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      await axios.put(`${API_URL}/${orderId}/status`, null, {
        params: { status },
      });
      toast({ title: `Order ${status}` });
      fetchOrders();
    } catch {
      toast({
        title: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Orders</h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-muted text-left">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">User</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3">#{o.id}</td>
              <td className="p-3">User {o.userId}</td>
              <td className="p-3">${o.totalAmount}</td>
              <td className="p-3">
                <Badge className="capitalize">{o.status}</Badge>
              </td>
              <td className="p-3 flex gap-2">
                {o.status === "pending" && (
                  <Button size="sm" onClick={() => updateStatus(o.id, "confirmed")}>
                    Confirm
                  </Button>
                )}
                {o.status === "confirmed" && (
                  <Button size="sm" onClick={() => updateStatus(o.id, "shipped")}>
                    Ship
                  </Button>
                )}
                {o.status === "shipped" && (
                  <Button size="sm" onClick={() => updateStatus(o.id, "delivered")}>
                    Deliver
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
