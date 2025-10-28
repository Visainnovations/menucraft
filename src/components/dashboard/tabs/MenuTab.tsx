import { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronRight, Edit2, Trash2, FolderEdit } from 'lucide-react';
import { Restaurant, Category, MenuItem } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';
import ItemFormModal from '@components/dashboard/ItemFormModal';
import ItemDetailsModal from '@components/dashboard/ItemDetailsModal';
import CategoryFormModal from '@components/dashboard/CategoryFormModal';
import MenuItemCard from '@components/dashboard/MenuItemCard';

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
  onUpdateCategories,
  onUpdateItems,
  canAccess, 
  lang 
}: MenuTabProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showItemModal, setShowItemModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingItem, setViewingItem] = useState<MenuItem | null>(null);
  const [draggedItem, setDraggedItem] = useState<MenuItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const getCategoryItems = (categoryId: string) => {
    return items
      .filter(item => item.categoryId === categoryId)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const filteredCategories = categories
    .filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.nameTamil?.includes(searchTerm)
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Category Handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      onUpdateCategories(categories.map(c => c.id === category.id ? category : c));
    } else {
      onUpdateCategories([...categories, category]);
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const categoryItems = getCategoryItems(categoryId);
    
    if (categoryItems.length > 0) {
      alert(
        lang === 'en' 
          ? `Cannot delete category. It contains ${categoryItems.length} item(s). Please move or delete items first.`
          : `வகையை நீக்க முடியாது. இதில் ${categoryItems.length} உணவுகள் உள்ளன. முதலில் உணவுகளை நகர்த்தவும் அல்லது நீக்கவும்.`
      );
      return;
    }

    if (confirm(lang === 'en' ? 'Delete this category?' : 'இந்த வகையை நீக்கவா?')) {
      onUpdateCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  // Item Handlers
  const handleAddItem = () => {
    setEditingItem(null);
    setShowItemModal(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setViewingItem(null);
    setEditingItem(item);
    setShowItemModal(true);
  };

  const handleSaveItem = (item: MenuItem) => {
    if (editingItem) {
      onUpdateItems(items.map(i => i.id === item.id ? item : i));
    } else {
      // Auto-assign display order for new items
      const categoryItems = getCategoryItems(item.categoryId);
      const maxOrder = categoryItems.reduce((max, i) => Math.max(max, i.displayOrder || 0), 0);
      item.displayOrder = maxOrder + 1;
      onUpdateItems([...items, item]);

      console.log("Display Order: " + item.displayOrder);
    }
    setShowItemModal(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm(lang === 'en' ? 'Delete this item?' : 'இந்த உணவை நீக்கவா?')) {
      onUpdateItems(items.filter(item => item.id !== itemId));
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (item: MenuItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetItem: MenuItem, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    // Only allow reordering within the same category
    if (draggedItem.categoryId !== targetItem.categoryId) {
      alert(
        lang === 'en'
          ? 'Cannot move items between categories. Please edit the item to change its category.'
          : 'வகைகளுக்கு இடையில் உணவுகளை நகர்த்த முடியாது. வகையை மாற்ற உணவைத் திருத்தவும்.'
      );
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const categoryItems = getCategoryItems(draggedItem.categoryId);
    const draggedIndex = categoryItems.findIndex(item => item.id === draggedItem.id);

    if (draggedIndex === targetIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    // Reorder items
    const reorderedItems = [...categoryItems];
    reorderedItems.splice(draggedIndex, 1);
    reorderedItems.splice(targetIndex, 0, draggedItem);

    // Update display orders
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      displayOrder: index + 1
    }));

    // Update all items in the state
    const otherItems = items.filter(item => item.categoryId !== draggedItem.categoryId);
    onUpdateItems([...otherItems, ...updatedItems]);

    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
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
            onClick={handleAddCategory}
            disabled={!canAccess}
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

      {/* Reorder Hint */}
      {canAccess && filteredCategories.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="flex-shrink-0 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-blue-900">
            {lang === 'en' 
              ? 'Drag items using the ⋮⋮ handle to reorder them within a category.'
              : 'ஒரு வகையில் உணவுகளை மறுவரிசைப்படுத்த ⋮⋮ ஐப் பயன்படுத்தி இழுக்கவும்.'}
          </p>
        </div>
      )}

      {/* Empty State */}
      {filteredCategories.length === 0 && categories.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FolderEdit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {lang === 'en' ? 'No Categories Yet' : 'இன்னும் வகைகள் இல்லை'}
          </h3>
          <p className="text-gray-600 mb-4">
            {lang === 'en' 
              ? 'Start by creating your first category to organize your menu items.'
              : 'உங்கள் மெனு உணவுகளை ஒழுங்கமைக்க முதல் வகையை உருவாக்கவும்.'}
          </p>
          <Button onClick={handleAddCategory} disabled={!canAccess}>
            <Plus className="w-5 h-5" />
            {t('addCategory', lang)}
          </Button>
        </div>
      )}

      {/* Categories with Items */}
      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const categoryItems = getCategoryItems(category.id);
          const isExpanded = expandedCategory === category.id;
          
          return (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="w-full bg-gray-50 hover:bg-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between transition-colors">
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  {isExpanded ? <ChevronDown className="w-5 h-5 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {lang === 'en' ? category.name : (category.nameTamil || category.name)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {categoryItems.length} {lang === 'en' ? 'items' : 'உணவுகள்'}
                    </p>
                  </div>
                </button>
                
                <div className="flex items-center gap-3 ml-4">
                  <div className="hidden sm:flex flex-wrap gap-2">
                    {category.availableTimes.map(time => (
                      <span key={time} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {t(time, lang)}
                      </span>
                    ))}
                  </div>
                  
                  {canAccess && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title={t('edit', lang)}
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title={t('delete', lang)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="bg-white p-4 sm:p-6 border-t border-gray-200">
                  {categoryItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="mb-3">{t('noItemsInCategory', lang)}</p>
                      {canAccess && (
                        <Button onClick={handleAddItem} size="sm">
                          <Plus className="w-4 h-4" />
                          {t('addItem', lang)}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {categoryItems.map((item, index) => (
                        <div
                          key={item.id}
                          draggable={canAccess}
                          onDragStart={() => handleDragStart(item)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          onDrop={(e) => handleDrop(e, item, index)}
                          className={`transition-all ${
                            dragOverIndex === index && draggedItem?.id !== item.id
                              ? 'border-t-2 border-primary-500 pt-2'
                              : ''
                          }`}
                        >
                          <MenuItemCard
                            item={item}
                            lang={lang}
                            onEdit={() => handleEditItem(item)}
                            onDelete={() => handleDeleteItem(item.id)}
                            onView={() => setViewingItem(item)}
                            canAccess={canAccess}
                            isDragging={draggedItem?.id === item.id}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Category Form Modal */}
      {showCategoryModal && (
        <CategoryFormModal
          category={editingCategory}
          categories={categories}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          lang={lang}
        />
      )}

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

      {/* Item Details Modal */}
      {viewingItem && (
        <ItemDetailsModal
          item={viewingItem}
          lang={lang}
          onClose={() => setViewingItem(null)}
          onEdit={() => handleEditItem(viewingItem)}
          canAccess={canAccess}
        />
      )}
    </div>
  );
}