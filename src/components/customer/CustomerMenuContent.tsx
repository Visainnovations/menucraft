import { MapPin, Phone, Share2 } from 'lucide-react';
import {
  CustomerRestaurant,
  CustomerCategory,
  CustomerMenuItem,
  Advertisement,
  Language,
  TimeSlot,
  VegFilter,
} from '@/types/customer.types';
import MenuItemCard from './MenuItemCard';
import ClosedBanner from './ClosedBanner';

interface CustomerMenuContentProps {
  restaurant: CustomerRestaurant;
  categories: CustomerCategory[];
  items: CustomerMenuItem[];
  advertisements: Advertisement[];
  lang: Language;
  searchTerm: string;
  selectedTimeFilter: TimeSlot;
  vegFilter: VegFilter;
  currentTimeSlot: TimeSlot;
  isDark: boolean;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onSelectItem: (item: CustomerMenuItem) => void;
}

export default function CustomerMenuContent({
  restaurant,
  categories,
  items,
  lang,
  searchTerm,
  selectedTimeFilter,
  vegFilter,
  currentTimeSlot,
  isDark,
  favorites,
  onToggleFavorite,
  onSelectItem,
}: CustomerMenuContentProps) {
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-orange-100';
  const primaryColor = restaurant.primaryColor;

  const getFilteredItems = () => {
    return items.filter((item) => {
      const matchesTime = item.availableTimes.includes(selectedTimeFilter);
      const matchesVeg =
        vegFilter === 'all' ||
        (vegFilter === 'veg' && item.isVeg) ||
        (vegFilter === 'nonveg' && !item.isVeg);
      const matchesSearch = searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nameTamil?.includes(searchTerm) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesTime && matchesVeg && matchesSearch;
    });
  };

  const getItemsForCategory = (categoryId: string) => {
    return getFilteredItems().filter((item) => item.categoryId === categoryId);
  };

  const availableCategories = categories.filter((cat) =>
    cat.availableTimes.includes(selectedTimeFilter)
  );

  const filteredItems = getFilteredItems();

  return (
    <div className="px-4 py-4 pb-20">
      {/* Closed Banner */}
      {currentTimeSlot === 'closed' && (
        <ClosedBanner restaurant={restaurant} lang={lang} isDark={isDark} />
      )}

      {/* Restaurant Info Card */}
      <div className={`mb-4 ${cardBg} rounded-2xl shadow-md p-4 border ${borderColor}`}>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <MapPin
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: primaryColor }}
            />
            <span className={textMuted}>
              {lang === 'en' ? restaurant.address : restaurant.addressTamil}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
              <a href={`tel:${restaurant.phone}`} className={`${textColor} font-medium`}>
                {restaurant.phone}
              </a>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: restaurant.name,
                    text: 'Check out this restaurant menu!',
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span
                className="text-xs font-semibold"
                style={{ color: primaryColor }}
              >
                {lang === 'en' ? 'Share' : 'பகிர்'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="mb-4">
          <h2 className={`text-sm font-bold ${textColor} mb-3 px-1`}>
            {filteredItems.length} {lang === 'en' ? 'results' : 'முடிவுகள்'}
          </h2>
          {filteredItems.length === 0 ? (
            <div className={`text-center py-12 ${cardBg} rounded-2xl`}>
              <div className="text-5xl mb-3">🔍</div>
              <p className={`text-sm ${textMuted}`}>
                {lang === 'en' ? 'No items found' : 'உணவுகள் கிடைக்கவில்லை'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  primaryColor={primaryColor}
                  onClick={() => onSelectItem(item)}
                  isDark={isDark}
                  isFavorite={favorites.has(item.id)}
                  onToggleFavorite={() => onToggleFavorite(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Menu Items by Category */}
      {!searchTerm && (
        <div className="space-y-6">
          {availableCategories.map((category) => {
            const categoryItems = getItemsForCategory(category.id);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category.id} id={`category-${category.id}`}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div
                    className="w-1 h-7 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <h2 className="text-lg font-bold" style={{ color: primaryColor }}>
                    {lang === 'en' ? category.name : category.nameTamil}
                  </h2>
                </div>

                <div className="space-y-3">
                  {categoryItems.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      lang={lang}
                      primaryColor={primaryColor}
                      onClick={() => onSelectItem(item)}
                      isDark={isDark}
                      isFavorite={favorites.has(item.id)}
                      onToggleFavorite={() => onToggleFavorite(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!searchTerm &&
        availableCategories.every((cat) => getItemsForCategory(cat.id).length === 0) && (
          <div className={`text-center py-12 ${cardBg} rounded-2xl`}>
            <div className="text-5xl mb-3">🍽️</div>
            <h3 className={`text-base font-bold ${textColor} mb-2`}>
              {lang === 'en' ? 'No items available' : 'உணவுகள் இல்லை'}
            </h3>
            <p className={`text-sm ${textMuted}`}>
              {lang === 'en' ? 'Try different filters' : 'வேறு வடிகட்டிகளை முயற்சிக்கவும்'}
            </p>
          </div>
        )}

      {/* Footer */}
      <div className={`mt-8 pt-6 border-t ${borderColor} text-center space-y-3`}>
        <div className="flex items-center justify-center gap-2 text-xs" style={{ color: primaryColor }}>
          <span className={textMuted}>{lang === 'en' ? 'Powered by' : 'இயக்குவது'}</span>
          <span className="font-bold">MenuCraft</span>
        </div>
        <p className={`text-[10px] ${textMuted} italic px-4`}>
          {lang === 'en'
            ? '✨ Scan, Browse, Savor - Your Digital Dining Companion'
            : '✨ ஸ்கேன் செய்யுங்கள், உலாவுங்கள், சுவைக்கவும்'}
        </p>
      </div>
    </div>
  );
}