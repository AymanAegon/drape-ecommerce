'use client';

import { collection, addDoc, serverTimestamp, FieldValue } from "firebase/firestore";
import { db } from "@/components/Auth/firebase"; // Assuming firebase.js exports `db`

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order, Address } from '@/types/index'; // Assuming Order and Address interfaces are defined here
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from "react";
import { useAuth, useCart } from "@/context/state";


export function ShippingAddressForm({ onSubmit }: { onSubmit: () => void }) {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { toast } = useToast();
  const [fullName, setFullName] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stateOrProvince, setStateOrProvince] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>(user?.email || "");
  useEffect(() => {
    if (user) {
      setEmail(user?.email || "");
    }
  }, [user])

  const inputClassTxt = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
  const labelClassTxt = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  function handleSubmit() {
    const addressData: Address = {
      street: addressLine1,
      city: city,
      state: stateOrProvince,
      zipCode: postalCode,
      phoneNumber: phoneNumber,
    };

    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice = item.price * item.quantity;
    });

    const orderData: any = {
      customerName: fullName,
      shippingAddress: addressData,
      products: cartItems,
      totalAmount: totalPrice,
      status: "Pending",
      orderDate: serverTimestamp(),
    };
    onSubmit();

    // addDoc(collection(db, "orders"), orderData)
    //   .then(() => {
    //     toast({
    //       title: "Success",
    //       description: "Order placed successfully!",
    //       variant: "default",
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error",
    //       description: "Failed to place order.",
    //       variant: "destructive",
    //     });
    //   });
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={labelClassTxt} htmlFor="fullName">Full Name</label>
            <input className={inputClassTxt} name="fullName" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className={labelClassTxt} htmlFor="addressLine1">Address Line 1</label>
            <input className={inputClassTxt} name="addressLine1" placeholder="123 Main St" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className={labelClassTxt} htmlFor="addressLine2">Address Line 2 (Optional)</label>
            <input className={inputClassTxt} name="addressLine2" placeholder="123 Main St" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
          </div>
          {user ? (
            <div className="space-y-2">
              <label className={labelClassTxt} htmlFor="email">Email</label>
              <input className={inputClassTxt} name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
            </div>
          ) : (
            <div className="space-y-2">
              <label className={labelClassTxt} htmlFor="email">Email</label>
              <input className={inputClassTxt} name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClassTxt} htmlFor="city">City</label>
              <input className={inputClassTxt} name="city" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className={labelClassTxt} htmlFor="stateOrProvince">State / Province</label>
              <input className={inputClassTxt} name="stateOrProvince" placeholder="NY" value={stateOrProvince} onChange={(e) => setStateOrProvince(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClassTxt} htmlFor="postalCode">Postal Code</label>
              <input className={inputClassTxt} name="postalCode" placeholder="10001" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className={labelClassTxt} htmlFor="country">Country</label>
              <input className={inputClassTxt} name="country" placeholder="United States" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClassTxt} htmlFor="phoneNumber">Phone Number (Optional)</label>
            <input className={inputClassTxt} name="phoneNumber" placeholder="(555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          {user &&
            (<Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              Save Address
            </Button>)
          }
        </form>
      </CardContent>
    </Card>
  );
}
