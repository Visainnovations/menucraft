import { useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { Restaurant } from '@/types/dashboard.types';
import { t } from '@utils/translations';

interface DashboardHeaderProps {
  restaurant: Restaurant;
  lang: 'en' | 'ta';
  onToggleLang: () => void;
}

export default function DashboardHeader({ restaurant, lang, onToggleLang }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('restaurantName');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {lang === 'en' ? restaurant.name : restaurant.nameTamil}
              </h1>
              <p className="text-xs text-gray-500">
                {restaurant.planType.toUpperCase()} Plan
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-xs sm:text-sm transition-colors"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs sm:text-sm font-medium"
              title={t('logout', lang)}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t('logout', lang)}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}