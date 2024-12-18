export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

export type UserRole = 'admin' | 'vendor' | 'customer';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: ProductImage[];
  seller: string;
  stock: number;
  rating: number;
  reviewCount: number;
  prime: boolean;
  features: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  isPrimary: boolean;
  caption?: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  vendor: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}