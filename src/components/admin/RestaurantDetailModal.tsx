import { useState } from 'react';
import { X, CheckCircle, Calendar, Mail } from 'lucide-react';
import { Restaurant } from '@/types/admin.types';
import StatusBadge from './StatusBadge';
import PlanBadge from './PlanBadge';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export default function RestaurantDetailModal({ restaurant, onClose }: RestaurantDetailModalProps) {
  const [extendDays, setExtendDays] = useState(30);
  const [selectedPlan, setSelectedPlan] = useState(restaurant.planType);

  const handleActivate = () => {
    alert(`Activating subscription for ${restaurant.name}`);
    onClose();
  };

  const handleExtend = () => {
    alert(`Extending by ${extendDays} days with ${selectedPlan} plan`);
    onClose();
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${restaurant.email}`;
  };

  // Calculate usage percentage
  const imageUsagePercentage = Math.round(
    (restaurant.imageUploadCount / restaurant.imageUploadLimit) * 100
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{restaurant.name}</h2>
            <p className="text-sm text-gray-500">Restaurant ID: {restaurant.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleActivate}
              className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Activate Subscription
            </button>
            <button 
              onClick={handleSendEmail}
              className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </button>
          </div>

          {/* Restaurant Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Owner Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{restaurant.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900 truncate ml-2">{restaurant.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">{restaurant.phone}</span>
                </div>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Subscription Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={restaurant.subscriptionStatus} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <PlanBadge plan={restaurant.planType} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(restaurant.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
                {restaurant.trialEndDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trial Ends:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(restaurant.trialEndDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                )}
                {restaurant.subscriptionEndDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(restaurant.subscriptionEndDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{restaurant.totalCategories}</p>
              <p className="text-sm text-blue-800 mt-1">Categories</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{restaurant.totalItems}</p>
              <p className="text-sm text-green-800 mt-1">Menu Items</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">{restaurant.imageUploadCount}</p>
              <p className="text-sm text-purple-800 mt-1">Images Used</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{restaurant.totalViews.toLocaleString()}</p>
              <p className="text-sm text-orange-800 mt-1">Total Views</p>
            </div>
          </div>

          {/* Image Usage Progress */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">Image Upload Usage</h3>
              <span className="text-sm font-medium text-gray-700">
                {restaurant.imageUploadCount} / {restaurant.imageUploadLimit} ({imageUsagePercentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  imageUsagePercentage >= 90 ? 'bg-red-500' :
                  imageUsagePercentage >= 70 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${imageUsagePercentage}%` }}
              />
            </div>
            {imageUsagePercentage >= 90 && (
              <p className="text-xs text-red-600 mt-1">⚠️ Approaching limit - Consider upgrading plan</p>
            )}
          </div>

          {/* Extend Subscription Form */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Extend Access</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extend By (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={extendDays}
                    onChange={(e) => setExtendDays(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Type
                  </label>
                  <select 
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as Restaurant['planType'])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleExtend}
                className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Update Subscription
              </button>
            </div>
          </div>

          {/* Action History (Placeholder) */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Account created on {new Date(restaurant.createdAt).toLocaleDateString('en-IN')}</p>
              <p>• Currently on {restaurant.planType} plan</p>
              <p>• {restaurant.totalViews} total menu views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}