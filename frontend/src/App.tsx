import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { CartProvider } from "@/user/context/CartContext";
import { WishlistProvider } from "@/user/context/WishlistContext";

// Auth
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import AdminLogin from "@/auth/AdminLogin";

// Layouts
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";


// User Pages
import Home from "@/user/pages/Home";
import Products from "@/user/pages/Products";
import ProductDetails from "@/user/pages/ProductDetails";
import Cart from "@/user/pages/Cart";
import Checkout from "@/user/pages/Checkout";
import Orders from '@/user/pages/Orders';
import OrderTracking from '@/user/pages/OrderTracking';
import Wishlist from "@/user/pages/Wishlist";
import Profile from "@/user/pages/Profile";
import FAQ from '@/user/pages/FAQ';
import Contact from "./user/pages/Contact";



// Admin Pages
import Dashboard from "@/admin/pages/Dashboard";
import AdminProducts from "@/admin/pages/Products";
import AddProduct from "@/admin/pages/AddProduct";
import EditProduct from "@/admin/pages/EditProduct";
import AdminOrders from '@/admin/pages/AdminOrders';

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />

              <BrowserRouter>
                <Routes>
                  {/* ========== AUTH ROUTES ========== */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* ========== USER ROUTES ========== */}
                  <Route element={<UserLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:orderId" element={<OrderTracking />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />



                  </Route>

                  {/* ========== ADMIN ROUTES ========== */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route path="products/edit/:id" element={<EditProduct />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />

                  </Route>

                  {/* ========== FALLBACK ========== */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
