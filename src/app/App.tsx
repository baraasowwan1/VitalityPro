import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { CartProvider } from '@/app/contexts/CartContext';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { ProductGrid } from '@/app/components/ProductGrid';
import { Features } from '@/app/components/Features';
import { Footer } from '@/app/components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Hero />
            <ProductGrid />
            <Features />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}