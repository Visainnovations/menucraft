import { useState } from 'react';
import DashboardLayout from '@components/admin/DashboardLayout';
import DashboardHeader from '@components/admin/DashboardHeader';
import StatsOverview from '@components/admin/StatsOverview';
import TabNavigation from '@components/admin/TabNavigation';
import RestaurantsTab from '@components/admin/tabs/RestaurantsTab';
import AnalyticsTab from '@components/admin/tabs/AnalyticsTab';
import SystemSettingsTab from '@components/admin/tabs/SystemSettingsTab';
import RestaurantDetailModal from '@components/admin/RestaurantDetailModal';
import { Restaurant } from '@/types/admin.types';
import { getAdminData } from '@utils/adminData';

export default function SuperAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'analytics' | 'settings'>('restaurants');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Restaurant['subscriptionStatus']>('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const adminData = getAdminData();
  const { restaurants, systemSettings } = adminData;

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || restaurant.subscriptionStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview settings={systemSettings} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="p-6">
            {activeTab === 'restaurants' && (
              <RestaurantsTab
                restaurants={filteredRestaurants}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onSelectRestaurant={setSelectedRestaurant}
              />
            )}
            
            {activeTab === 'analytics' && <AnalyticsTab restaurants={restaurants} />}
            
            {activeTab === 'settings' && <SystemSettingsTab settings={systemSettings} />}
          </div>
        </div>
      </div>

      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </DashboardLayout>
  );
}