
'use client';

import { Header } from '@/components/layout/header';
import { PaymentForm } from '@/components/payment/payment-form';
import { CartReview } from '@/components/checkout/cart-review';
import { useCart } from '@/context/state';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentPage() {
  const { cartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Redirect to products page if cart is empty, as there's nothing to pay for
    if (cartItems.length === 0) {
      router.push('/products');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground">Your cart is empty. Redirecting to products...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Complete Your Payment
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Securely enter your payment details below.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <PaymentForm />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <CartReview items={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
