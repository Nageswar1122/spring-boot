import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  AlertCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  totalSales: number;
  pendingOrders: number;
  refunds: number;
  cancellations: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-lg">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-8 text-red-500">Failed to load dashboard</div>;
  }

  const cards = [
    { title: "Total Revenue", value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`, icon: DollarSign, color: "bg-green-500" },
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "bg-blue-500" },
    { title: "Total Products", value: stats.totalProducts, icon: Package, color: "bg-purple-500" },
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-orange-500" },
    { title: "Total Sales", value: stats.totalSales, icon: TrendingUp, color: "bg-teal-500" },
    { title: "Pending Orders", value: stats.pendingOrders, icon: AlertCircle, color: "bg-yellow-500" },
    { title: "Refunds", value: stats.refunds, icon: RotateCcw, color: "bg-red-400" },
    { title: "Cancellations", value: stats.cancellations, icon: XCircle, color: "bg-red-500" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Use the sidebar to manage your store.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
