import { useState, FormEvent } from 'react';
import { X, Save, HelpCircle } from 'lucide-react';
import { Category } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';

interface CategoryFormModalProps {
  category: Category | null;
  categories: Category[];
  onClose: () => void;
  onSave: (category: Category) => void;
  lang: 'en' | 'ta';
}

export default function CategoryFormModal({ 
  category, 
  categories,
  onClose, 
  onSave, 
  lang 
}: CategoryFormModalProps) {
  const [formData, setFormData] = useState<Partial<Category>>(category || {
    id: Date.now().toString(),
    name: '',
    nameTamil: '',
    displayOrder: categories.length + 1,
    availableTimes: ['breakfast', 'lunch', 'dinner', 'snacks'],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = lang === 'en' ? 'Category name is required' : 'வகை பெயர் தேவை';
    }

    // Check for duplicate category name (case-insensitive)
    const isDuplicate = categories.some(
      cat => cat.id !== formData.id && 
      cat.name.toLowerCase() === formData.name?.toLowerCase().trim()
    );
    
    if (isDuplicate) {
      newErrors.name = lang === 'en' ? 'Category name already exists' : 'வகை பெயர் ஏற்கனவே உள்ளது';
    }

    if (!formData.availableTimes || formData.availableTimes.length === 0) {
      newErrors.availableTimes = lang === 'en' ? 'Select at least one time slot' : 'குறைந்தது ஒரு நேர இடைவெளியை தேர்ந்தெடுக்கவும்';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData as Category);
  };

  const toggleTimeSlot = (time: string) => {
    const currentTimes = formData.availableTimes || [];
    setFormData({ 
      ...formData, 
      availableTimes: currentTimes.includes(time)
        ? currentTimes.filter(t => t !== time)
        : [...currentTimes, time]
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {category ? t('edit', lang) : lang === 'en' ? 'Add New' : 'புதியது சேர்'} {t('category', lang)}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <div className="space-y-6">
            {/* Category Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  {lang === 'en' ? 'Category Name (English)' : 'வகை பெயர் (English)'} *
                  <Tooltip text={lang === 'en' ? 'Enter category name in English' : 'ஆங்கிலத்தில் வகை பெயரை உள்ளிடவும்'}>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={lang === 'en' ? 'e.g., South Indian' : 'உதாரணம்: தென்னிந்திய உணவுகள்'}
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {lang === 'en' ? 'Category Name (Tamil)' : 'வகை பெயர் (தமிழ்)'}
                </label>
                <input
                  type="text"
                  value={formData.nameTamil || ''}
                  onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={lang === 'en' ? 'e.g., தென்னிந்திய உணவுகள்' : 'உதாரணம்: தென்னிந்திய உணவுகள்'}
                />
              </div>
            </div>

            {/* Display Order */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                {lang === 'en' ? 'Display Order' : 'காட்சி வரிசை'}
                <Tooltip text={lang === 'en' ? 'Order in which this category appears in the menu' : 'மெனுவில் இந்த வகை தோன்றும் வரிசை'}>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={formData.displayOrder || 1}
                onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'en' ? 'Lower numbers appear first' : 'குறைந்த எண்கள் முதலில் தோன்றும்'}
              </p>
            </div>

            {/* Available Times */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                {lang === 'en' ? 'Available During' : 'கிடைக்கும் நேரம்'} *
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {lang === 'en' 
                  ? 'Select when items in this category are available' 
                  : 'இந்த வகையில் உள்ள உணவுகள் எப்போது கிடைக்கும் என்பதை தேர்ந்தெடுக்கவும்'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['breakfast', 'lunch', 'snacks', 'dinner'].map(time => (
                  <label 
                    key={time} 
                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.availableTimes?.includes(time) || false}
                      onChange={() => toggleTimeSlot(time)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium">{t(time, lang)}</span>
                  </label>
                ))}
              </div>
              {errors.availableTimes && <p className="text-red-600 text-xs mt-2">{errors.availableTimes}</p>}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-medium mb-1">
                    {lang === 'en' ? 'Tip' : 'குறிப்பு'}
                  </p>
                  <p className="text-sm text-blue-800">
                    {lang === 'en' 
                      ? 'Categories help organize your menu. Items within a category will inherit these availability times by default.' 
                      : 'வகைகள் உங்கள் மெனுவை ஒழுங்கமைக்க உதவுகின்றன. ஒரு வகையில் உள்ள உணவுகள் இந்த நேர அமைப்புகளை பெறும்.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-end gap-3 rounded-b-xl">
          <Button onClick={onClose} variant="secondary" className="w-full sm:w-auto">
            {t('cancel', lang)}
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            <Save className="w-4 h-4" />
            {t('save', lang)}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Tooltip Component
interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

function Tooltip({ children, text }: TooltipProps) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-full ml-2 whitespace-nowrap max-w-xs">
          {text}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-3"></div>
        </div>
      )}
    </div>
  );
}