import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ProductCard } from '@/app/components/ProductCard';
import { Button } from '@/app/components/ui/button';

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1693996047008-1b6210099be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHN1cHBsZW1lbnRzJTIwYm90dGxlfGVufDF8fHx8MTc2ODIxODgzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'naturalSupplementFormula',
    descriptionKey: 'naturalSupplementDesc',
    category: 'supplements',
    badge: 'NEW',
    price: 49.99,
    originalPrice: null,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1762328500413-1a4cb2023059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzdXBwbGVtZW50JTIwcGlsbHN8ZW58MXx8fHwxNzY4MjYxMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'premiumEnhancementDevice',
    descriptionKey: 'premiumDeviceDesc',
    category: 'devices',
    badge: 'POPULAR',
    price: 199.99,
    originalPrice: null,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1707129785947-ddc627a8bab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY4MjIyMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'powerBoostCapsules',
    descriptionKey: 'powerBoostDesc',
    category: 'supplements',
    price: 59.99,
    originalPrice: null,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1722843065077-f47ea1269bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwYm90dGxlc3xlbnwxfHx8fDE3NjgzMjU5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'vitalityMaxPro',
    descriptionKey: 'vitalityDesc',
    category: 'devices',
    price: 299.99,
    originalPrice: null,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1545840716-c82e9eec6930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjgzMjU5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'herbalPowerBlend',
    descriptionKey: 'herbalBlendDesc',
    category: 'supplements',
    badge: 'SALE',
    price: 39.99,
    originalPrice: 59.99,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1763667926453-6a992d38ac43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBwcm9kdWN0JTIwcGFja2FnaW5nfGVufDF8fHx8MTc2ODMyNTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'eliteEnhancementKit',
    descriptionKey: 'eliteKitDesc',
    category: 'bundles',
    badge: 'BUNDLE',
    price: 349.99,
    originalPrice: 449.99,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1693996047008-1b6210099be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHN1cHBsZW1lbnRzJTIwYm90dGxlfGVufDF8fHx8MTc2ODIxODgzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'advancedVitalitySystem',
    descriptionKey: 'advancedSystemDesc',
    category: 'bundles',
    price: 499.99,
    originalPrice: null,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1707129785947-ddc627a8bab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY4MjIyMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    nameKey: 'naturalBoostFormula',
    descriptionKey: 'naturalBoostDesc',
    category: 'supplements',
    price: 44.99,
    originalPrice: null,
  },
];

export function ProductGrid() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('products')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {t('allProducts')}
          </Button>
          <Button
            variant={selectedCategory === 'supplements' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('supplements')}
            className={selectedCategory === 'supplements' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {t('supplements')}
          </Button>
          <Button
            variant={selectedCategory === 'devices' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('devices')}
            className={selectedCategory === 'devices' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {t('devices')}
          </Button>
          <Button
            variant={selectedCategory === 'bundles' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('bundles')}
            className={selectedCategory === 'bundles' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {t('bundles')}
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              nameKey={product.nameKey}
              descriptionKey={product.descriptionKey}
              category={t(product.category)}
              badge={product.badge}
              price={product.price}
              originalPrice={product.originalPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}