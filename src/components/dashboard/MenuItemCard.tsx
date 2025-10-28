import { Edit2, Trash2, Image, Star, Flame, Leaf, Eye, Clock, Info as InfoIcon, Sparkles, GripVertical } from 'lucide-react';
import { MenuItem } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import React from 'react';

interface MenuItemCardProps {
  item: MenuItem;
  lang: 'en' | 'ta';
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  canAccess: boolean;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function MenuItemCard({ 
  item, 
  lang, 
  onEdit, 
  onDelete, 
  onView, 
  canAccess,
  isDragging = false,
  dragHandleProps
}: MenuItemCardProps) {
  const hasOptionalDetails = item.ingredients?.length || 
                              item.nutritionFacts?.calories || 
                              item.allergens?.length || 
                              item.servingSize || 
                              item.funFact || 
                              item.preparationTime;

  return (
    <div 
      className={`bg-white border border-gray-200 rounded-lg p-4 transition-all ${
        isDragging 
          ? 'shadow-2xl opacity-90 ring-2 ring-primary-500' 
          : 'hover:shadow-md'
      }`}
    >
      <div className="flex gap-4">
        {/* Drag Handle */}
        {canAccess && (
          <div 
            {...dragHandleProps}
            className="flex items-start cursor-grab active:cursor-grabbing pt-2"
            title={lang === 'en' ? 'Drag to reorder' : 'வரிசையை மாற்ற இழுக்கவும்'}
          >
            <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </div>
        )}

        {/* Image */}
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
              {item.preparationTime && (
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {item.preparationTime} {lang === 'en' ? 'mins' : 'நிமிடங்கள்'}
                </div>
              )}
            </div>
            
            <div className="flex gap-1 ml-2">
              <button
                onClick={onEdit}
                disabled={!canAccess}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title={t('edit', lang)}
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={onDelete}
                disabled={!canAccess}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title={t('delete', lang)}
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
            {item.isSeasonal && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">{t('seasonal', lang)}</span>
              </span>
            )}
            {item.isVeg && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                <span className="hidden sm:inline">{t('vegetarian', lang)}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Eye className="w-3 h-3" />
              {item.viewCount} {t('views', lang)}
            </div>
            
            {hasOptionalDetails && (
              <button
                onClick={onView}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                <InfoIcon className="w-3 h-3" />
                {lang === 'en' ? 'View Details' : 'விவரங்களை காண்க'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}