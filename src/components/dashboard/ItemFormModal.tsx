import { useState, FormEvent } from 'react';
import { X, Save, Upload, AlertCircle, HelpCircle, Star, Flame, Sparkles, Leaf, Plus, Info, Heart, Users } from 'lucide-react';
import { MenuItem, Category, Restaurant } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';

interface ItemFormModalProps {
  item: MenuItem | null;
  categories: Category[];
  restaurant: Restaurant;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  lang: 'en' | 'ta';
}

export default function ItemFormModal({ 
  item, 
  categories, 
  restaurant,
  onClose, 
  onSave, 
  lang 
}: ItemFormModalProps) {
  const [formData, setFormData] = useState<Partial<MenuItem>>(item || {
    id: Date.now().toString(),
    name: '',
    nameTamil: '',
    description: '',
    price: 0,
    categoryId: categories[0]?.id || '',
    isChefsSpecial: false,
    isTodaysSpecial: false,
    isSeasonal: false,
    isVeg: true,
    spiceLevel: 0,
    availableTimes: ['breakfast', 'lunch', 'dinner', 'snacks'],
    viewCount: 0,
    imageUrl: '',
    ingredients: [],
    nutritionFacts: {},
    allergens: [],
    servingSize: '',
    servings: 1,
    funFact: '',
    preparationTime: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newIngredient, setNewIngredient] = useState('');
  const canUploadImage = restaurant.imageUploadCount < restaurant.imageUploadLimit;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = lang === 'en' ? 'Item name is required' : 'உணவு பெயர் தேவை';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = lang === 'en' ? 'Price must be greater than 0' : 'விலை 0 விட அதிகமாக இருக்க வேண்டும்';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = lang === 'en' ? 'Category is required' : 'வகை தேவை';
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
    onSave(formData as MenuItem);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, imageUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
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

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...(formData.ingredients || []), newIngredient.trim()]
      });
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients?.filter((_, i) => i !== index)
    });
  };

  const toggleAllergen = (allergen: string) => {
    const current = formData.allergens || [];
    setFormData({
      ...formData,
      allergens: current.includes(allergen)
        ? current.filter(a => a !== allergen)
        : [...current, allergen]
    });
  };

  const updateNutrition = (field: string, value: string) => {
    setFormData({
      ...formData,
      nutritionFacts: {
        ...formData.nutritionFacts,
        [field]: value ? Number(value) : undefined
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {item ? t('edit', lang) : lang === 'en' ? 'Add New' : 'புதியது சேர்'} {t('items', lang)}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <div className="space-y-8">
            {/* BASIC INFORMATION */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary-500" />
                {t('basicInfo', lang)}
              </h3>
              
              <div className="space-y-4">
                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      {lang === 'en' ? 'Item Name (English)' : 'உணவு பெயர் (English)'} *
                      <Tooltip text={lang === 'en' ? 'Enter item name in English' : 'ஆங்கிலத்தில் உணவு பெயரை உள்ளிடவும்'}>
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
                      placeholder="Masala Dosa"
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {lang === 'en' ? 'Item Name (Tamil)' : 'உணவு பெயர் (தமிழ்)'}
                    </label>
                    <input
                      type="text"
                      value={formData.nameTamil || ''}
                      onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="மசாலா தோசை"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {lang === 'en' ? 'Description (Optional)' : 'விளக்கம் (விருப்பம்)'}
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder={lang === 'en' ? 'Brief description of the dish...' : 'உணவின் சுருக்கமான விளக்கம்...'}
                  />
                </div>

                {/* Price, Category, Prep Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      {t('price', lang)} (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="80"
                      min="0"
                      step="1"
                    />
                    {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {lang === 'en' ? 'Category' : 'வகை'} *
                    </label>
                    <select
                      value={formData.categoryId || ''}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.categoryId ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{lang === 'en' ? 'Select category' : 'வகையை தேர்ந்தெடுக்கவும்'}</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {lang === 'en' ? cat.name : (cat.nameTamil || cat.name)}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && <p className="text-red-600 text-xs mt-1">{errors.categoryId}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {t('preparationTime', lang)}
                    </label>
                    <input
                      type="number"
                      value={formData.preparationTime || ''}
                      onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="15"
                      min="1"
                    />
                  </div>
                </div>

                {/* Special Tags */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {lang === 'en' ? 'Special Tags' : 'சிறப்பு குறிகள்'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'isChefsSpecial', icon: Star, color: 'text-yellow-600', label: 'chefsSpecial' },
                      { key: 'isTodaysSpecial', icon: Flame, color: 'text-red-600', label: 'todaysSpecial' },
                      { key: 'isSeasonal', icon: Sparkles, color: 'text-purple-600', label: 'seasonal' },
                      { key: 'isVeg', icon: Leaf, color: 'text-green-600', label: 'vegetarian' }
                    ].map(({ key, icon: Icon, color, label }) => (
                      <label key={key} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData[key as keyof MenuItem] as boolean || false}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-sm">{t(label, lang)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Available Times */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {lang === 'en' ? 'Available During' : 'கிடைக்கும் நேரம்'} *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['breakfast', 'lunch', 'snacks', 'dinner'].map(time => (
                      <label key={time} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.availableTimes?.includes(time) || false}
                          onChange={() => toggleTimeSlot(time)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm">{t(time, lang)}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availableTimes && <p className="text-red-600 text-xs mt-1">{errors.availableTimes}</p>}
                </div>

                {/* Spice Level */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {lang === 'en' ? 'Spice Level' : 'காரத்தன்மை'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { level: 0, emoji: '😊', label: lang === 'en' ? 'Mild' : 'சுவை' },
                      { level: 1, emoji: '🌶️', label: lang === 'en' ? 'Medium' : 'நடுத்தர' },
                      { level: 2, emoji: '🌶️🌶️', label: lang === 'en' ? 'Hot' : 'காரம்' },
                      { level: 3, emoji: '🌶️🌶️🌶️', label: lang === 'en' ? 'Very Hot' : 'மிகக் காரம்' }
                    ].map(({ level, emoji, label }) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, spiceLevel: level })}
                        className={`py-2 px-3 border-2 rounded-lg transition-all ${
                          formData.spiceLevel === level
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg block">{emoji}</span>
                        <p className="text-xs mt-1">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t('image', lang)}
                  </label>
                  {canUploadImage ? (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer block">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      {formData.imageUrl ? (
                        <div className="space-y-2">
                          <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                          <p className="text-sm text-gray-600">
                            {lang === 'en' ? 'Click to change image' : 'படத்தை மாற்ற கிளிக் செய்க'}
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            {lang === 'en' ? 'Click to upload or drag and drop' : 'பதிவேற்ற கிளிக் செய்க'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG (Max 8MB)</p>
                        </>
                      )}
                    </label>
                  ) : (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <AlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm text-orange-800">
                        {lang === 'en' 
                          ? 'Image upload limit reached. Upgrade to Pro for more images.' 
                          : 'படம் பதிவேற்ற வரம்பு எட்டப்பட்டது. மேலும் படங்களுக்கு Pro க்கு மேம்படுத்தவும்.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* OPTIONAL DETAILS */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                {t('optionalDetails', lang)}
              </h3>

              <div className="space-y-6">
                {/* Ingredients */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {t('ingredients', lang)}
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={lang === 'en' ? 'e.g., Rice, Lentils, Spices' : 'உதாரணம்: அரிசி, பருப்பு, மசாலா'}
                      />
                      <button
                        type="button"
                        onClick={addIngredient}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('addIngredient', lang)}</span>
                      </button>
                    </div>
                    
                    {formData.ingredients && formData.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.ingredients.map((ingredient, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                            {ingredient}
                            <button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              className="hover:bg-blue-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Serving Info */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t('servingInfo', lang)}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">{t('servingSize', lang)}</label>
                      <input
                        type="text"
                        value={formData.servingSize || ''}
                        onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={lang === 'en' ? 'e.g., 1 plate, 250g' : 'உதாரணம்: 1 தட்டு, 250கி'}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">{t('numberOfServings', lang)}</label>
                      <input
                        type="number"
                        value={formData.servings || ''}
                        onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Nutrition Facts */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {t('nutritionFacts', lang)} <span className="text-xs text-gray-500">({t('perServing', lang)})</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { key: 'calories', label: 'calories', placeholder: '250' },
                      { key: 'protein', label: 'protein', placeholder: '8' },
                      { key: 'carbs', label: 'carbs', placeholder: '45' },
                      { key: 'fat', label: 'fat', placeholder: '12' },
                      { key: 'fiber', label: 'fiber', placeholder: '3' },
                      { key: 'sugar', label: 'sugar', placeholder: '5' }
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="text-xs text-gray-600 mb-1 block">{t(label, lang)}</label>
                        <input
                          type="number"
                          value={formData.nutritionFacts?.[key as keyof typeof formData.nutritionFacts] || ''}
                          onChange={(e) => updateNutrition(key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          placeholder={placeholder}
                          min="0"
                          step="0.1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergens */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {t('allergens', lang)}
                  </label>
                  <p className="text-xs text-gray-500 mb-3">{t('commonAllergens', lang)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'nuts', icon: '🥜' },
                      { key: 'dairy', icon: '🥛' },
                      { key: 'gluten', icon: '🌾' },
                      { key: 'soy', icon: '🫘' },
                      { key: 'eggs', icon: '🥚' },
                      { key: 'seafood', icon: '🦐' }
                    ].map(({ key, icon }) => (
                      <label key={key} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.allergens?.includes(key) || false}
                          onChange={() => toggleAllergen(key)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-lg">{icon}</span>
                        <span className="text-sm">{t(key, lang)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fun Fact */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t('funFact', lang)}
                  </label>
                  <textarea
                    value={formData.funFact || ''}
                    onChange={(e) => setFormData({ ...formData, funFact: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder={lang === 'en' ? 'Share an interesting fact or story about this dish...' : 'இந்த உணவு பற்றிய சுவாரசிய தகவல் அல்லது கதை...'}
                  />
                </div>
              </div>
            </section>
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