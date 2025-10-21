import { useState } from 'react';
import { Save, Menu } from 'lucide-react';
import { Restaurant } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';

interface SettingsTabProps {
  restaurant: Restaurant;
  onUpdate: (updates: Partial<Restaurant>) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function SettingsTab({ restaurant, onUpdate, canAccess, lang }: SettingsTabProps) {
  const [formData, setFormData] = useState({
    name: restaurant.name,
    nameTamil: restaurant.nameTamil,
    primaryColor: restaurant.primaryColor || '#f97316',
    menuTemplate: restaurant.menuTemplate || 'template_1',
  });

  const handleSave = () => {
    onUpdate(formData);
    alert(lang === 'en' ? 'Settings saved successfully!' : 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">
          {lang === 'en' ? 'Restaurant Information' : 'உணவக தகவல்'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              {lang === 'en' ? 'Restaurant Name (English)' : 'உணவக பெயர் (English)'}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!canAccess}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              {lang === 'en' ? 'Restaurant Name (Tamil)' : 'உணவக பெயர் (தமிழ்)'}
            </label>
            <input
              type="text"
              value={formData.nameTamil}
              onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
              disabled={!canAccess}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              {lang === 'en' ? 'Primary Color' : 'முதன்மை நிறம்'}
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                disabled={!canAccess}
                className="w-20 h-10 border border-gray-300 rounded-lg disabled:opacity-50 cursor-pointer"
              />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                disabled={!canAccess}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">
          {lang === 'en' ? 'Menu Template' : 'மெனு டெம்ப்ளேட்'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['template_1', 'template_2', 'template_3'].map((template, idx) => {
            const isPremium = idx > 0;
            const isLocked = isPremium && restaurant.planType === 'basic';
            const isSelected = formData.menuTemplate === template;
            
            return (
              <button
                key={template}
                onClick={() => !isLocked && setFormData({ ...formData, menuTemplate: template })}
                disabled={isLocked || !canAccess}
                className={`
                  relative border-2 rounded-lg p-4 aspect-square flex items-center justify-center
                  transition-all
                  ${isLocked ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-primary-500'}
                  ${isSelected ? 'border-primary-500 bg-primary-50' : ''}
                `}
              >
                <div className="text-center">
                  <Menu className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-600">
                    {lang === 'en' ? 'Template' : 'டெம்ப்ளேட்'} {idx + 1}
                  </p>
                </div>
                {isLocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {lang === 'en' ? 'Pro Plan' : 'Pro திட்டம்'}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!canAccess}>
          <Save className="w-4 h-4" />
          {t('save', lang)} {t('settings', lang)}
        </Button>
      </div>
    </div>
  );
}