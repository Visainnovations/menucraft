import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CustomerMenuHeader from '@components/customer/CustomerMenuHeader';
import CustomerMenuFilters from '@components/customer/CustomerMenuFilters';
import CustomerMenuContent from '@components/customer/CustomerMenuContent';
import ItemDetailsModal from '@components/customer/ItemDetailsModal';
import ScrollToTopButton from '@components/customer/ScrollToTopButton';
import { CustomerMenuItem, TimeSlot, VegFilter, Language } from '@/types/customer.types';
import { getCustomerMenuData } from '@utils/customerMenuData';

// Define the dashboard time slot type locally
interface DashboardTimeSlot {
  id: string;
  type: 'breakfast' | 'lunch' | 'snacks' | 'dinner' | 'latenight' | 'earlymorning' | 'brunch' | 'allday';
  start: string;
  end: string;
}

// Dynamic function to get current time slot based on restaurant's actual timings
const getCurrentTimeSlotDynamic = (
  dashboardTimeSlots: DashboardTimeSlot[],
  restaurantTimings?: { morning: { start: string; end: string }; evening: { start: string; end: string } }
): TimeSlot => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  // Helper to check if current time is within a range
  const isInTimeRange = (current: string, start: string, end: string): boolean => {
    if (start <= end) {
      return current >= start && current <= end;
    } else {
      // Overnight slot (e.g., 23:00 - 02:00)
      return current >= start || current <= end;
    }
  };

  // If restaurant has custom dashboard time slots
  if (dashboardTimeSlots && dashboardTimeSlots.length > 0) {
    // Check for "All Day" slot first
    const allDaySlot = dashboardTimeSlots.find(slot => slot.type === 'allday');
    if (allDaySlot) return 'morning'; // Return morning for all-day restaurants

    // Find matching time slot
    for (const slot of dashboardTimeSlots) {
      if (isInTimeRange(currentTime, slot.start, slot.end)) {
        // Map to morning or evening based on type
        if (['dinner', 'latenight'].includes(slot.type)) {
          return 'evening';
        } else {
          return 'morning';
        }
      }
    }
  } 
  // Fallback to simple morning/evening timings
  else if (restaurantTimings) {
    if (isInTimeRange(currentTime, restaurantTimings.morning.start, restaurantTimings.morning.end)) {
      return 'morning';
    }
    if (isInTimeRange(currentTime, restaurantTimings.evening.start, restaurantTimings.evening.end)) {
      return 'evening';
    }
  }

  // If no match, restaurant is closed
  return 'closed';
};

export default function CustomerMenuPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [lang, setLang] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [vegFilter, setVegFilter] = useState<VegFilter>('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedItem, setSelectedItem] = useState<CustomerMenuItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);

  const data = getCustomerMenuData(restaurantId || '1');
  const { restaurant, categories, items, advertisements } = data;

  // Get time slots from restaurant data
  const dashboardTimeSlots = useMemo(() => {
    const restaurantWithSlots = restaurant as typeof restaurant & { 
      timeSlots?: DashboardTimeSlot[]
    };
    return restaurantWithSlots.timeSlots || [];
  }, [restaurant]);

  // Calculate current time slot dynamically based on restaurant data
  const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>(() => 
    getCurrentTimeSlotDynamic(dashboardTimeSlots, restaurant.timings)
  );

  const [selectedTimeFilter, setSelectedTimeFilter] = useState<TimeSlot>(() => {
    const current = getCurrentTimeSlotDynamic(dashboardTimeSlots, restaurant.timings);
    return current === 'closed' ? 'morning' : current;
  });

  // Track selected slot ID for dynamic time slots
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');

  // Initialize selected slot ID
  useEffect(() => {
    if (dashboardTimeSlots.length > 0 && !selectedSlotId) {
      // Find the first slot that matches current time
      const matchingSlot = dashboardTimeSlots.find(slot => {
        if (currentTimeSlot === 'morning') {
          return ['breakfast', 'brunch', 'lunch', 'earlymorning'].includes(slot.type);
        } else if (currentTimeSlot === 'evening') {
          return ['dinner', 'latenight', 'snacks'].includes(slot.type);
        }
        return false;
      });
      setSelectedSlotId(matchingSlot?.id || dashboardTimeSlots[0].id);
    }
  }, [dashboardTimeSlots, currentTimeSlot, selectedSlotId]);

  // Update time slot every minute using dynamic calculation
  useEffect(() => {
    const interval = setInterval(() => {
      const newSlot = getCurrentTimeSlotDynamic(dashboardTimeSlots, restaurant.timings);
      setCurrentTimeSlot(newSlot);
      if (newSlot !== 'closed') {
        setSelectedTimeFilter(newSlot);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [dashboardTimeSlots, restaurant.timings]);

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

  const handleTimeFilterChange = (slotId: string, timeSlot: TimeSlot) => {
    setSelectedSlotId(slotId);
    setSelectedTimeFilter(timeSlot);
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
        selectedSlotId={selectedSlotId}
        onTimeFilterChange={handleTimeFilterChange}
        vegFilter={vegFilter}
        onVegFilterChange={setVegFilter}
        isDark={isDark}
        primaryColor={restaurant.primaryColor}
        dashboardTimeSlots={dashboardTimeSlots}
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