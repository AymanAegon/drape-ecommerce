import Link from 'next/link';
import { ShoppingCart, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/products" className="flex items-center gap-2 mr-6">
          <Shirt className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">Drape</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/products">Products</Link>
          </Button>
          {/* Add other nav links here if needed */}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="outline" size="icon" asChild aria-label="Shopping Cart">
            <Link href="/checkout">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
