import { X, Heart, Star, Flame, Circle } from 'lucide-react';
import { CustomerMenuItem, Language } from '@/types/customer.types';
import { DEFAULT_IMAGES } from '@utils/customerMenuData';

interface ItemDetailsModalProps {
  item: CustomerMenuItem;
  lang: Language;
  primaryColor: string;
  onClose: () => void;
  isDark: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ItemDetailsModal({
  item,
  lang,
  primaryColor,
  onClose,
  isDark,
  isFavorite,
  onToggleFavorite,
}: ItemDetailsModalProps) {
  const name = lang === 'en' ? item.name : item.nameTamil;
  const description = lang === 'en' ? item.description : item.descriptionTamil;
  const ingredients = lang === 'en' ? item.ingredients : item.ingredientsTamil;
  const displayImage = item.imageUrl || DEFAULT_IMAGES.default;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-end sm:items-center justify-center">
        <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg`}>
          {/* Image */}
          <div className="relative h-56 overflow-hidden rounded-t-3xl sm:rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleFavorite}
              className="absolute top-3 left-3 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
            </button>

            <img src={displayImage} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Badges */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex flex-wrap gap-2">
                {item.isChefsSpecial && (
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {lang === 'en' ? "Chef's" : 'சிறப்பு'}
                  </div>
                )}
                {item.isTodaysSpecial && (
                  <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                    <Flame className="w-3.5 h-3.5" />
                    {lang === 'en' ? 'Today' : 'இன்று'}
                  </div>
                )}
              </div>
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-2 shadow-lg backdrop-blur-sm ${
                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-sm border-2 border-white flex items-center justify-center">
                  <Circle
                    className={`w-2 h-2 ${
                      item.isVeg ? 'fill-green-600 text-green-600' : 'fill-red-600 text-red-600'
                    }`}
                  />
                </div>
                {item.isVeg ? (lang === 'en' ? 'Veg' : 'சைவம்') : (lang === 'en' ? 'Non-Veg' : 'அசைவம்')}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Name & Price */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {name}
                </h3>
                {description && (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                    {description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                  ₹{item.price}
                </div>
                {item.preparationTime && (
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>
                    ⏱️ {item.preparationTime}
                  </p>
                )}
              </div>
            </div>

            {/* Spice Level */}
            {item.spiceLevel > 0 && (
              <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-red-900/30' : 'bg-red-50'} rounded-xl`}>
                <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {lang === 'en' ? 'Spice:' : 'காரம்:'}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-5 rounded-full ${
                        i < item.spiceLevel ? 'bg-red-500' : isDark ? 'bg-red-800' : 'bg-red-200'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-auto`}>
                  {item.spiceLevel === 1 && (lang === 'en' ? 'Mild' : 'லேசான')}
                  {item.spiceLevel === 2 && (lang === 'en' ? 'Medium' : 'நடுத்தர')}
                  {item.spiceLevel === 3 && (lang === 'en' ? 'Hot' : 'அதிக')}
                </span>
              </div>
            )}

            {/* Ingredients */}
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                🥘 {lang === 'en' ? 'Ingredients' : 'பொருட்கள்'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 ${
                      isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                    } text-xs rounded-full border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                📊 {lang === 'en' ? 'Nutrition Facts' : 'ஊட்டச்சத்து'}
              </h4>
              {item.servingSize && (
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  {lang === 'en' ? 'Serving:' : 'அளவு:'} <span className="font-semibold">{item.servingSize}</span>
                </p>
              )}
              <div className="grid grid-cols-4 gap-2">
                <div className={`${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} p-2.5 rounded-lg text-center`}>
                  <div className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {item.nutrition.calories.replace(' kcal', '')}
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                    {lang === 'en' ? 'Cal' : 'கலோ'}
                  </div>
                </div>
                <div className={`${isDark ? 'bg-green-900/30' : 'bg-green-50'} p-2.5 rounded-lg text-center`}>
                  <div className={`text-lg font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {item.nutrition.protein}
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                    {lang === 'en' ? 'Protein' : 'புரதம்'}
                  </div>
                </div>
                <div className={`${isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'} p-2.5 rounded-lg text-center`}>
                  <div className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {item.nutrition.carbs}
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                    {lang === 'en' ? 'Carbs' : 'கார்போ'}
                  </div>
                </div>
                <div className={`${isDark ? 'bg-red-900/30' : 'bg-red-50'} p-2.5 rounded-lg text-center`}>
                  <div className={`text-lg font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {item.nutrition.fat}
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                    {lang === 'en' ? 'Fat' : 'கொழுப்பு'}
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-transform"
              style={{ backgroundColor: primaryColor }}
            >
              {lang === 'en' ? 'Close' : 'மூடு'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}