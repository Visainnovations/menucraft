import { X, Check, Crown, Zap, Star } from 'lucide-react';

interface PlanComparisonModalProps {
  currentPlan: 'basic' | 'pro' | 'premium';
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ta';
}

export default function PlanComparisonModal({
  currentPlan,
  isOpen,
  onClose,
  lang,
}: PlanComparisonModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Basic',
      nameTa: 'அடிப்படை',
      price: lang === 'en' ? 'Free' : 'இலவசம்',
      icon: Check,
      color: 'gray',
      features: [
        { en: '20 Image Uploads', ta: '20 படங்கள்', included: true },
        { en: 'Basic QR Code', ta: 'அடிப்படை QR குறியீடு', included: true },
        { en: 'Unlimited Menu Items', ta: 'வரம்பற்ற உணவுகள்', included: true },
        { en: 'Basic Analytics', ta: 'அடிப்படை பகுப்பாய்வு', included: true },
        { en: 'Email Support', ta: 'மின்னஞ்சல் ஆதரவு', included: true },
        { en: 'Limited Customization', ta: 'வரையறுக்கப்பட்ட தனிப்பயனாக்கம்', included: true },
        { en: 'Advanced Analytics', ta: 'மேம்பட்ட பகுப்பாய்வு', included: false },
        { en: 'Priority Support', ta: 'முன்னுரிமை ஆதரவு', included: false },
        { en: 'Custom Domain', ta: 'தனிப்பயன் டொமைன்', included: false },
      ],
    },
    {
      name: 'Pro',
      nameTa: 'புரோ',
      price: '₹499/mo',
      icon: Zap,
      color: 'purple',
      popular: true,
      features: [
        { en: '50 Image Uploads', ta: '50 படங்கள்', included: true },
        { en: 'Custom QR Code', ta: 'தனிப்பயன் QR குறியீடு', included: true },
        { en: 'Unlimited Menu Items', ta: 'வரம்பற்ற உணவுகள்', included: true },
        { en: 'Advanced Analytics', ta: 'மேம்பட்ட பகுப்பாய்வு', included: true },
        { en: 'Priority Email Support', ta: 'முன்னுரிமை மின்னஞ்சல்', included: true },
        { en: 'Full Customization', ta: 'முழு தனிப்பயனாக்கம்', included: true },
        { en: 'WhatsApp Integration', ta: 'WhatsApp ஒருங்கிணைப்பு', included: true },
        { en: 'Custom Domain', ta: 'தனிப்பயன் டொமைன்', included: false },
        { en: '24/7 Support', ta: '24/7 ஆதரவு', included: false },
      ],
    },
    {
      name: 'Premium',
      nameTa: 'பிரீமியம்',
      price: '₹999/mo',
      icon: Crown,
      color: 'orange',
      features: [
        { en: 'Unlimited Images', ta: 'வரம்பற்ற படங்கள்', included: true },
        { en: 'Premium QR Design', ta: 'பிரீமியம் QR வடிவமைப்பு', included: true },
        { en: 'Unlimited Menu Items', ta: 'வரம்பற்ற உணவுகள்', included: true },
        { en: 'Advanced Analytics + Reports', ta: 'மேம்பட்ட பகுப்பாய்வு + அறிக்கைகள்', included: true },
        { en: '24/7 Priority Support', ta: '24/7 முன்னுரிமை ஆதரவு', included: true },
        { en: 'Full Customization', ta: 'முழு தனிப்பயனாக்கம்', included: true },
        { en: 'WhatsApp Integration', ta: 'WhatsApp ஒருங்கிணைப்பு', included: true },
        { en: 'Custom Domain', ta: 'தனிப்பயன் டொமைன்', included: true },
        { en: 'API Access', ta: 'API அணுகல்', included: true },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {lang === 'en' ? 'Compare Plans' : 'திட்டங்களை ஒப்பிடுக'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {lang === 'en' 
                ? 'Choose the perfect plan for your restaurant' 
                : 'உங்கள் உணவகத்திற்கு சரியான திட்டத்தைத் தேர்ந்தெடுக்கவும்'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrent = plan.name.toLowerCase() === currentPlan;
              
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-xl border-2 p-6 transition-all ${
                    isCurrent
                      ? `border-${plan.color}-500 bg-${plan.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  } ${plan.popular ? 'shadow-lg' : ''}`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {lang === 'en' ? 'MOST POPULAR' : 'மிகவும் பிரபலமானது'}
                      </div>
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrent && (
                    <div className="absolute -top-3 right-4">
                      <div className={`bg-${plan.color}-500 text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {lang === 'en' ? 'CURRENT' : 'தற்போதைய'}
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-full bg-${plan.color}-100 mb-4`}>
                      <Icon className={`w-8 h-8 text-${plan.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {lang === 'en' ? plan.name : plan.nameTa}
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {plan.price}
                    </div>
                    {plan.price !== 'Free' && plan.price !== 'இலவசம்' && (
                      <p className="text-sm text-gray-600">
                        {lang === 'en' ? 'per month' : 'மாதத்திற்கு'}
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className={`w-5 h-5 text-${plan.color}-600 flex-shrink-0 mt-0.5`} />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {lang === 'en' ? feature.en : feature.ta}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {isCurrent ? (
                    <button
                      disabled
                      className={`w-full py-3 bg-${plan.color}-100 text-${plan.color}-700 font-semibold rounded-lg cursor-not-allowed`}
                    >
                      {lang === 'en' ? 'Current Plan' : 'தற்போதைய திட்டம்'}
                    </button>
                  ) : (
                    <button
                      className={`w-full py-3 bg-${plan.color}-500 hover:bg-${plan.color}-600 text-white font-semibold rounded-lg transition-colors`}
                    >
                      {lang === 'en' ? 'Contact Admin' : 'நிர்வாகியைத் தொடர்பு கொள்ளவும்'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-700 mb-2">
              {lang === 'en' 
                ? 'Need help choosing a plan or want to upgrade?' 
                : 'திட்டத்தைத் தேர்ந்தெடுக்க உதவி தேவையா?'}
            </p>
            <p className="text-sm text-gray-600">
              {lang === 'en' 
                ? 'Contact our admin team at ' 
                : 'எங்கள் நிர்வாகக் குழுவைத் தொடர்பு கொள்ளவும் '}
              <a href="mailto:admin@menucraft.com" className="text-orange-600 font-semibold hover:underline">
                admin@menucraft.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}