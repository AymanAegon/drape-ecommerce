
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShippingAddressForm } from '@/components/checkout/shipping-address-form';
import { CartReview } from '@/components/checkout/cart-review';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/state';
import { Header } from '@/components/layout/header';

export default function CheckoutPage() {
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const { toast } = useToast();
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();

  const handleAddressSubmit = () => { 
    setIsAddressSaved(true); 
    toast({
      title: "Address Saved",
      description: "Your shipping address has been saved.",
    });
  };

  const handleProceedToPayment = () => {
    // if (!isAddressSaved) {
    //  toast({
    //    title: "Address Required",
    //    description: "Please save your shipping address before proceeding to payment.",
    //    variant: "destructive",
    //  });
    //  return;
    // }
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before proceeding.",
        variant: "destructive",
      });
      return;
    }
    // Navigate to the payment page
    router.push('/payment');
  };

  return (
    <>
      <Header />
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
              <Button
                onClick={() => {
                  setCartItems([]);
                  toast({ title: "Cart Cleared", description: "All items removed from your cart."});
                }}
                variant="destructive" // Using destructive variant for clear cart
                className="w-full text-lg py-6" // Removed specific red colors to rely on theme
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
