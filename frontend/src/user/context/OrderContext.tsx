import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/auth/AuthContext";

export interface OrderItem {
  id: number;
  productId: number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  createdAt: string; // or Date
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => void;
  cancelOrder: (orderId: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const API_URL = "http://localhost:8081/api/orders";

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`${API_URL}/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (orderId: number) => {
    if (!user?.id) return;

    try {
      await axios.post(
        `${API_URL}/${orderId}/cancel`,
        null,
        {
          params: { userId: user.id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresh orders after cancelling
      fetchOrders();
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
