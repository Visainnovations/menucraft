import { Clock, Sun, Moon } from 'lucide-react';
import { CustomerRestaurant, Language } from '@/types/customer.types';

interface ClosedBannerProps {
  restaurant: CustomerRestaurant;
  lang: Language;
  isDark: boolean;
}

export default function ClosedBanner({ restaurant, lang, isDark }: ClosedBannerProps) {
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div
      className={`mb-4 ${
        isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-red-50 to-orange-50'
      } rounded-2xl p-4 border-2 ${isDark ? 'border-red-900' : 'border-red-200'}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3
            className={`font-bold text-sm mb-1 ${
              isDark ? 'text-red-400' : 'text-red-700'
            }`}
          >
            {lang === 'en' ? "We're Currently Closed" : 'இப்போது மூடப்பட்டுள்ளது'}
          </h3>
          <p
            className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            } mb-2`}
          >
            {lang === 'en' ? 'Visit us during our serving hours:' : 'எங்கள் பரிமாறும் நேரம்:'}
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className={`font-semibold ${textColor}`}>
                {restaurant.timings.morning.start} - {restaurant.timings.morning.end}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span className={`font-semibold ${textColor}`}>
                {restaurant.timings.evening.start} - {restaurant.timings.evening.end}
              </span>
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            } font-medium`}
          >
            {lang === 'en'
              ? '✨ You can still browse our menu below!'
              : '✨ நீங்கள் இன்னும் எங்கள் மெனுவை பார்க்கலாம்!'}
          </p>
        </div>
      </div>
    </div>
  );
}