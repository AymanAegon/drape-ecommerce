"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
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

import { auth } from '@/components/Auth/firebase';
import { db } from '@/components/Auth/firebase'; // Assuming db is initialized and exported from firebase.js
import { User } from '@/types/index';
import { doc, getDoc } from 'firebase/firestore';

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
