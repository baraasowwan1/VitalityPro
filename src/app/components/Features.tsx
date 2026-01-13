import { useLanguage } from '@/app/contexts/LanguageContext';
import { Shield, Lock, CreditCard, HeadphonesIcon } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'feature1Title',
      descKey: 'feature1Desc',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Lock,
      titleKey: 'feature2Title',
      descKey: 'feature2Desc',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: CreditCard,
      titleKey: 'feature3Title',
      descKey: 'feature3Desc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'feature4Title',
      descKey: 'feature4Desc',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('featuresTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-gray-600 text-sm">{t(feature.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
