import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerMenuHeader from '@components/customer/CustomerMenuHeader';
import CustomerMenuFilters from '@components/customer/CustomerMenuFilters';
import CustomerMenuContent from '@components/customer/CustomerMenuContent';
import ItemDetailsModal from '@components/customer/ItemDetailsModal';
import ScrollToTopButton from '@components/customer/ScrollToTopButton';
import { CustomerMenuItem, TimeSlot, VegFilter, Language } from '@/types/customer.types';
import { getCustomerMenuData } from '@utils/customerMenuData';

const getCurrentTimeSlot = (): TimeSlot => {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 12) return 'morning';
  if (hour >= 18 && hour < 23) return 'evening';
  return 'closed';
};

export default function CustomerMenuPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [lang, setLang] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>(getCurrentTimeSlot());
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<TimeSlot>(
    getCurrentTimeSlot() === 'closed' ? 'morning' : getCurrentTimeSlot()
  );
  const [vegFilter, setVegFilter] = useState<VegFilter>('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedItem, setSelectedItem] = useState<CustomerMenuItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);

  const data = getCustomerMenuData(restaurantId || '1');
  const { restaurant, categories, items, advertisements } = data;

  useEffect(() => {
    const interval = setInterval(() => {
      const newSlot = getCurrentTimeSlot();
      setCurrentTimeSlot(newSlot);
      if (newSlot !== 'closed') {
        setSelectedTimeFilter(newSlot);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <CustomerMenuHeader
        restaurant={restaurant}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'ta' : 'en')}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch(!showSearch)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentTimeSlot={currentTimeSlot}
      />

      <CustomerMenuFilters
        lang={lang}
        selectedTimeFilter={selectedTimeFilter}
        onTimeFilterChange={setSelectedTimeFilter}
        vegFilter={vegFilter}
        onVegFilterChange={setVegFilter}
        isDark={isDark}
        primaryColor={restaurant.primaryColor}
      />

      <CustomerMenuContent
        restaurant={restaurant}
        categories={categories}
        items={items}
        advertisements={advertisements}
        lang={lang}
        searchTerm={searchTerm}
        selectedTimeFilter={selectedTimeFilter}
        vegFilter={vegFilter}
        currentTimeSlot={currentTimeSlot}
        isDark={isDark}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelectItem={setSelectedItem}
      />

      {showScrollTop && (
        <ScrollToTopButton primaryColor={restaurant.primaryColor} />
      )}

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          lang={lang}
          primaryColor={restaurant.primaryColor}
          onClose={() => setSelectedItem(null)}
          isDark={isDark}
          isFavorite={favorites.has(selectedItem.id)}
          onToggleFavorite={() => toggleFavorite(selectedItem.id)}
        />
      )}
    </div>
  );
}