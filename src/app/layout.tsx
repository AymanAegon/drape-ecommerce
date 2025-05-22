import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, CartProvider } from '@/context/state';
import { Footer } from '@/components/layout/footer';

const geistSans = GeistSans;

export const metadata: Metadata = {
  title: 'Drape - Modern Clothing',
  description: 'Discover the latest trends in fashion with Drape.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <AuthProvider>
            <CartProvider>
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
