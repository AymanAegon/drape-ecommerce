import Image from 'next/image';
import type { Product, CartItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/state';
import { useToast } from '@/hooks/use-toast';

import { useEffect, useRef } from 'react';
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartItems, setCartItems } = useCart();
  const { toast } = useToast();

  function handleAddToCart(product: Product): void {
    toast({ title: "Item Added to Cart", description: `${product.name} has been added to your cart.` });
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.id);
      if (existingItem) {
        return prevItems.map((item) => {
          if (item.productId === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      }
      // If item not found, add it to the cart
      return [
        ...prevItems,
        {
          productId: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          size: product.availableSizes[0],
          color: product.colors[0],
          image: product.images[0], // URL to image
        },
      ];
    });
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl h-full">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={`${product.category} clothing`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold leading-tight">{product.name}</CardTitle>
          <Badge variant="secondary" className="whitespace-nowrap ml-2">{product.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
          {product.brand && <p className="text-xs text-muted-foreground">By {product.brand}</p>}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleAddToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
