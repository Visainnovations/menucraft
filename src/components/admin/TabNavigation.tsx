import { Users, TrendingUp, Settings } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'restaurants' | 'analytics' | 'settings';
  onTabChange: (tab: 'restaurants' | 'analytics' | 'settings') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'restaurants' as const, icon: Users, label: 'Restaurants' },
    { id: 'analytics' as const, icon: TrendingUp, label: 'Analytics' },
    { id: 'settings' as const, icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors
              ${activeTab === tab.id 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}