import { useState } from 'react';
import { X, CreditCard, Bitcoin } from 'lucide-react';
import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/app/components/ui/button';

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

  if (!isOpen) return null;

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    
    // PLACEHOLDER: In production, replace with actual PayPal integration
    // You need to:
    // 1. Set up PayPal Business account
    // 2. Get PayPal Client ID and Secret
    // 3. Use PayPal SDK or API to create order
    // 4. Process payment on your backend
    
    alert(`
PAYPAL INTEGRATION PLACEHOLDER

To integrate PayPal:
1. Create a PayPal Business account at paypal.com
2. Go to developer.paypal.com
3. Get your Client ID and Secret
4. Install PayPal SDK: npm install @paypal/checkout-server-sdk
5. Create a backend endpoint to handle payments
6. Use the PayPal API to create and capture orders

Order Total: $${cartTotal.toFixed(2)}

For security, payment processing must happen on your backend server.
    `);
    
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
    setIsProcessing(true);
    
    // PLACEHOLDER: In production, replace with actual Binance/Crypto integration
    const cryptoAddresses = {
      bitcoin: '0x6c318f60c28eadc9e9ec8bdc455178a5bb318dd3',
      ethereum: '0x6c318f60c28eadc9e9ec8bdc455178a5bb318dd3',
      usdt: 'TUdeUaWWHXhsVqYwAkm3CP6THtjFFgCKYe'
    };
    
    alert(`
CRYPTOCURRENCY PAYMENT PLACEHOLDER

To integrate Binance/Crypto payments:

Option 1 - Binance Pay:
1. Create a Binance Merchant account
2. Get API credentials from Binance Pay
3. Use Binance Pay API to create payment orders
4. Documentation: https://developers.binance.com/docs/binance-pay

Option 2 - Direct Wallet:
1. Provide your ${cryptoType?.toUpperCase()} wallet address
2. Customer sends payment to your wallet
3. Verify transaction on blockchain
4. Confirm order after payment

${cryptoType ? `Your ${cryptoType.toUpperCase()} Address: ${cryptoAddresses[cryptoType]}` : ''}
Amount: $${cartTotal.toFixed(2)}

For automatic verification, use Binance Pay API or blockchain monitoring services.
    `);
    
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{t('checkout')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {orderComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2">{t('orderSuccess')}</h3>
              <p className="text-gray-600">{t('orderSuccessMessage')}</p>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">{t('orderSummary')}</h3>
                <div className="space-y-2 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{t(item.nameKey)} x {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>{t('total')}</span>
                    <span className="text-purple-600">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              {!paymentMethod ? (
                <div className="space-y-3">
                  <h3 className="font-semibold mb-3">{t('selectPaymentMethod')}</h3>
                  
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className="w-full p-4 border-2 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">PayPal</div>
                      <div className="text-sm text-gray-600">{t('payWithPayPal')}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('crypto')}
                    className="w-full p-4 border-2 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Bitcoin className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{t('cryptocurrency')}</div>
                      <div className="text-sm text-gray-600">{t('payWithCrypto')}</div>
                    </div>
                  </button>
                </div>
              ) : paymentMethod === 'paypal' ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setPaymentMethod(null)}
                    className="text-purple-600 hover:underline text-sm"
                  >
                    ← {t('back')}
                  </button>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">PayPal {t('checkout')}</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('paypalDescription')}
                    </p>
                  </div>

                  <Button
                    onClick={handlePayPalCheckout}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? t('processing') : t('payWithPayPal')}
                  </Button>
                </div>
              ) : paymentMethod === 'crypto' && !cryptoType ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod(null)}
                    className="text-purple-600 hover:underline text-sm"
                  >
                    ← {t('back')}
                  </button>
                  
                  <h4 className="font-semibold">{t('selectCryptocurrency')}</h4>

                  <button
                    onClick={() => setCryptoType('bitcoin')}
                    className="w-full p-3 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Bitcoin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold">Bitcoin (BTC)</span>
                  </button>

                  <button
                    onClick={() => setCryptoType('ethereum')}
                    className="w-full p-3 border-2 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-white text-xs">ETH</span>
                    </div>
                    <span className="font-semibold">Ethereum (ETH)</span>
                  </button>

                  <button
                    onClick={() => setCryptoType('usdt')}
                    className="w-full p-3 border-2 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-white text-xs">USDT</span>
                    </div>
                    <span className="font-semibold">Tether (USDT)</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setCryptoType(null)}
                    className="text-purple-600 hover:underline text-sm"
                  >
                    ← {t('back')}
                  </button>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {cryptoType?.toUpperCase()} {t('payment')}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('cryptoDescription')}
                    </p>
                  </div>

                  <Button
                    onClick={handleCryptoCheckout}
                    disabled={isProcessing}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isProcessing ? t('processing') : t('payWithCrypto')}
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
