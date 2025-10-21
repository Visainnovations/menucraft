import { Restaurant } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';

interface TimeSlotsTabProps {
  restaurant: Restaurant;
  onUpdate: (updates: Partial<Restaurant>) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function TimeSlotsTab({ restaurant, onUpdate, canAccess, lang }: TimeSlotsTabProps) {
  const slots = restaurant.timeSlots || [
    { id: '1', type: 'breakfast' as const, start: '06:00', end: '11:00' },
    { id: '2', type: 'lunch' as const, start: '11:00', end: '16:00' },
    { id: '3', type: 'snacks' as const, start: '16:00', end: '19:00' },
    { id: '4', type: 'dinner' as const, start: '19:00', end: '23:30' },
  ];

  const handleSave = () => {
    onUpdate({ timeSlots: slots });
    alert(lang === 'en' ? 'Time slots saved!' : 'நேர இடைவெளிகள் சேமிக்கப்பட்டன!');
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-blue-800">
          {lang === 'en' 
            ? 'Set your restaurant timing. Menu items will automatically show/hide based on current time.' 
            : 'உங்கள் உணவகத்தின் நேரத்தை அமைக்கவும். தற்போதைய நேரத்தின் அடிப்படையில் மெனு உருப்படிகள் தானாகவே காட்டப்படும்/மறைக்கப்படும்.'}
        </p>
      </div>

      {slots.map(slot => (
        <div key={slot.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-2">
                {t(slot.type, lang)}
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">
                    {lang === 'en' ? 'Start Time' : 'தொடக்க நேரம்'}
                  </label>
                  <input
                    type="time"
                    value={slot.start}
                    disabled={!canAccess}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">
                    {lang === 'en' ? 'End Time' : 'முடிவு நேரம்'}
                  </label>
                  <input
                    type="time"
                    value={slot.end}
                    disabled={!canAccess}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={!canAccess}>
          {t('save', lang)}
        </Button>
      </div>
    </div>
  );
}