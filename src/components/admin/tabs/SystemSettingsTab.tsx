import { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { SystemSettings } from '@/types/admin.types';

interface SystemSettingsTabProps {
  settings: SystemSettings;
}

export default function SystemSettingsTab({ settings }: SystemSettingsTabProps) {
  const [trialDuration, setTrialDuration] = useState(settings.trialDurationDays);
  const [basicLimit, setBasicLimit] = useState(settings.basicPlanImageLimit);
  const [proLimit, setProLimit] = useState(settings.proPlanImageLimit);
  const [premiumLimit, setPremiumLimit] = useState(settings.premiumPlanImageLimit);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveSettings = () => {
    // In real app, this would call an API
    console.log('Saving settings:', {
      trialDuration,
      basicLimit,
      proLimit,
      premiumLimit,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const hasChanges = 
    trialDuration !== settings.trialDurationDays ||
    basicLimit !== settings.basicPlanImageLimit ||
    proLimit !== settings.proPlanImageLimit ||
    premiumLimit !== settings.premiumPlanImageLimit;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Save className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-green-900">Settings saved successfully!</p>
            <p className="text-sm text-green-700">Your changes have been applied.</p>
          </div>
        </div>
      )}

      {/* Trial Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-bold text-gray-900">Trial Period Settings</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
            Default
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trial Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="90"
              value={trialDuration}
              onChange={(e) => setTrialDuration(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              New users will get {trialDuration} days of free trial
            </p>
          </div>
        </div>
      </div>

      {/* Plan Limits */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-bold text-gray-900">Plan Image Upload Limits</h3>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
            Per Restaurant
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Basic Plan */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Basic Plan
                </label>
                <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                  FREE
                </span>
              </div>
              <input
                type="number"
                min="1"
                max="100"
                value={basicLimit}
                onChange={(e) => setBasicLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Images allowed</p>
            </div>

            {/* Pro Plan */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-purple-700">
                  Pro Plan
                </label>
                <span className="px-2 py-0.5 bg-purple-200 text-purple-700 text-xs font-semibold rounded">
                  PAID
                </span>
              </div>
              <input
                type="number"
                min="1"
                max="200"
                value={proLimit}
                onChange={(e) => setProLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-purple-600 mt-1">Images allowed</p>
            </div>

            {/* Premium Plan */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-orange-700">
                  Premium Plan
                </label>
                <span className="px-2 py-0.5 bg-orange-200 text-orange-700 text-xs font-semibold rounded">
                  PAID
                </span>
              </div>
              <input
                type="number"
                min="1"
                max="500"
                value={premiumLimit}
                onChange={(e) => setPremiumLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-orange-600 mt-1">Images allowed</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">System Information</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Changes will apply to all new restaurants</p>
              <p>• Existing restaurants will keep their current limits</p>
              <p>• Trial duration applies from registration date</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Current System Stats</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{settings.totalRestaurants}</p>
            <p className="text-sm text-gray-600">Total Restaurants</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{settings.activeSubscriptions}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{settings.trialUsers}</p>
            <p className="text-sm text-gray-600">Trial Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{settings.expiredUsers}</p>
            <p className="text-sm text-gray-600">Expired</p>
          </div>
        </div>
      </div>

      {/* Revenue Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Revenue Overview</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">{settings.totalRevenue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-3xl font-bold text-green-600">{settings.monthlyRevenue}</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-gray-600">
          {hasChanges && (
            <span className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              You have unsaved changes
            </span>
          )}
        </div>
        <button 
          onClick={handleSaveSettings}
          disabled={!hasChanges}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            hasChanges
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}