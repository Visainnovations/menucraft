import { Sun, Moon, Coffee, UtensilsCrossed, Cookie, Clock, Circle, Sparkles } from 'lucide-react';
import { Language, VegFilter, TimeSlot } from '@/types/customer.types';

interface DashboardTimeSlot {
  id: string;
  type: 'breakfast' | 'lunch' | 'snacks' | 'dinner' | 'latenight' | 'earlymorning' | 'brunch' | 'allday';
  start: string;
  end: string;
}

interface CustomerMenuFiltersProps {
  lang: Language;
  selectedTimeFilter: TimeSlot;
  selectedSlotId?: string;
  onTimeFilterChange: (slotId: string, filter: TimeSlot) => void;
  vegFilter: VegFilter;
  onVegFilterChange: (filter: VegFilter) => void;
  isDark: boolean;
  primaryColor: string;
  dashboardTimeSlots?: DashboardTimeSlot[];
}

// Icon mapping for time slot types
const getTimeSlotIcon = (type: string) => {
  switch (type) {
    case 'breakfast':
    case 'earlymorning':
      return Coffee;
    case 'lunch':
    case 'brunch':
      return UtensilsCrossed;
    case 'snacks':
      return Cookie;
    case 'dinner':
    case 'latenight':
      return Moon;
    case 'allday':
      return Sparkles;
    default:
      return Clock;
  }
};

// Translation mapping for time slot types
const getTimeSlotLabel = (type: string, lang: Language): string => {
  const labels: Record<string, { en: string; ta: string }> = {
    breakfast: { en: 'Breakfast', ta: 'காலை உணவு' },
    lunch: { en: 'Lunch', ta: 'மதிய உணவு' },
    snacks: { en: 'Snacks', ta: 'தின்பண்டங்கள்' },
    dinner: { en: 'Dinner', ta: 'இரவு உணவு' },
    latenight: { en: 'Late Night', ta: 'இரவு நேரம்' },
    earlymorning: { en: 'Early Morning', ta: 'அதிகாலை' },
    brunch: { en: 'Brunch', ta: 'புரஞ்ச்' },
    allday: { en: 'All Day', ta: 'நாள் முழுவதும்' },
  };

  return labels[type]?.[lang] || type;
};

// Format time for display (12-hour format)
const formatTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch {
    return time;
  }
};

export default function CustomerMenuFilters({
  lang,
  selectedTimeFilter,
  selectedSlotId = '',
  onTimeFilterChange,
  vegFilter,
  onVegFilterChange,
  isDark,
  primaryColor,
  dashboardTimeSlots = [],
}: CustomerMenuFiltersProps) {
  const cycleVegFilter = () => {
    if (vegFilter === 'all') onVegFilterChange('veg');
    else if (vegFilter === 'veg') onVegFilterChange('nonveg');
    else onVegFilterChange('all');
  };

  // If restaurant has custom time slots (from dashboard), use dynamic rendering
  if (dashboardTimeSlots && dashboardTimeSlots.length > 0) {
    // Sort time slots by start time
    const sortedSlots = [...dashboardTimeSlots].sort((a, b) => {
      if (a.type === 'allday') return 1;
      if (b.type === 'allday') return -1;
      return a.start.localeCompare(b.start);
    });

    return (
      <div 
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all ${
          isDark 
            ? 'bg-gray-900/95 border-gray-800' 
            : 'bg-white/95 border-gray-200'
        }`}
      >
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          {/* Time Slots Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
              {sortedSlots.map((slot) => {
                const Icon = getTimeSlotIcon(slot.type);
                const isSelected = selectedSlotId === slot.id;
                
                return (
                  <button
                    key={slot.id}
                    onClick={() => {
                      const mappedSlot: TimeSlot = slot.type === 'dinner' || slot.type === 'latenight' 
                        ? 'evening' 
                        : 'morning';
                      onTimeFilterChange(slot.id, mappedSlot);
                    }}
                    className={`
                      group relative flex items-center gap-2 px-4 py-3 rounded-2xl
                      transition-all duration-300 whitespace-nowrap
                      ${isSelected 
                        ? 'shadow-lg transform' 
                        : isDark
                        ? 'bg-gray-800/50 hover:bg-gray-800'
                        : 'bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                    style={{
                      backgroundColor: isSelected ? primaryColor : undefined,
                      boxShadow: isSelected ? `0 8px 24px ${primaryColor}40` : undefined,
                    }}
                  >
                    {/* Icon with animation */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full transition-all
                      ${isSelected 
                        ? 'bg-white/20' 
                        : isDark 
                        ? 'bg-gray-700/50 group-hover:bg-gray-700' 
                        : 'bg-white group-hover:bg-gray-200'
                      }
                    `}>
                      <Icon className={`
                        w-4 h-4 transition-colors
                        ${isSelected 
                          ? 'text-white' 
                          : isDark 
                          ? 'text-gray-300 group-hover:text-white' 
                          : 'text-gray-600 group-hover:text-gray-900'
                        }
                      `} />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col items-start gap-0.5">
                      <span className={`
                        text-sm font-bold transition-colors
                        ${isSelected 
                          ? 'text-white' 
                          : isDark 
                          ? 'text-gray-200 group-hover:text-white' 
                          : 'text-gray-800 group-hover:text-gray-900'
                        }
                      `}>
                        {getTimeSlotLabel(slot.type, lang)}
                      </span>
                      {slot.type !== 'allday' && (
                        <span className={`
                          text-[10px] font-medium transition-colors
                          ${isSelected 
                            ? 'text-white/90' 
                            : isDark 
                            ? 'text-gray-400 group-hover:text-gray-300' 
                            : 'text-gray-500 group-hover:text-gray-600'
                          }
                        `}>
                          {formatTime(slot.start)} - {formatTime(slot.end)}
                        </span>
                      )}
                    </div>

                    {/* Active indicator dot */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md animate-pulse" />
                    )}
                  </button>
                );
              })}

              {/* Veg Filter - Fixed size, no scale */}
              <div className="flex items-center pl-2 ml-2 border-l-2 border-gray-300 dark:border-gray-700">
                <button
                  onClick={cycleVegFilter}
                  className={`
                    group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl
                    transition-colors duration-300
                    ${isDark 
                      ? 'bg-gray-800/50 hover:bg-gray-800' 
                      : 'bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                >
                  {vegFilter === 'all' && (
                    <>
                      <div className="flex gap-1.5 items-center">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Circle className="w-3 h-3 fill-green-600 text-green-600" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <Circle className="w-3 h-3 fill-red-600 text-red-600" />
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {lang === 'en' ? 'All' : 'அனைத்தும்'}
                      </span>
                    </>
                  )}
                  {vegFilter === 'veg' && (
                    <>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50">
                        <Circle className="w-4 h-4 fill-green-600 text-green-600" />
                      </div>
                      <span className="text-sm font-bold text-green-700 dark:text-green-400 whitespace-nowrap">
                        {lang === 'en' ? 'Veg Only' : 'சைவ மட்டும்'}
                      </span>
                    </>
                  )}
                  {vegFilter === 'nonveg' && (
                    <>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                        <Circle className="w-4 h-4 fill-red-600 text-red-600" />
                      </div>
                      <span className="text-sm font-bold text-red-700 dark:text-red-400 whitespace-nowrap">
                        {lang === 'en' ? 'Non-Veg' : 'அசைவ'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Elegant morning/evening filter
  return (
    <div 
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all ${
        isDark 
          ? 'bg-gray-900/95 border-gray-800' 
          : 'bg-white/95 border-gray-200'
      }`}
    >
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Morning Filter */}
          <button
            onClick={() => onTimeFilterChange('morning', 'morning')}
            className={`
              group relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl
              transition-all duration-300
              ${selectedTimeFilter === 'morning'
                ? 'shadow-lg transform'
                : isDark
                ? 'bg-gray-800/50 hover:bg-gray-800'
                : 'bg-gray-50 hover:bg-gray-100'
              }
            `}
            style={{
              backgroundColor: selectedTimeFilter === 'morning' ? primaryColor : undefined,
              boxShadow: selectedTimeFilter === 'morning' ? `0 8px 24px ${primaryColor}40` : undefined,
            }}
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full transition-all
              ${selectedTimeFilter === 'morning'
                ? 'bg-white/20'
                : isDark
                ? 'bg-gray-700/50 group-hover:bg-gray-700'
                : 'bg-white group-hover:bg-gray-200'
              }
            `}>
              <Sun className={`
                w-4 h-4 transition-colors
                ${selectedTimeFilter === 'morning'
                  ? 'text-white'
                  : isDark
                  ? 'text-gray-300 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
                }
              `} />
            </div>
            <span className={`
              text-sm font-bold transition-colors
              ${selectedTimeFilter === 'morning'
                ? 'text-white'
                : isDark
                ? 'text-gray-200 group-hover:text-white'
                : 'text-gray-800 group-hover:text-gray-900'
              }
            `}>
              {lang === 'en' ? 'Morning' : 'காலை'}
            </span>
            {selectedTimeFilter === 'morning' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md animate-pulse" />
            )}
          </button>

          {/* Evening Filter */}
          <button
            onClick={() => onTimeFilterChange('evening', 'evening')}
            className={`
              group relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl
              transition-all duration-300
              ${selectedTimeFilter === 'evening'
                ? 'shadow-lg transform'
                : isDark
                ? 'bg-gray-800/50 hover:bg-gray-800'
                : 'bg-gray-50 hover:bg-gray-100'
              }
            `}
            style={{
              backgroundColor: selectedTimeFilter === 'evening' ? primaryColor : undefined,
              boxShadow: selectedTimeFilter === 'evening' ? `0 8px 24px ${primaryColor}40` : undefined,
            }}
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full transition-all
              ${selectedTimeFilter === 'evening'
                ? 'bg-white/20'
                : isDark
                ? 'bg-gray-700/50 group-hover:bg-gray-700'
                : 'bg-white group-hover:bg-gray-200'
              }
            `}>
              <Moon className={`
                w-4 h-4 transition-colors
                ${selectedTimeFilter === 'evening'
                  ? 'text-white'
                  : isDark
                  ? 'text-gray-300 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
                }
              `} />
            </div>
            <span className={`
              text-sm font-bold transition-colors
              ${selectedTimeFilter === 'evening'
                ? 'text-white'
                : isDark
                ? 'text-gray-200 group-hover:text-white'
                : 'text-gray-800 group-hover:text-gray-900'
              }
            `}>
              {lang === 'en' ? 'Evening' : 'மாலை'}
            </span>
            {selectedTimeFilter === 'evening' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md animate-pulse" />
            )}
          </button>

          {/* Veg Filter - Fixed size */}
          <button
            onClick={cycleVegFilter}
            className={`
              group relative flex items-center gap-2 px-3 py-3 rounded-2xl
              transition-colors duration-300
              ${isDark
                ? 'bg-gray-800/50 hover:bg-gray-800'
                : 'bg-gray-50 hover:bg-gray-100'
              }
            `}
          >
            {vegFilter === 'all' && (
              <div className="flex gap-1">
                <Circle className="w-4 h-4 fill-green-500 text-green-500" />
                <Circle className="w-4 h-4 fill-red-500 text-red-500" />
              </div>
            )}
            {vegFilter === 'veg' && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50">
                <Circle className="w-4 h-4 fill-green-600 text-green-600" />
              </div>
            )}
            {vegFilter === 'nonveg' && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50">
                <Circle className="w-4 h-4 fill-red-600 text-red-600" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}