import { useLanguage } from '@/app/contexts/LanguageContext';
import { useCart } from '@/app/contexts/CartContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner'; // مكتبة Toast

interface ProductCardProps {
  image: string;
  nameKey: string;
  descriptionKey: string;
  category: string;
  badge?: string;
  price: number;
  originalPrice?: number | null;
  id: number;
}

export function ProductCard({
  id,
  image,
  nameKey,
  descriptionKey,
  category,
  badge,
  price,
  originalPrice,
}: ProductCardProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  // إضافة للسلة بدون فتح Checkout
  const handleAddToCart = () => {
    addToCart({ id, nameKey, price, image });
    toast.success('تمت الإضافة إلى السلة ✅');
  };

  // شراء فوراً → إضافة المنتج للسلة وفتح Checkout مباشرة
  const handleBuyNow = () => {
    addToCart({ id, nameKey, price, image });

    // إشعار
    toast.success('تمت الإضافة وفتح صفحة الدفع ✅');

    // إرسال حدث لفتح CheckoutModal
    const event = new CustomEvent('open-checkout', {
      detail: { autoOpenPayment: true },
    });
    window.dispatchEvent(event);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={t(nameKey)}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600">
            {badge}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="text-sm text-purple-600 mb-2">{category}</div>
        <h3 className="text-xl font-semibold mb-2">{t(nameKey)}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{t(descriptionKey)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-purple-600">${price.toFixed(2)}</div>
          {originalPrice && (
            <div className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</div>
          )}
        </div>

        {/* أزرار الإضافة والشراء فوراً */}
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t('addToCart')}
          </Button>

          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            الشراء فوراً
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
