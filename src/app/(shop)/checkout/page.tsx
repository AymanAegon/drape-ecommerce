'use client';

import { useState } from 'react';
import { ShippingAddressForm } from '@/components/checkout/shipping-address-form';
import { CartReview } from '@/components/checkout/cart-review';
import { Button } from '@/components/ui/button';
import { mockCartItems } from '@/data/mock-data';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { CartItem } from '@/types';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems); // In a real app, this would come from context/state management
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const { toast } = useToast();

  const handleAddressSubmit = () => {
    setIsAddressSaved(true);
  };

  const handleProceedToPayment = () => {
    if (!isAddressSaved) {
      toast({
        title: "Address Required",
        description: "Please save your shipping address before proceeding.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Redirecting to Payment",
      description: "You will now be redirected to Stripe to complete your payment. (Simulation)",
    });
    // Simulate redirect to Stripe
    console.log('Proceeding to Stripe with cart:', cartItems);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Checkout
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Almost there! Review your order and provide shipping details.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ShippingAddressForm onSubmit={handleAddressSubmit} />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <CartReview items={cartItems} />
            <Button 
              onClick={handleProceedToPayment} 
              className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={cartItems.length === 0}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
