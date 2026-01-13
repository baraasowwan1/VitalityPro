import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/app/components/ui/button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, addToCart, clearCart, cartTotal } = useCart();
  const { t } = useLanguage();

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'crypto' | null>(null);
  const [cryptoType, setCryptoType] = useState<'bitcoin' | 'ethereum' | 'usdt' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // استقبال حدث فتح Checkout من زر Buy Now
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ autoOpenPayment?: boolean; product?: any }>;
      if (customEvent.detail?.product) {
        // فتح Checkout لمنتج واحد فقط
        clearCart(); // تأكد أن السلة فارغة
        addToCart(customEvent.detail.product);
        setPaymentMethod('paypal'); // افتراضي فتح PayPal
      }
    };
    window.addEventListener('open-checkout', handler);
    return () => window.removeEventListener('open-checkout', handler);
  }, []);

  if (!isOpen) return null;

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    // هنا تضيف PayPal API
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setTimeout(() => {
        clearCart();
        onClose();
        setOrderComplete(false);
        setPaymentMethod(null);
      }, 3000);
    }, 2000);
  };

  const cryptoAddresses = {
    bitcoin: '0x6c318f60c28eadc9e9ec8bdc455178a5bb318dd3',
    ethereum: '0x6c318f60c28eadc9e9ec8bdc455178a5bb318dd3',
    usdt: 'TUdeUaWWHXhsVqYwAkm3CP6THtjFFgCKYe',
  };

  const handleCryptoCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setTimeout(() => {
        clearCart();
        onClose();
        setOrderComplete(false);
        setPaymentMethod(null);
        setCryptoType(null);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{t('checkout')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {orderComplete ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-green-600 mb-2">{t('orderSuccess')}</h3>
              <p className="text-gray-600">{t('orderSuccessMessage')}</p>
            </div>
          ) : (
            <>
              {/* ملخص الطلب */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">{t('orderSummary')}</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{t(item.nameKey)} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>{t('total')}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {!paymentMethod && (
                <div className="space-y-3">
                  <Button onClick={() => setPaymentMethod('paypal')} className="w-full bg-blue-600">PayPal</Button>
                  <Button onClick={() => setPaymentMethod('crypto')} className="w-full bg-orange-500">{t('cryptocurrency')}</Button>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="space-y-4">
                  <button onClick={() => setPaymentMethod(null)} className="text-sm text-purple-600">← {t('back')}</button>
                  <Button onClick={handlePayPalCheckout} disabled={isProcessing} className="w-full bg-blue-600">
                    {isProcessing ? t('processing') : 'Pay with PayPal'}
                  </Button>
                </div>
              )}

              {paymentMethod === 'crypto' && !cryptoType && (
                <div className="space-y-3">
                  <button onClick={() => setPaymentMethod(null)} className="text-sm text-purple-600">← {t('back')}</button>
                  <Button onClick={() => setCryptoType('bitcoin')}>Bitcoin</Button>
                  <Button onClick={() => setCryptoType('ethereum')}>Ethereum</Button>
                  <Button onClick={() => setCryptoType('usdt')}>USDT</Button>
                </div>
              )}

              {paymentMethod === 'crypto' && cryptoType && (
                <div className="space-y-4">
                  <button onClick={() => setCryptoType(null)} className="text-sm text-purple-600">← {t('back')}</button>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm mb-2">أرسل المبلغ إلى عنوان {cryptoType.toUpperCase()}:</p>
                    <strong className="break-all">{cryptoAddresses[cryptoType]}</strong>
                  </div>
                  <Button onClick={handleCryptoCheckout} className="w-full bg-orange-500">
                    تم التحويل
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
