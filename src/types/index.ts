import type { Timestamp, FieldValue } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  category: string;
  stock: number;
  images: string[]; // URLs
  brand?: string;
  createdAt?: Timestamp; // Firestore Timestamp
  updatedAt?: Timestamp; // Firestore Timestamp
}

import { User as AuthUser } from 'firebase/auth';

export interface User extends AuthUser {
  fullName: string;
  isAdmin: boolean; // Ensure this comes from your Firestore document
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string; // URL to image
}

export interface Filters {
  category: string;
  priceRange: [number, number];
  size: string;
  searchQuery?: string;
}


export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  shippingAddress: Address;
  products: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: Timestamp | FieldValue;
}