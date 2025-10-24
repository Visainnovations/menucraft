// src/components/admin/tabs/RestaurantsTab.tsx

import { useState, useMemo } from 'react';
import { Search, Download, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Restaurant } from '@/types/admin.types';
import { useDebounce } from '@/hooks/useDebounce';
import RestaurantRow from './RestaurantRow';
import Pagination from '../Pagination';
import AdvancedFilters, { AdvancedFilterOptions } from '../AdvancedFilters';

interface RestaurantsTabProps {
  restaurants: Restaurant[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | Restaurant['subscriptionStatus'];
  setStatusFilter: (filter: 'all' | Restaurant['subscriptionStatus']) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

type SortField = 'name' | 'ownerName' | 'createdAt' | 'totalViews' | 'totalItems' | 'subscriptionStatus';
type SortDirection = 'asc' | 'desc';

export default function RestaurantsTab({ 
  restaurants, 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  onSelectRestaurant 
}: RestaurantsTabProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterOptions>({
    planTypes: [],
    dateRange: null,
    imageUsageMin: 0,
    imageUsageMax: 100,
    itemsMin: 0,
    itemsMax: 1000,
    viewsMin: 0,
    viewsMax: 100000,
  });

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-orange-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-orange-600" />
    );
  };

  // Filter and sort restaurants
  const filteredAndSortedRestaurants = useMemo(() => {
    const filtered = restaurants.filter(restaurant => {
      // Basic search
      const matchesSearch = 
        restaurant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        restaurant.ownerName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        restaurant.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || restaurant.subscriptionStatus === statusFilter;

      // Plan filter
      const matchesPlan = 
        advancedFilters.planTypes.length === 0 || 
        advancedFilters.planTypes.includes(restaurant.planType);

      // Date range filter
      let matchesDate = true;
      if (advancedFilters.dateRange?.start || advancedFilters.dateRange?.end) {
        const createdDate = new Date(restaurant.createdAt);
        if (advancedFilters.dateRange.start) {
          matchesDate = matchesDate && createdDate >= new Date(advancedFilters.dateRange.start);
        }
        if (advancedFilters.dateRange.end) {
          matchesDate = matchesDate && createdDate <= new Date(advancedFilters.dateRange.end);
        }
      }

      // Image usage filter
      const imageUsagePercent = (restaurant.imageUploadCount / restaurant.imageUploadLimit) * 100;
      const matchesImageUsage = 
        imageUsagePercent >= advancedFilters.imageUsageMin && 
        imageUsagePercent <= advancedFilters.imageUsageMax;

      // Items filter
      const matchesItems = 
        restaurant.totalItems >= advancedFilters.itemsMin && 
        restaurant.totalItems <= advancedFilters.itemsMax;

      // Views filter
      const matchesViews = 
        restaurant.totalViews >= advancedFilters.viewsMin && 
        restaurant.totalViews <= advancedFilters.viewsMax;

      return matchesSearch && matchesStatus && matchesPlan && matchesDate && 
             matchesImageUsage && matchesItems && matchesViews;
    });

    // Sort
    filtered.sort((a, b) => {
      // Explicitly pick and type the values based on the sortField to avoid `any`
      let aValue: string | number;
      let bValue: string | number;

      if (sortField === 'createdAt') {
        // date -> numeric timestamp
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else if (sortField === 'totalViews') {
        aValue = a.totalViews;
        bValue = b.totalViews;
      } else if (sortField === 'totalItems') {
        aValue = a.totalItems;
        bValue = b.totalItems;
      } else if (sortField === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortField === 'ownerName') {
        aValue = a.ownerName.toLowerCase();
        bValue = b.ownerName.toLowerCase();
      } else {
        // subscriptionStatus
        aValue = a.subscriptionStatus.toLowerCase();
        bValue = b.subscriptionStatus.toLowerCase();
      }

      if (aValue === bValue) return 0;

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [restaurants, debouncedSearchTerm, statusFilter, advancedFilters, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedRestaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRestaurants = filteredAndSortedRestaurants.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFiltersChange = (filters: AdvancedFilterOptions) => {
    setAdvancedFilters(filters);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (filter: typeof statusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setAdvancedFilters({
      planTypes: [],
      dateRange: null,
      imageUsageMin: 0,
      imageUsageMax: 100,
      itemsMin: 0,
      itemsMax: 1000,
      viewsMin: 0,
      viewsMax: 100000,
    });
    setCurrentPage(1);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Owner', 'Email', 'Phone', 'Status', 'Plan', 'Items', 'Views', 'Created'];
    const rows = filteredAndSortedRestaurants.map(r => [
      r.id,
      r.name,
      r.ownerName,
      r.email,
      r.phone,
      r.subscriptionStatus,
      r.planType,
      r.totalItems,
      r.totalViews,
      r.createdAt,
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `menucraft-restaurants-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Basic Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search restaurants, owners, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {searchTerm && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              Searching...
            </div>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value as typeof statusFilter)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="trial">Trial</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="suspended">Suspended</option>
        </select>

        <button 
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        filters={advancedFilters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {/* Restaurant Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-600"
                >
                  Restaurant
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('ownerName')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-600"
                >
                  Owner
                  {getSortIcon('ownerName')}
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('subscriptionStatus')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-600"
                >
                  Status
                  {getSortIcon('subscriptionStatus')}
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Plan</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Expiry</th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('totalItems')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-600"
                >
                  Usage
                  {getSortIcon('totalItems')}
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedRestaurants.map((restaurant) => (
              <RestaurantRow 
                key={restaurant.id} 
                restaurant={restaurant}
                onSelect={onSelectRestaurant}
              />
            ))}
          </tbody>
        </table>

        {paginatedRestaurants.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium mb-2">No restaurants found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAndSortedRestaurants.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedRestaurants.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(size) => {
            setItemsPerPage(size);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}