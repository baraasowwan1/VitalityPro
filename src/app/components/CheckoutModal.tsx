import { useState } from 'react';
import { X, Bitcoin, Ethereum, UploadCloud } from 'lucide-react';
import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/app/components/ui/button';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const { t } = useLanguage();

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'crypto' | null>(null);
  const [cryptoType, setCryptoType] = useState<'bitcoin' | 'ethereum' | 'usdt' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const cryptoAddresses = {
    bitcoin: '0x6c318f60c28eadc9e9ec8bdc455178a5bb318dd3',
    ethereum: '0x6c318f60c28eadc9e9ec8bdc455178a5bb318dd3',
    usdt: 'TUdeUaWWHXhsVqYwAkm3CP6THtjFFgCKYe',
  };

  const handlePayPalCheckout = () => {
    setIsProcessing(true);

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId) {
      alert('PayPal Client ID not set!');
      setIsProcessing(false);
      return;
    }

    // هنا توجيه المستخدم لصفحة الدفع الحقيقية باستخدام SDK أو رابط PayPal
    alert(`PayPal Checkout Placeholder\nOrder Total: $${cartTotal.toFixed(2)}`);

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

  const handleCryptoCheckout = async () => {
    if (!cryptoType) return;
    setIsProcessing(true);

    if (receiptFile) {
      const chatId = '1230522788'; // ضع chatId الخاص بك
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', receiptFile);

      await fetch('https://api.telegram.org/bot7668449814:AAHqs_kGDuPO_iNSHZeIqc-tGHQyKVJXe_8/sendPhoto', {
        method: 'POST',
        body: formData,
      });

      toast.success('تم إرسال الإيصال إلى التليجرام بنجاح!');
    }

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setTimeout(() => {
        clearCart();
        onClose();
        setOrderComplete(false);
        setPaymentMethod(null);
        setCryptoType(null);
        setReceiptFile(null);
      }, 3000);
    }, 2000);
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setReceiptFile(e.target.files[0]);
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

              {!paymentMethod ? (
                <div className="space-y-3">
                  <Button onClick={() => setPaymentMethod('paypal')} className="w-full bg-blue-600">
                    PayPal
                  </Button>
                  <Button onClick={() => setPaymentMethod('crypto')} className="w-full bg-orange-500">
                    {t('cryptocurrency')}
                  </Button>
                </div>
              ) : null}

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
                  <Button onClick={() => setCryptoType('bitcoin')} className="w-full">Bitcoin</Button>
                  <Button onClick={() => setCryptoType('ethereum')} className="w-full">Ethereum</Button>
                  <Button onClick={() => setCryptoType('usdt')} className="w-full">USDT</Button>
                </div>
              )}

              {paymentMethod === 'crypto' && cryptoType && (
                <div className="space-y-4">
                  <button onClick={() => setCryptoType(null)} className="text-sm text-purple-600">← {t('back')}</button>
                  <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                    <p className="text-sm">أرسل المبلغ إلى عنوان {cryptoType.toUpperCase()}:</p>
                    <strong className="break-all">{cryptoAddresses[cryptoType]}</strong>

                    <label className="flex items-center gap-2 cursor-pointer mt-2 bg-white border p-2 rounded hover:bg-gray-50">
                      <UploadCloud className="w-5 h-5 text-gray-700" />
                      <span className="text-sm">رفع إيصال التحويل</span>
                      <input type="file" className="hidden" onChange={handleReceiptChange} accept="image/*" />
                    </label>
                  </div>
                  <Button onClick={handleCryptoCheckout} disabled={isProcessing} className="w-full bg-orange-500">
                    {isProcessing ? t('processing') : 'تم التحويل'}
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
