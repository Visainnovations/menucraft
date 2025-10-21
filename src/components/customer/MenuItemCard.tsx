import { Star, Flame, Circle, Heart } from 'lucide-react';
import { CustomerMenuItem, Language } from '@/types/customer.types';
import { DEFAULT_IMAGES } from '@utils/customerMenuData';

interface MenuItemCardProps {
  item: CustomerMenuItem;
  lang: Language;
  primaryColor: string;
  onClick: () => void;
  isDark: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function MenuItemCard({
  item,
  lang,
  primaryColor,
  onClick,
  isDark,
  isFavorite,
  onToggleFavorite,
}: MenuItemCardProps) {
  const name = lang === 'en' ? item.name : item.nameTamil;
  const description = lang === 'en' ? item.description : item.descriptionTamil;
  const displayImage = item.imageUrl || DEFAULT_IMAGES.default;

  return (
    <div
      className={`${
        isDark ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'
      } rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border ${
        isDark ? 'border-gray-700' : 'border-orange-100'
      } overflow-hidden group`}
    >
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div
          onClick={onClick}
          className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
        >
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Badges */}
          <div className="absolute top-1.5 left-1.5 flex gap-1">
            {item.isChefsSpecial && (
              <div
                className="p-1 rounded-lg shadow-lg backdrop-blur-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            )}
            {item.isTodaysSpecial && (
              <div className="p-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg backdrop-blur-sm">
                <Flame className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Veg Badge */}
          <div className="absolute bottom-1.5 left-1.5">
            <div
              className={`w-4 h-4 bg-white rounded-sm border-2 ${
                item.isVeg ? 'border-green-600' : 'border-red-600'
              } flex items-center justify-center shadow-md`}
            >
              <Circle
                className={`w-2 h-2 ${
                  item.isVeg
                    ? 'fill-green-600 text-green-600'
                    : 'fill-red-600 text-red-600'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col" onClick={onClick}>
          <h3
            className={`text-sm font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            } leading-tight mb-1 line-clamp-2 cursor-pointer`}
          >
            {name}
          </h3>

          {description && (
            <p
              className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } line-clamp-2 leading-snug mb-2`}
            >
              {description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="text-xl font-bold"
                style={{ color: primaryColor }}
              >
                ₹{item.price}
              </div>
              {item.spiceLevel > 0 && (
                <div className="flex items-center gap-0.5 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded-md">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-2.5 rounded-full ${
                        i < item.spiceLevel
                          ? 'bg-red-500'
                          : 'bg-red-200 dark:bg-red-800'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : isDark
                    ? 'text-gray-400'
                    : 'text-gray-400'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}