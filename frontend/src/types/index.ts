export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'seller';//not
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sellerId: string;
  features?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  couponCode?: string;
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  products: string[];
  image: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  status: 'pending' | 'approved' | 'suspended';
  totalProducts: number;
  totalSales: number;
  rating: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  refunds: number;
  cancellations: number;
}
