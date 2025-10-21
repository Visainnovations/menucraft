import { Eye } from 'lucide-react';
import { MenuItem } from '@/types/dashboard.types';

interface AnalyticsTabProps {
  items: MenuItem[];
  lang: 'en' | 'ta';
}

export default function AnalyticsTab({ items, lang }: AnalyticsTabProps) {
  const sortedItems = [...items].sort((a, b) => b.viewCount - a.viewCount);
  const totalViews = items.reduce((sum, item) => sum + item.viewCount, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-medium opacity-90">
            {lang === 'en' ? 'Total Menu Views' : 'மொத்த மெனு பார்வைகள்'}
          </h3>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{totalViews}</p>
          <p className="text-sm opacity-75 mt-2">
            +15% {lang === 'en' ? 'from last week' : 'கடந்த வாரத்திலிருந்து'}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-medium opacity-90">
            {lang === 'en' ? 'Most Popular Item' : 'மிகவும் பிரபலமான உணவு'}
          </h3>
          <p className="text-xl sm:text-2xl font-bold mt-2 truncate">{sortedItems[0]?.name || '-'}</p>
          <p className="text-sm opacity-75 mt-2">
            {sortedItems[0]?.viewCount || 0} {lang === 'en' ? 'views' : 'பார்வைகள்'}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-medium opacity-90">
            {lang === 'en' ? 'Avg. Time on Menu' : 'சராசரி மெனு நேரம்'}
          </h3>
          <p className="text-3xl sm:text-4xl font-bold mt-2">2:45</p>
          <p className="text-sm opacity-75 mt-2">
            {lang === 'en' ? 'minutes' : 'நிமிடங்கள்'}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">
          {lang === 'en' ? 'Most Viewed Items' : 'அதிகம் பார்க்கப்பட்ட உணவுகள்'}
        </h3>
        <div className="space-y-3">
          {sortedItems.slice(0, 10).map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-500 w-6 flex-shrink-0">
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {lang === 'en' ? item.nameTamil : item.name}
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                <Eye className="w-4 h-4" />
                <span className="font-semibold">{item.viewCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}