import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/context/state';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 
    <div className="flex min-h-screen flex-col">
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </CartProvider>
    </div>
  );
}
