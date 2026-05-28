import { User, Seller } from '@/types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    phone: '+1 234 567 8900',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    createdAt: '2024-01-01',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@brightbasket.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    createdAt: '2023-12-01',
  },
];

export const sellers: Seller[] = [
  {
    id: 'seller1',
    name: 'Tech World Electronics',
    email: 'techworld@example.com',
    phone: '+1 234 567 8901',
    businessName: 'Tech World Inc.',
    status: 'approved',
    totalProducts: 45,
    totalSales: 1234567,
    rating: 4.8,
    createdAt: '2023-06-15',
  },
  {
    id: 'seller2',
    name: 'Digital Hub',
    email: 'digitalhub@example.com',
    phone: '+1 234 567 8902',
    businessName: 'Digital Hub LLC',
    status: 'approved',
    totalProducts: 32,
    totalSales: 876543,
    rating: 4.6,
    createdAt: '2023-08-20',
  },
  {
    id: 'seller3',
    name: 'Gadget Zone',
    email: 'gadgetzone@example.com',
    phone: '+1 234 567 8903',
    businessName: 'Gadget Zone Corp',
    status: 'pending',
    totalProducts: 18,
    totalSales: 234567,
    rating: 4.4,
    createdAt: '2024-01-10',
  },
  {
    id: 'seller4',
    name: 'Mobile Masters',
    email: 'mobilemasters@example.com',
    phone: '+1 234 567 8904',
    businessName: 'Mobile Masters Inc',
    status: 'suspended',
    totalProducts: 0,
    totalSales: 123456,
    rating: 3.2,
    createdAt: '2023-09-05',
  },
];

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getSellerById = (id: string): Seller | undefined => {
  return sellers.find(seller => seller.id === id);
};
