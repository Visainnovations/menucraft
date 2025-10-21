import { AlertCircle } from 'lucide-react';
import { Restaurant } from '@/types/dashboard.types';
import { t } from '@utils/translations';

interface SubscriptionBannerProps {
  restaurant: Restaurant;
  lang: 'en' | 'ta';
}

export default function SubscriptionBanner({ restaurant, lang }: SubscriptionBannerProps) {
  if (restaurant.subscriptionStatus === 'expired') {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">{t('subscriptionExpired', lang)}</h3>
            <p className="text-red-700 text-sm mt-1">{t('contactAdmin', lang)}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (restaurant.subscriptionStatus === 'trial') {
    const daysLeft = Math.ceil((restaurant.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">
                {t('trialEndsIn', lang)} {daysLeft} {t('days', lang)}
              </h3>
              <p className="text-blue-700 text-sm mt-1">
                {lang === 'en' 
                  ? 'Contact admin to continue after trial' 
                  : 'சோதனைக்கு பிறகு தொடர நிர்வாகியை தொடர்பு கொள்ளுங்கள்'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}