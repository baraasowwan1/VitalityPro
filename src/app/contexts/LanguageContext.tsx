import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    cart: 'Cart',
    
    // Hero
    heroTitle: 'Premium Wellness Products',
    heroSubtitle: 'Natural solutions for male health and vitality',
    heroDescription: 'Discover our range of high-quality, scientifically-backed wellness products designed to enhance your health and confidence.',
    shopNow: 'Shop Now',
    learnMore: 'Learn More',
    
    // Categories
    allProducts: 'All Products',
    supplements: 'Supplements',
    devices: 'Enhancement Devices',
    bundles: 'Special Bundles',
    
    // Products
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    outOfStock: 'Out of Stock',
    priceComingSoon: 'Price Coming Soon',
    
    // Cart
    emptyCart: 'Your cart is empty',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Checkout
    checkout: 'Checkout',
    orderSummary: 'Order Summary',
    selectPaymentMethod: 'Select Payment Method',
    payWithPayPal: 'Pay with PayPal',
    cryptocurrency: 'Cryptocurrency',
    payWithCrypto: 'Pay with Crypto',
    selectCryptocurrency: 'Select Cryptocurrency',
    payment: 'Payment',
    back: 'Back',
    processing: 'Processing...',
    paypalDescription: 'You will be redirected to PayPal to complete your purchase securely.',
    cryptoDescription: 'Complete your purchase using cryptocurrency. Instructions will be provided after selection.',
    orderSuccess: 'Order Successful!',
    orderSuccessMessage: 'Thank you for your purchase. Your order has been confirmed.',
    
    // Features
    featuresTitle: 'Why Choose Us',
    feature1Title: 'Premium Quality',
    feature1Desc: 'All products are carefully selected and tested for quality and effectiveness',
    feature2Title: 'Discreet Shipping',
    feature2Desc: 'Your privacy is our priority. All orders shipped in unmarked packaging',
    feature3Title: 'Secure Payment',
    feature3Desc: 'Multiple payment options including PayPal and cryptocurrency',
    feature4Title: 'Expert Support',
    feature4Desc: '24/7 customer support to answer all your questions',
    
    // Footer
    footerAbout: 'About',
    footerAboutText: 'We provide premium wellness products to help you achieve your health goals with confidence and discretion.',
    quickLinks: 'Quick Links',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    shipping: 'Shipping Info',
    returns: 'Returns',
    paymentMethods: 'Payment Methods',
    acceptedPayments: 'We accept PayPal, Bitcoin, Ethereum, USDT and other cryptocurrencies',
    allRightsReserved: 'All rights reserved',
    
    // Product Details
    naturalSupplementFormula: 'Natural Supplement Formula',
    naturalSupplementDesc: 'Advanced herbal blend designed to support male vitality and performance with natural ingredients',
    premiumEnhancementDevice: 'Premium Enhancement Device',
    premiumDeviceDesc: 'Medical-grade device designed for safe and effective enhancement results',
    powerBoostCapsules: 'Power Boost Capsules',
    powerBoostDesc: 'High-potency formula with proven ingredients for maximum effectiveness',
    vitalityMaxPro: 'Vitality Max Pro',
    vitalityDesc: 'Professional-grade enhancement system with clinical support',
    herbalPowerBlend: 'Herbal Power Blend',
    herbalBlendDesc: 'Traditional herbal formula combined with modern science',
    eliteEnhancementKit: 'Elite Enhancement Kit',
    eliteKitDesc: 'Complete solution combining supplements and devices for optimal results',
    advancedVitalitySystem: 'Advanced Vitality System',
    advancedSystemDesc: 'Comprehensive program for long-term wellness and enhancement',
    naturalBoostFormula: 'Natural Boost Formula',
    naturalBoostDesc: 'Organic ingredients formulated for natural enhancement and vitality',
  },
  ar: {
    // Header
    home: 'الرئيسية',
    products: 'المنتجات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    cart: 'السلة',
    
    // Hero
    heroTitle: 'منتجات صحية متميزة',
    heroSubtitle: 'حلول طبيعية للصحة والحيوية الرجولية',
    heroDescription: 'اكتشف مجموعتنا من منتجات العافية عالية الجودة والمدعومة علمياً والمصممة لتعزيز صحتك وثقتك بنفسك.',
    shopNow: 'تسوق الآن',
    learnMore: 'اعرف المزيد',
    
    // Categories
    allProducts: 'جميع المنتجات',
    supplements: 'المكملات الغذائية',
    devices: 'أجهزة التحسين',
    bundles: 'العروض الخاصة',
    
    // Products
    addToCart: 'أضف إلى السلة',
    viewDetails: 'عرض التفاصيل',
    outOfStock: 'نفذت الكمية',
    priceComingSoon: 'السعر قريباً',
    
    // Cart
    emptyCart: 'سلتك فارغة',
    total: 'الإجمالي',
    proceedToCheckout: 'إكمال الشراء',
    
    // Checkout
    checkout: 'إكمال الشراء',
    orderSummary: 'ملخص الطلب',
    selectPaymentMethod: 'اختيار طريقة الدفع',
    payWithPayPal: 'دفع بـ PayPal',
    cryptocurrency: 'عملات رقمية',
    payWithCrypto: 'دفع بالعملات الرقمية',
    selectCryptocurrency: 'اختيار العملة الرقمية',
    payment: 'الدفع',
    back: 'رجوع',
    processing: 'معالجة...',
    paypalDescription: 'سيتم توجيهك إلى PayPal لإكمال الشراء بأمان.',
    cryptoDescription: 'إكمال الشراء باستخدام العملات الرقمية. سيتم تقديم تعليمات بعد الاختيار.',
    orderSuccess: 'تم الشراء بنجاح!',
    orderSuccessMessage: 'شكراً لشرائك. تم تأكيد طلبك.',
    
    // Features
    featuresTitle: 'لماذا تختارنا',
    feature1Title: 'جودة متميزة',
    feature1Desc: 'جميع المنتجات مختارة ومختبرة بعناية للجودة والفعالية',
    feature2Title: 'شحن سري',
    feature2Desc: 'خصوصيتك أولويتنا. جميع الطلبات تشحن في عبوات غير مميزة',
    feature3Title: 'دفع آمن',
    feature3Desc: 'خيارات دفع متعددة بما في ذلك PayPal والعملات الرقمية',
    feature4Title: 'دعم متخصص',
    feature4Desc: 'دعم العملاء على مدار الساعة للإجابة على جميع استفساراتك',
    
    // Footer
    footerAbout: 'من نحن',
    footerAboutText: 'نوفر منتجات صحية متميزة لمساعدتك في تحقيق أهدافك الصحية بثقة وسرية.',
    quickLinks: 'روابط سريعة',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    shipping: 'معلومات الشحن',
    returns: 'الإرجاع',
    paymentMethods: 'طرق الدفع',
    acceptedPayments: 'نقبل PayPal وBitcoin وEthereum وUSDT والعملات الرقمية الأخرى',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Product Details
    naturalSupplementFormula: 'تركيبة مكمل طبيعي',
    naturalSupplementDesc: 'مزيج عشبي متقدم مصمم لدعم الحيوية والأداء الرجولي بمكونات طبيعية',
    premiumEnhancementDevice: 'جهاز تحسين متميز',
    premiumDeviceDesc: 'جهاز طبي مصمم لنتائج تحسين آمنة وفعالة',
    powerBoostCapsules: 'كبسولات تعزيز القوة',
    powerBoostDesc: 'تركيبة عالية الفعالية مع مكونات مثبتة لأقصى فعالية',
    vitalityMaxPro: 'فيتاليتي ماكس برو',
    vitalityDesc: 'نظام تحسين احترافي مع دعم سريري',
    herbalPowerBlend: 'مزيج القوة العشبي',
    herbalBlendDesc: 'تركيبة عشبية تقليدية مدمجة مع العلم الحديث',
    eliteEnhancementKit: 'مجموعة التحسين النخبة',
    eliteKitDesc: 'حل كامل يجمع بين المكملات والأجهزة للحصول على أفضل النتائج',
    advancedVitalitySystem: 'نظام الحيوية المتقدم',
    advancedSystemDesc: 'برنامج شامل للعافية والتحسين على المدى الطويل',
    naturalBoostFormula: 'تركيبة التعزيز الطبيعي',
    naturalBoostDesc: 'مكونات عضوية مُصاغة للتحسين الطبيعي والحيوية',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
