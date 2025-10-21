import { Menu, Image, Eye } from 'lucide-react';
import { Restaurant, Category, MenuItem } from '@/types/dashboard.types';
import { t } from '@utils/translations';

interface StatsCardsProps {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
  lang: 'en' | 'ta';
}

export default function StatsCards({ restaurant, categories, items, lang }: StatsCardsProps) {
  const totalViews = items.reduce((sum, item) => sum + item.viewCount, 0);
  const percentage = (restaurant.imageUploadCount / restaurant.imageUploadLimit) * 100;
  const isNearLimit = percentage > 80;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Categories Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('categories', lang)}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{categories.length}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      {/* Items Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('items', lang)}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{items.length}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <Image className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      {/* Total Views Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('totalViews', lang)}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{totalViews}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
        </div>
      </div>
      
      {/* Image Upload Tracker */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('imagesUsed', lang)}: {restaurant.imageUploadCount} {t('of', lang)} {restaurant.imageUploadLimit}
          </span>
          {isNearLimit && (
            <span className="text-xs text-orange-600 font-medium">
              {lang === 'en' ? 'Near Limit!' : 'வரம்பு அருகில்!'}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${isNearLimit ? 'bg-orange-500' : 'bg-green-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {isNearLimit && (
          <p className="text-xs text-gray-600 mt-2">
            {t('upgradeToPro', lang)}
          </p>
        )}
      </div>
    </div>
  );
}