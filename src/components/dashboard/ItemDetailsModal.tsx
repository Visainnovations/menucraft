import { X, Edit2, Clock, Star, Flame, Sparkles, Leaf, Apple, Users, AlertTriangle, Info as InfoIcon, Eye } from 'lucide-react';
import { MenuItem } from '@/types/dashboard.types';
import { t } from '@utils/translations';

interface ItemDetailsModalProps {
  item: MenuItem;
  lang: 'en' | 'ta';
  onClose: () => void;
  onEdit: () => void;
  canAccess: boolean;
}

export default function ItemDetailsModal({ item, lang, onClose, onEdit, canAccess }: ItemDetailsModalProps) {
  const allergenIcons: Record<string, string> = {
    nuts: '🥜',
    dairy: '🥛',
    gluten: '🌾',
    soy: '🫘',
    eggs: '🥚',
    seafood: '🦐'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {lang === 'en' ? item.name : (item.nameTamil || item.name)}
          </h2>
          <div className="flex items-center gap-2">
            {canAccess && (
              <button
                onClick={onEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={t('edit', lang)}
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <div className="space-y-6">
            {/* Image and Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6">
              {item.imageUrl && (
                <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-3xl font-bold text-primary-600">₹{item.price}</p>
                    {item.servingSize && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.servingSize} {item.servings && item.servings > 1 ? `• ${item.servings} ${lang === 'en' ? 'servings' : 'பரிமாறல்'}` : ''}
                      </p>
                    )}
                  </div>
                  {item.preparationTime && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.preparationTime} {lang === 'en' ? 'mins' : 'நிமிடங்கள்'}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-gray-600 mb-3">{item.description}</p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.isChefsSpecial && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {t('chefsSpecial', lang)}
                    </span>
                  )}
                  {item.isTodaysSpecial && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {t('todaysSpecial', lang)}
                    </span>
                  )}
                  {item.isSeasonal && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      {t('seasonal', lang)}
                    </span>
                  )}
                  {item.isVeg && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
                      <Leaf className="w-4 h-4" />
                      {t('vegetarian', lang)}
                    </span>
                  )}
                </div>

                {/* Spice Level */}
                {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600">{lang === 'en' ? 'Spice Level:' : 'காரத்தன்மை:'}</span>
                    <span className="text-lg">{'🌶️'.repeat(item.spiceLevel)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Apple className="w-5 h-5 text-green-600" />
                  {t('ingredients', lang)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition Facts */}
            {item.nutritionFacts && Object.keys(item.nutritionFacts).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  {t('nutritionFacts', lang)}
                  <span className="text-xs text-gray-500 font-normal">({t('perServing', lang)})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {item.nutritionFacts.calories && (
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{t('calories', lang)}</p>
                      <p className="text-xl font-bold text-orange-700">{item.nutritionFacts.calories}</p>
                    </div>
                  )}
                  {item.nutritionFacts.protein && (
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{t('protein', lang)}</p>
                      <p className="text-xl font-bold text-red-700">{item.nutritionFacts.protein}g</p>
                    </div>
                  )}
                  {item.nutritionFacts.carbs && (
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{t('carbs', lang)}</p>
                      <p className="text-xl font-bold text-yellow-700">{item.nutritionFacts.carbs}g</p>
                    </div>
                  )}
                  {item.nutritionFacts.fat && (
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{t('fat', lang)}</p>
                      <p className="text-xl font-bold text-purple-700">{item.nutritionFacts.fat}g</p>
                    </div>
                  )}
                  {item.nutritionFacts.fiber && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{t('fiber', lang)}</p>
                      <p className="text-xl font-bold text-green-700">{item.nutritionFacts.fiber}g</p>
                    </div>
                  )}
                  {item.nutritionFacts.sugar && (
                    <div className="bg-pink-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{t('sugar', lang)}</p>
                      <p className="text-xl font-bold text-pink-700">{item.nutritionFacts.sugar}g</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  {t('allergens', lang)}
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex flex-wrap gap-3">
                    {item.allergens.map((allergen) => (
                      <span key={allergen} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-sm font-medium">
                        <span className="text-lg">{allergenIcons[allergen]}</span>
                        {t(allergen, lang)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Fun Fact */}
            {item.funFact && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <InfoIcon className="w-5 h-5 text-purple-600" />
                  {t('funFact', lang)}
                </h3>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-gray-700 italic">{item.funFact}</p>
                </div>
              </div>
            )}

            {/* Available Times */}
            {item.availableTimes && item.availableTimes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {lang === 'en' ? 'Available During' : 'கிடைக்கும் நேரம்'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.availableTimes.map((time) => (
                    <span key={time} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {t(time, lang)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Views */}
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t">
              <Eye className="w-4 h-4" />
              {item.viewCount} {t('views', lang)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}