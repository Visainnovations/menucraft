import { AlertCircle, Crown, Calendar, Image, BarChart3, ChevronRight, CheckCircle, Zap } from 'lucide-react';
import { Restaurant } from '@/types/dashboard.types';
// import { t } from '@utils/translations';

interface SubscriptionBannerProps {
  restaurant: Restaurant;
  lang: 'en' | 'ta';
  onShowPlanComparison?: () => void;
}

export default function SubscriptionBanner({ restaurant, lang, onShowPlanComparison }: SubscriptionBannerProps) {
  const getPlanIcon = () => {
    switch (restaurant.planType) {
      case 'premium': return Crown;
      case 'pro': return Zap;
      default: return CheckCircle;
    }
  };

  const getPlanColor = () => {
    switch (restaurant.planType) {
      case 'premium': return {
        gradient: 'from-orange-50 to-white',
        border: 'border-orange-200',
        badge: 'bg-orange-500',
        text: 'text-orange-600',
        progress: 'bg-orange-500',
      };
      case 'pro': return {
        gradient: 'from-purple-50 to-white',
        border: 'border-purple-200',
        badge: 'bg-purple-500',
        text: 'text-purple-600',
        progress: 'bg-purple-500',
      };
      default: return {
        gradient: 'from-gray-50 to-white',
        border: 'border-gray-200',
        badge: 'bg-gray-500',
        text: 'text-gray-600',
        progress: 'bg-gray-500',
      };
    }
  };

  const getPlanFeatures = () => {
    const features = {
      basic: {
        images: '20',
        qrScans: lang === 'en' ? 'Unlimited' : 'வரம்பற்ற',
        analytics: lang === 'en' ? 'Basic' : 'அடிப்படை',
        support: lang === 'en' ? 'Email' : 'மின்னஞ்சல்',
        customization: lang === 'en' ? 'Limited' : 'வரையறுக்கப்பட்ட',
      },
      pro: {
        images: '50',
        qrScans: lang === 'en' ? 'Unlimited' : 'வரம்பற்ற',
        analytics: lang === 'en' ? 'Advanced' : 'மேம்பட்ட',
        support: lang === 'en' ? 'Priority Email' : 'முன்னுரிமை மின்னஞ்சல்',
        customization: lang === 'en' ? 'Full' : 'முழுமையான',
      },
      premium: {
        images: lang === 'en' ? 'Unlimited' : 'வரம்பற்ற',
        qrScans: lang === 'en' ? 'Unlimited' : 'வரம்பற்ற',
        analytics: lang === 'en' ? 'Advanced + Reports' : 'மேம்பட்ட + அறிக்கைகள்',
        support: lang === 'en' ? '24/7 Priority' : '24/7 முன்னுரிமை',
        customization: lang === 'en' ? 'Full + Custom Domain' : 'முழுமையான + தனிப்பயன் டொமைன்',
      },
    };
    return features[restaurant.planType];
  };

  const getDaysRemaining = () => {
    return Math.ceil((restaurant.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  const getImageUsagePercentage = () => {
    return Math.round((restaurant.imageUploadCount / restaurant.imageUploadLimit) * 100);
  };

  const colors = getPlanColor();
  const features = getPlanFeatures();
  const PlanIcon = getPlanIcon();
  const daysLeft = getDaysRemaining();
  const imageUsage = getImageUsagePercentage();

  // Expired State
  if (restaurant.subscriptionStatus === 'expired') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-1">
              {lang === 'en' ? 'Subscription Expired' : 'சந்தா காலாவதியானது'}
            </h3>
            <p className="text-red-700 text-sm mb-4">
              {lang === 'en' 
                ? 'Your subscription has ended. Please contact admin to renew and continue using MenuCraft.'
                : 'உங்கள் சந்தா முடிந்துவிட்டது. தொடர நிர்வாகியைத் தொடர்பு கொள்ளவும்.'}
            </p>
            <a 
              href="mailto:admin@menucraft.com"
              className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              {lang === 'en' ? 'Contact Admin' : 'நிர்வாகியைத் தொடர்பு கொள்ளவும்'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Active/Trial State - Detailed View
  return (
    <div className={`bg-gradient-to-r ${colors.gradient} border ${colors.border} rounded-xl p-6 mb-6`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Section - Plan Details */}
        <div className="flex-1 space-y-4">
          {/* Plan Badge & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className={`flex items-center gap-2 px-4 py-2 ${colors.badge} text-white rounded-lg font-semibold`}>
              <PlanIcon className="w-5 h-5" />
              <span className="uppercase">
                {restaurant.planType} {lang === 'en' ? 'Plan' : 'திட்டம்'}
              </span>
            </div>
            
            {restaurant.subscriptionStatus === 'trial' && (
              <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">
                {lang === 'en' ? 'Trial Period' : 'சோதனை காலம்'}
              </div>
            )}
            
            {restaurant.subscriptionStatus === 'active' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                {lang === 'en' ? 'Active' : 'செயலில்'}
              </div>
            )}
          </div>

          {/* Expiry Info - Only for Trial */}
          {restaurant.subscriptionStatus === 'trial' && (
            <div className="flex items-start gap-2">
              <Calendar className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="font-semibold text-gray-900">
                  {lang === 'en' ? 'Trial ends in' : 'சோதனை முடிவு'}{' '}
                  <span className={colors.text}>{daysLeft} {lang === 'en' ? 'days' : 'நாட்கள்'}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {lang === 'en' 
                    ? `Expires on ${restaurant.trialEndDate.toLocaleDateString('en-IN')}` 
                    : `${restaurant.trialEndDate.toLocaleDateString('ta-IN')} அன்று முடிவடைகிறது`}
                </p>
              </div>
            </div>
          )}

          {/* Image Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className={`w-5 h-5 ${colors.text}`} />
                <span className="text-sm font-semibold text-gray-900">
                  {lang === 'en' ? 'Image Uploads' : 'படங்கள்'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {restaurant.imageUploadCount} / {restaurant.imageUploadLimit} ({imageUsage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  imageUsage >= 90 ? 'bg-red-500' :
                  imageUsage >= 70 ? 'bg-yellow-500' :
                  colors.progress
                }`}
                style={{ width: `${Math.min(imageUsage, 100)}%` }}
              />
            </div>
            {imageUsage >= 80 && (
              <p className="text-xs text-red-600 font-medium">
                {lang === 'en' 
                  ? '⚠️ You\'re running low on image uploads. Consider upgrading your plan.' 
                  : '⚠️ படப் பதிவேற்றங்கள் குறைவாக உள்ளன. உங்கள் திட்டத்தை மேம்படுத்துங்கள்.'}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Plan Features */}
        <div className={`bg-white border ${colors.border} rounded-lg p-4 w-full lg:w-80`}>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BarChart3 className={`w-4 h-4 ${colors.text}`} />
            {lang === 'en' ? 'Plan Features' : 'திட்ட அம்சங்கள்'}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{lang === 'en' ? 'Image Limit' : 'படம் வரம்பு'}</span>
              <span className="font-semibold text-gray-900">{features.images}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{lang === 'en' ? 'QR Scans' : 'QR ஸ்கேன்'}</span>
              <span className="font-semibold text-gray-900">{features.qrScans}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{lang === 'en' ? 'Analytics' : 'பகுப்பாய்வு'}</span>
              <span className="font-semibold text-gray-900 text-right flex-1 ml-2">{features.analytics}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{lang === 'en' ? 'Support' : 'ஆதரவு'}</span>
              <span className="font-semibold text-gray-900 text-right flex-1 ml-2">{features.support}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{lang === 'en' ? 'Customization' : 'தனிப்பயனாக்கம்'}</span>
              <span className="font-semibold text-gray-900 text-right flex-1 ml-2">{features.customization}</span>
            </div>
          </div>

          {restaurant.planType !== 'premium' && onShowPlanComparison && (
            <button 
              onClick={onShowPlanComparison}
              className={`w-full mt-4 px-4 py-2 ${colors.badge} hover:opacity-90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2`}
            >
              {lang === 'en' ? 'Upgrade Plan' : 'திட்டத்தை மேம்படுத்து'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Warning for Trial */}
      {restaurant.subscriptionStatus === 'trial' && daysLeft <= 3 && (
        <div className="mt-4 pt-4 border-t border-orange-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <p className="text-sm text-orange-800">
              {lang === 'en' 
                ? `Your trial is ending soon! Contact admin to activate a paid subscription and keep all your data.`
                : 'உங்கள் சோதனை விரைவில் முடிவடைகிறது! உங்கள் தரவை வைத்திருக்க நிர்வாகியைத் தொடர்பு கொள்ளவும்.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}