"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CartItem, Order, Product } from '@/types';

// import { auth } from '@/components/Auth/firebase';
// import { db } from '@/components/Auth/firebase'; // Assuming db is initialized and exported from firebase.js
import { User } from '@/types/index';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from "../components/Auth/firebase";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userCart = userDocSnap.data().cart;
          setCartItems(userCart || []);
        }
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const updateCart = async () => {
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          cart: cartItems,
        });
      }
    }
    updateCart();
  }, [cartItems]);



  return (
    <CartContext.Provider value={{ cartItems, setCartItems, order, setOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, fetch additional data from Firestore
        const userDocRef = doc(db, 'users', user.uid); // Assuming you have a 'users' collection
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Combine Firebase user data with data from Firestore
          
          setUser({ ...user, ...userData } as User);
        } else {
          // Handle the case where the user document doesn't exist in Firestore
          setUser(user as User); // Set the user without full name for now
        }
      } else {
        setUser(null); // User is signed out
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
