import { Menu, Clock, QrCode, BarChart, Settings } from 'lucide-react';
import { t } from '@utils/translations';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: 'en' | 'ta';
}

export default function TabNavigation({ activeTab, onTabChange, lang }: TabNavigationProps) {
  const tabs = [
    { id: 'menu', icon: Menu, label: t('menu', lang) },
    { id: 'timeSlots', icon: Clock, label: t('timeSlots', lang) },
    { id: 'qrCode', icon: QrCode, label: t('qrCode', lang) },
    { id: 'analytics', icon: BarChart, label: t('analytics', lang) },
    { id: 'settings', icon: Settings, label: t('settings', lang) },
  ];

  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap
              ${activeTab === tab.id 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}