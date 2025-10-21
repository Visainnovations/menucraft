import { Sun, Moon, Circle } from 'lucide-react';
import { Language, TimeSlot, VegFilter } from '@/types/customer.types';

interface CustomerMenuFiltersProps {
  lang: Language;
  selectedTimeFilter: TimeSlot;
  onTimeFilterChange: (filter: TimeSlot) => void;
  vegFilter: VegFilter;
  onVegFilterChange: (filter: VegFilter) => void;
  isDark: boolean;
  primaryColor: string;
}

export default function CustomerMenuFilters({
  lang,
  selectedTimeFilter,
  onTimeFilterChange,
  vegFilter,
  onVegFilterChange,
  isDark,
  primaryColor,
}: CustomerMenuFiltersProps) {
  const cycleVegFilter = () => {
    if (vegFilter === 'all') onVegFilterChange('veg');
    else if (vegFilter === 'veg') onVegFilterChange('nonveg');
    else onVegFilterChange('all');
  };

  return (
    <div className={`sticky top-[88px] z-40 ${isDark ? 'bg-gray-900' : 'bg-white'} px-4 py-3 shadow-md`}>
      <div className="flex gap-2">
        {/* Morning Filter */}
        <button
          onClick={() => onTimeFilterChange('morning')}
          className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            selectedTimeFilter === 'morning'
              ? 'text-white shadow-md'
              : isDark
              ? 'bg-gray-800 text-gray-300'
              : 'bg-white text-gray-700'
          }`}
          style={{
            backgroundColor: selectedTimeFilter === 'morning' ? primaryColor : undefined,
          }}
        >
          <Sun className="w-3.5 h-3.5" />
          {lang === 'en' ? 'Morning' : 'காலை'}
        </button>

        {/* Evening Filter */}
        <button
          onClick={() => onTimeFilterChange('evening')}
          className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            selectedTimeFilter === 'evening'
              ? 'text-white shadow-md'
              : isDark
              ? 'bg-gray-800 text-gray-300'
              : 'bg-white text-gray-700'
          }`}
          style={{
            backgroundColor: selectedTimeFilter === 'evening' ? primaryColor : undefined,
          }}
        >
          <Moon className="w-3.5 h-3.5" />
          {lang === 'en' ? 'Evening' : 'மாலை'}
        </button>

        {/* Veg Filter */}
        <button
          onClick={cycleVegFilter}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {vegFilter === 'all' && <span>🟢🔴</span>}
          {vegFilter === 'veg' && (
            <Circle className="w-3 h-3 fill-green-600 text-green-600" />
          )}
          {vegFilter === 'nonveg' && (
            <Circle className="w-3 h-3 fill-red-600 text-red-600" />
          )}
        </button>
      </div>
    </div>
  );
}