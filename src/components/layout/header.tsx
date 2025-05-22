'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useCart } from '@/context/state';
import { Badge } from "@/components/ui/badge"; // Import Badge component
import { auth } from "../Auth/firebase";
import { signOut } from 'firebase/auth';

export function Header() {
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/products" className="flex items-center gap-2 mr-6">
          <Image src="/logo.svg" alt="Drape Logo" width={90} height={90} />
          {/* <span className="font-bold text-xl text-foreground">Drape</span> */}
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/products">Products</Link>
          </Button>
          {/* Add other nav links here if needed */}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <span>{user?.fullName || user?.email}</span>
          <Button variant="outline" size="icon" asChild aria-label="Shopping Cart" onClick={handleLogout}>
            <div className='relative'>
              <LogOut className="h-5 w-5" />
            </div>
          </Button>
          <Button variant="outline" size="icon" asChild aria-label="Shopping Cart">
            <Link href="/checkout" className='relative'>
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && <Badge
                className='absolute bottom-0 right-1 transform translate-x-1/2 w-4 h-4 rounded-full p-0 flex items-center justify-center'
              >
                {cartItems.length}
              </Badge>
              }
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
