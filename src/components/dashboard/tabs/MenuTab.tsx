import { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronRight, Edit2, Trash2, Image, Star, Flame, Leaf, Eye } from 'lucide-react';
import { Restaurant, Category, MenuItem } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';
import ItemFormModal from '@components/dashboard/ItemFormModal';

interface MenuTabProps {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateItems: (items: MenuItem[]) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function MenuTab({ 
  restaurant,
  categories, 
  items, 
  onUpdateItems,
  canAccess, 
  lang 
}: MenuTabProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const getCategoryItems = (categoryId: string) => {
    return items.filter(item => item.categoryId === categoryId);
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.nameTamil?.includes(searchTerm)
  );

  const handleAddItem = () => {
    setEditingItem(null);
    setShowItemModal(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowItemModal(true);
  };

  const handleSaveItem = (item: MenuItem) => {
    if (editingItem) {
      // Update existing item
      onUpdateItems(items.map(i => i.id === item.id ? item : i));
    } else {
      // Add new item
      onUpdateItems([...items, item]);
    }
    setShowItemModal(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm(lang === 'en' ? 'Delete this item?' : 'இந்த உணவை நீக்கவா?')) {
      onUpdateItems(items.filter(item => item.id !== itemId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchCategories', lang)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => alert('Add category feature coming soon!')} 
            variant="secondary"
            size="sm"
          >
            <Plus className="w-5 h-5" />
            {t('addCategory', lang)}
          </Button>
          <Button 
            onClick={handleAddItem} 
            disabled={!canAccess}
            size="sm"
          >
            <Plus className="w-5 h-5" />
            {t('addItem', lang)}
          </Button>
        </div>
      </div>

      {/* Categories with Items */}
      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const categoryItems = getCategoryItems(category.id);
          const isExpanded = expandedCategory === category.id;
          
          return (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                className="w-full bg-gray-50 hover:bg-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">
                      {lang === 'en' ? category.name : (category.nameTamil || category.name)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {categoryItems.length} {lang === 'en' ? 'items' : 'உணவுகள்'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.availableTimes.map(time => (
                    <span key={time} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {t(time, lang)}
                    </span>
                  ))}
                </div>
              </button>
              
              {isExpanded && (
                <div className="bg-white p-4 sm:p-6 border-t border-gray-200">
                  {categoryItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {t('noItemsInCategory', lang)}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryItems.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          lang={lang}
                          onEdit={() => handleEditItem(item)}
                          onDelete={() => handleDeleteItem(item.id)}
                          canAccess={canAccess}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Item Form Modal */}
      {showItemModal && (
        <ItemFormModal
          item={editingItem}
          categories={categories}
          restaurant={restaurant}
          onClose={() => {
            setShowItemModal(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          lang={lang}
        />
      )}
    </div>
  );
}

// Menu Item Card Component
interface MenuItemCardProps {
  item: MenuItem;
  lang: 'en' | 'ta';
  onEdit: () => void;
  onDelete: () => void;
  canAccess: boolean;
}

function MenuItemCard({ item, lang, onEdit, onDelete, canAccess }: MenuItemCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Image Placeholder */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Image className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {lang === 'en' ? item.name : (item.nameTamil || item.name)}
              </h4>
              <p className="text-lg font-bold text-primary-600 mt-1">₹{item.price}</p>
            </div>
            
            <div className="flex gap-1 ml-2">
              <button
                onClick={onEdit}
                disabled={!canAccess}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={onDelete}
                disabled={!canAccess}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
            {item.isChefsSpecial && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span className="hidden sm:inline">{t('chefsSpecial', lang)}</span>
              </span>
            )}
            {item.isTodaysSpecial && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span className="hidden sm:inline">{t('todaysSpecial', lang)}</span>
              </span>
            )}
            {item.isVeg && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                <span className="hidden sm:inline">{t('vegetarian', lang)}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            {item.viewCount} {t('views', lang)}
          </div>
        </div>
      </div>
    </div>
  );
}