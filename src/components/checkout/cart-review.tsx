import Image from 'next/image';
import type { CartItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/state';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash } from 'lucide-react';

interface CartReviewProps {
  items: CartItem[];
  noEditing?: boolean;
}

export function CartReview({ items, noEditing }: CartReviewProps) {
  const { setCartItems } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = items.length > 0 ? 5.00 : 0; // Example shipping cost
  const tax = items.length > 0 ? subtotal * 0.08 : 0; // Example 8% tax
  const total = subtotal + shippingCost + tax;
  
  const removeItem = function (item: CartItem) {
    if (item.quantity === 1) {
      setCartItems(items.filter((i) => i !== item));
    } else {
      setCartItems(items.map((i) => i === item ? { ...i, quantity: i.quantity - 1 } : i));
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId + item.size + item.color}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                      data-ai-hint="product clothing"
                    />
                  </div>
                  <div className="flex-1 grid gap-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.color}, Size: {item.size}
                    </p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    {!noEditing && (
                      <Trash className="h-5 w-5 text-muted-foreground cursor-pointer"
                        onClick={() => {removeItem(item)}}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      {items.length > 0 && (
        <CardFooter className="flex flex-col gap-2 pt-6 border-t">
          <div className="w-full flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="w-full flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
