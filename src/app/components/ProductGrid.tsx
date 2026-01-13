import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ProductCard } from '@/app/components/ProductCard';
import { Button } from '@/app/components/ui/button';

const products = [
  {
    id: 1,
    image: 'https://media.zid.store/8a5f4b81-ebc0-44bd-9005-126976b57582/81ce2c37-6db2-4c1e-ad5a-e914639f0a85.pngv1717751209',
    nameKey: 'Cialis',
    descriptionKey: 'Cialis',
    category: 'supplements',
    badge: 'NEW',
    price: 19.99,
    originalPrice: null,
  },
  {
    id: 2,
    image: 'https://aljawaher.online/cdn/shop/files/164998001_1_eddbee8f-3243-442e-b31a-15733dde732a.jpg?v=1763795115',
    nameKey: 'Golden X Men',
    descriptionKey: 'Golden X Men',
    category: 'devices',
    badge: 'POPULAR',
    price: 39.99,
    originalPrice: null,
  },
  {
    id: 3,
    image: 'https://www.dumyah.com/image/cache/data/2024/11/1731400855295443518-800x800.webp',
    nameKey: 'kotomoto',
    descriptionKey: 'kotomoto',
    category: 'supplements',
    price: 29.99,
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
