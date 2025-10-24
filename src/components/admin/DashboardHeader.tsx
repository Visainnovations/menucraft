import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get user info from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'admin@menucraft.com';
  const userName = localStorage.getItem('userName') || 'Admin User';

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Redirect to login page
    navigate('/login');
  };

  const handleProfileSettings = () => {
    alert('Profile settings coming soon!');
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MenuCraft Admin</h1>
              <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    {/* User Info (Mobile) */}
                    <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={handleProfileSettings}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <User className="w-4 h-4" />
                      Profile Settings
                    </button>
                    
                    <button
                      onClick={handleProfileSettings}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      Admin Settings
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-red-600 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}