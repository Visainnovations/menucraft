import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Restaurant } from '@/types/admin.types';

export interface AdvancedFilterOptions {
  planTypes: Restaurant['planType'][];
  dateRange: { start: string; end: string } | null;
  imageUsageMin: number;
  imageUsageMax: number;
  itemsMin: number;
  itemsMax: number;
  viewsMin: number;
  viewsMax: number;
}

interface AdvancedFiltersProps {
  filters: AdvancedFilterOptions;
  onFiltersChange: (filters: AdvancedFilterOptions) => void;
  onReset: () => void;
}

export default function AdvancedFilters({
  filters,
  onFiltersChange,
  onReset,
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePlanToggle = (plan: Restaurant['planType']) => {
    const newPlans = filters.planTypes.includes(plan)
      ? filters.planTypes.filter((p) => p !== plan)
      : [...filters.planTypes, plan];
    onFiltersChange({ ...filters, planTypes: newPlans });
  };

  const hasActiveFilters = 
    filters.planTypes.length > 0 ||
    filters.dateRange !== null ||
    filters.imageUsageMin > 0 ||
    filters.imageUsageMax < 100 ||
    filters.itemsMin > 0 ||
    filters.itemsMax < 1000 ||
    filters.viewsMin > 0 ||
    filters.viewsMax < 100000;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Advanced Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Reset All
            </button>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Filters Content */}
      {isExpanded && (
        <div className="px-4 py-4 border-t border-gray-200 space-y-6">
          {/* Plan Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Types
            </label>
            <div className="flex flex-wrap gap-2">
              {(['basic', 'pro', 'premium'] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => handlePlanToggle(plan)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.planTypes.includes(plan)
                      ? plan === 'basic'
                        ? 'bg-gray-500 text-white'
                        : plan === 'pro'
                        ? 'bg-purple-500 text-white'
                        : 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  {filters.planTypes.includes(plan) && (
                    <X className="w-3 h-3 inline ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: {
                        start: e.target.value,
                        end: filters.dateRange?.end || '',
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: {
                        start: filters.dateRange?.start || '',
                        end: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Image Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Usage (%)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.imageUsageMin}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      imageUsageMin: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.imageUsageMax}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      imageUsageMax: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Menu Items Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Items Count
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  value={filters.itemsMin}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      itemsMin: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  value={filters.itemsMax}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      itemsMax: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Views Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Views Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  value={filters.viewsMin}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      viewsMin: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  value={filters.viewsMax}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      viewsMax: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}