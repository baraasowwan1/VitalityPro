import { useLanguage } from '@/app/contexts/LanguageContext';
import { Bitcoin, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VitalityPro
            </h3>
            <p className="text-gray-400 mb-4">
              {t('footerAboutText')}
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="h-4 w-4" />
              <span>support@vitalitypro.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-purple-400 transition-colors">
                  {t('products')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  {t('termsOfService')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  {t('shipping')}
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-semibold mb-4">{t('paymentMethods')}</h4>
            <p className="text-gray-400 mb-4">
              {t('acceptedPayments')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center" title="PayPal">
                <span className="font-bold text-sm">PP</span>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center" title="Bitcoin">
                <Bitcoin className="h-6 w-6" />
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center" title="Ethereum">
                <span className="font-bold text-sm">ETH</span>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center" title="USDT">
                <span className="font-bold text-xs">USDT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 VitalityPro. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}