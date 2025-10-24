import { Search, X, Sun, Moon } from 'lucide-react';
import { CustomerRestaurant, Language, TimeSlot } from '@/types/customer.types';

interface CustomerMenuHeaderProps {
  restaurant: CustomerRestaurant;
  lang: Language;
  onToggleLang: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  showSearch: boolean;
  onToggleSearch: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentTimeSlot: TimeSlot;
}

export default function CustomerMenuHeader({
  restaurant,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  showSearch,
  onToggleSearch,
  searchTerm,
  onSearchChange,
  currentTimeSlot,
}: CustomerMenuHeaderProps) {
  const isDark = theme === 'dark';
  const isOpen = currentTimeSlot !== 'closed';
  const primaryColor = restaurant.primaryColor;

  return (
    <div
      className={`sticky top-0 z-50 backdrop-blur-xl ${
        isDark ? 'bg-gray-900/90' : 'bg-white/90'
      } shadow-lg transition-colors duration-300`}
      style={{ borderBottom: `2px solid ${primaryColor}` }}
    >
      <div className="px-4 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent truncate">
              {lang === 'en' ? restaurant.name : restaurant.nameTamil}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {/* OPEN/CLOSED Badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                  isOpen
                    ? isDark ? 'bg-green-900/30' : 'bg-green-50'
                    : isDark ? 'bg-red-900/30' : 'bg-red-50'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOpen 
                      ? isDark ? 'bg-green-500 animate-pulse' : 'bg-green-600 animate-pulse'
                      : isDark ? 'bg-red-500' : 'bg-red-600'
                  }`}
                ></div>
                <span
                  className={`text-xs font-extrabold ${
                    isOpen
                      ? isDark ? 'text-green-400' : 'text-green-700'
                      : isDark ? 'text-red-400' : 'text-red-700'
                  }`}
                >
                  {isOpen
                    ? lang === 'en' ? 'OPEN' : 'திறந்து உள்ளது'
                    : lang === 'en' ? 'CLOSED' : 'மூடி உள்ளது'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSearch}
              className={`p-2 rounded-xl ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-all`}
            >
              <Search className="w-5 h-5" style={{ color: primaryColor }} />
            </button>
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-all`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <button
              onClick={onToggleLang}
              className="px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
              }}
            >
              {lang === 'en' ? 'த' : 'EN'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mb-3 animate-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={
                  lang === 'en' ? 'Search dishes...' : 'உணவுகளை தேடுங்கள்...'
                }
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl focus:outline-none transition-all ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200'
                } border-2`}
                style={{ borderColor: searchTerm ? primaryColor : undefined }}
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}