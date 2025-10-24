import { Eye, Activity, TrendingUp } from 'lucide-react';
import { Restaurant } from '@/types/admin.types';
import StatCard from '../StatCard';

interface AnalyticsTabProps {
  restaurants: Restaurant[];
}

export default function AnalyticsTab({ restaurants }: AnalyticsTabProps) {
  const totalViews = restaurants.reduce((sum, r) => sum + r.totalViews, 0);
  const totalItems = restaurants.reduce((sum, r) => sum + r.totalItems, 0);
  const avgViewsPerRestaurant = Math.round(totalViews / restaurants.length);

  // Calculate plan distribution
  const planDistribution = {
    basic: restaurants.filter(r => r.planType === 'basic').length,
    pro: restaurants.filter(r => r.planType === 'pro').length,
    premium: restaurants.filter(r => r.planType === 'premium').length,
  };

  // Calculate status distribution
  const statusDistribution = {
    trial: restaurants.filter(r => r.subscriptionStatus === 'trial').length,
    active: restaurants.filter(r => r.subscriptionStatus === 'active').length,
    expired: restaurants.filter(r => r.subscriptionStatus === 'expired').length,
    suspended: restaurants.filter(r => r.subscriptionStatus === 'suspended').length,
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Menu Views"
          value={totalViews.toLocaleString()}
          icon={Eye}
          color="bg-blue-100 text-blue-600"
          subtitle="Across all restaurants"
        />
        <StatCard
          title="Total Menu Items"
          value={totalItems}
          icon={Activity}
          color="bg-green-100 text-green-600"
          subtitle="Active items"
        />
        <StatCard
          title="Avg Views/Restaurant"
          value={avgViewsPerRestaurant}
          icon={TrendingUp}
          color="bg-purple-100 text-purple-600"
          subtitle="Per month"
        />
      </div>

      {/* Plan Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Plan Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-gray-800">{planDistribution.basic}</p>
            <p className="text-sm text-gray-600 mt-1">Basic Plan</p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((planDistribution.basic / restaurants.length) * 100)}%
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-purple-800">{planDistribution.pro}</p>
            <p className="text-sm text-purple-700 mt-1">Pro Plan</p>
            <p className="text-xs text-purple-600 mt-1">
              {Math.round((planDistribution.pro / restaurants.length) * 100)}%
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-800">{planDistribution.premium}</p>
            <p className="text-sm text-orange-700 mt-1">Premium Plan</p>
            <p className="text-xs text-orange-600 mt-1">
              {Math.round((planDistribution.premium / restaurants.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Subscription Status</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-800">{statusDistribution.trial}</p>
            <p className="text-sm text-blue-700 mt-1">Trial</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-800">{statusDistribution.active}</p>
            <p className="text-sm text-green-700 mt-1">Active</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-800">{statusDistribution.expired}</p>
            <p className="text-sm text-red-700 mt-1">Expired</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{statusDistribution.suspended}</p>
            <p className="text-sm text-gray-700 mt-1">Suspended</p>
          </div>
        </div>
      </div>

      {/* Top Performing Restaurants */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Top Performing Restaurants</h3>
        <div className="space-y-3">
          {restaurants
            .sort((a, b) => b.totalViews - a.totalViews)
            .slice(0, 10)
            .map((restaurant, index) => (
              <div key={restaurant.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="font-bold text-gray-500 w-8 text-center">#{index + 1}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{restaurant.name}</p>
                  <p className="text-sm text-gray-500">{restaurant.totalItems} items • {restaurant.planType} plan</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{restaurant.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Image Usage Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Image Upload Usage</h3>
        <div className="space-y-4">
          {restaurants
            .sort((a, b) => (b.imageUploadCount / b.imageUploadLimit) - (a.imageUploadCount / a.imageUploadLimit))
            .slice(0, 5)
            .map((restaurant) => {
              const percentage = Math.round((restaurant.imageUploadCount / restaurant.imageUploadLimit) * 100);
              return (
                <div key={restaurant.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{restaurant.name}</span>
                    <span className="text-gray-600">
                      {restaurant.imageUploadCount}/{restaurant.imageUploadLimit} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        percentage >= 90 ? 'bg-red-500' :
                        percentage >= 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}