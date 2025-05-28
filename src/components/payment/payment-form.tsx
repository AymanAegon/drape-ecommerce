
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Wallet } from 'lucide-react'; // Using Wallet for PayPal as an example
import { useCart } from '@/context/state';
import { useRouter } from 'next/navigation';

export function PaymentForm() {
  const { toast } = useToast();
  const { setCartItems } = useCart();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Basic validation (very simplified)
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      toast({
        title: "Payment Error",
        description: "Please fill in all card details.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    toast({
      title: "Payment Successful!",
      description: "Your order has been placed. (Simulation)",
    });
    setCartItems([]); // Clear cart on successful payment
    router.push('/products'); // Redirect to a confirmation or home page
    setIsProcessing(false);
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    // Simulate API call / redirect to PayPal
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: "Redirecting to PayPal...",
      description: "You will be redirected to PayPal to complete your payment. (Simulation)",
    });
    // In a real app, you'd redirect here. For simulation, we'll just show success.
    await new Promise(resolve => setTimeout(resolve, 1000));
     toast({
      title: "Payment Successful!",
      description: "Your order has been placed via PayPal. (Simulation)",
    });
    setCartItems([]); // Clear cart
    router.push('/products'); // Redirect
    setIsProcessing(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Payment Method</CardTitle>
        <CardDescription>Choose your preferred payment method below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="card" className="py-3">
              <CreditCard className="mr-2 h-5 w-5" /> Credit Card
            </TabsTrigger>
            <TabsTrigger value="paypal" className="py-3">
              <Wallet className="mr-2 h-5 w-5" /> PayPal
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <form onSubmit={handleCardPayment} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cardHolderName">Cardholder Name</Label>
                <Input 
                  id="cardHolderName" 
                  placeholder="John Doe" 
                  value={cardHolderName} 
                  onChange={(e) => setCardHolderName(e.target.value)} 
                  required 
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="•••• •••• •••• ••••" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)} 
                  required 
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input 
                    id="expiryDate" 
                    placeholder="MM/YY" 
                    value={expiryDate} 
                    onChange={(e) => setExpiryDate(e.target.value)} 
                    required 
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="•••" 
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                    required 
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="paypal">
            <div className="space-y-6 text-center">
              <p className="text-muted-foreground">
                You will be redirected to PayPal to complete your purchase securely.
              </p>
              <div className="flex justify-center">
                 <Wallet className="h-16 w-16 text-blue-600" />
              </div>
              <Button onClick={handlePayPalPayment} className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white" disabled={isProcessing}>
                 {isProcessing ? 'Processing...' : 'Proceed to PayPal'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
