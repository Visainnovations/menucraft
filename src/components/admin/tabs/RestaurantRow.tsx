import { useState } from 'react';
import { Eye, Edit2, MoreVertical, Mail, Calendar, CheckCircle, XCircle, ImageIcon, Activity } from 'lucide-react';
import { Restaurant } from '@/types/admin.types';
import StatusBadge from '../StatusBadge';
import PlanBadge from '../PlanBadge';

interface RestaurantRowProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export default function RestaurantRow({ restaurant, onSelect }: RestaurantRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getExpiryDate = () => {
    if (restaurant.subscriptionStatus === 'trial' && restaurant.trialEndDate) {
      return new Date(restaurant.trialEndDate).toLocaleDateString('en-IN');
    }
    if (restaurant.subscriptionStatus === 'active' && restaurant.subscriptionEndDate) {
      return new Date(restaurant.subscriptionEndDate).toLocaleDateString('en-IN');
    }
    return '-';
  };

  const getDaysRemaining = () => {
    const expiryDate = restaurant.subscriptionStatus === 'trial' 
      ? restaurant.trialEndDate ? new Date(restaurant.trialEndDate) : null
      : restaurant.subscriptionEndDate ? new Date(restaurant.subscriptionEndDate) : null;
    
    if (!expiryDate) return '-';
    
    const today = new Date();
    const diff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return 'Expired';
    if (diff === 0) return 'Today';
    if (diff === 1) return '1 day';
    return `${diff} days`;
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${restaurant.email}?subject=MenuCraft Support`;
    setShowMenu(false);
  };

  const handleExtendTrial = () => {
    alert(`Extend trial for ${restaurant.name}`);
    setShowMenu(false);
  };

  const handleActivate = () => {
    alert(`Activate subscription for ${restaurant.name}`);
    setShowMenu(false);
  };

  const handleSuspend = () => {
    if (confirm(`Are you sure you want to suspend ${restaurant.name}?`)) {
      alert(`Suspended ${restaurant.name}`);
    }
    setShowMenu(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <button 
          onClick={() => onSelect(restaurant)}
          className="text-left hover:text-orange-600 transition-colors"
        >
          <p className="font-semibold text-gray-900">{restaurant.name}</p>
          <p className="text-sm text-gray-500">{restaurant.email}</p>
        </button>
      </td>
      
      <td className="py-4 px-4">
        <p className="font-medium text-gray-900">{restaurant.ownerName}</p>
        <p className="text-sm text-gray-500">{restaurant.phone}</p>
      </td>
      
      <td className="py-4 px-4">
        <StatusBadge status={restaurant.subscriptionStatus} />
      </td>
      
      <td className="py-4 px-4">
        <PlanBadge plan={restaurant.planType} />
      </td>
      
      <td className="py-4 px-4">
        <p className="text-sm font-medium text-gray-900">{getExpiryDate()}</p>
        <p className="text-xs text-gray-500">{getDaysRemaining()}</p>
      </td>
      
      <td className="py-4 px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">
              {restaurant.imageUploadCount}/{restaurant.imageUploadLimit}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">
              {restaurant.totalItems} items
            </span>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSelect(restaurant)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          
          <button 
            onClick={() => onSelect(restaurant)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="More Actions"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button 
                    onClick={handleSendEmail}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button 
                    onClick={handleExtendTrial}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Extend Trial
                  </button>
                  <button 
                    onClick={handleActivate}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-green-600"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Activate
                  </button>
                  <button 
                    onClick={handleSuspend}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <XCircle className="w-4 h-4" />
                    Suspend
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}