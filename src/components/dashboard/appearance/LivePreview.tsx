import { Star, Flame, Leaf, Clock } from 'lucide-react';
import { AppearanceSettings, MenuItem } from '@/types/dashboard.types';

interface LivePreviewProps {
  appearance: AppearanceSettings;
  lang: 'en' | 'ta';
}

export default function LivePreview({ appearance, lang }: LivePreviewProps) {
  const { colors, typography, layout, visibility } = appearance;

  // Sample menu items for preview
  const sampleItems: MenuItem[] = [
    {
      id: '1',
      name: 'Masala Dosa',
      nameTamil: 'மசாலா தோசை',
      description: 'Crispy rice crepe filled with spiced potato filling',
      price: 80,
      categoryId: '1',
      availableTimes: ['breakfast', 'dinner'],
      viewCount: 245,
      isChefsSpecial: true,
      isVeg: true,
      spiceLevel: 1,
      preparationTime: 15,
      imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400',
    },
    {
      id: '2',
      name: 'Butter Chicken',
      nameTamil: 'பட்டர் சிக்கன்',
      description: 'Tender chicken in rich tomato cream sauce',
      price: 280,
      categoryId: '2',
      availableTimes: ['lunch', 'dinner'],
      viewCount: 532,
      isTodaysSpecial: true,
      isVeg: false,
      spiceLevel: 2,
      preparationTime: 25,
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    },
  ];

  const getCardStyle = () => {
    const base = 'border transition-all';
    switch (layout.cardStyle) {
      case 'rounded': return `${base} rounded-lg`;
      case 'square': return `${base} rounded-none`;
      case 'elevated': return `${base} rounded-xl shadow-lg`;
      default: return `${base} rounded-lg`;
    }
  };

  const getSpacing = () => {
    switch (layout.spacing) {
      case 'compact': return 'p-3';
      case 'comfortable': return 'p-4';
      case 'spacious': return 'p-6';
      default: return 'p-4';
    }
  };

  const getImageSize = () => {
    switch (layout.imageSize) {
      case 'small': return 'w-16 h-16';
      case 'medium': return 'w-24 h-24';
      case 'large': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };

  const getGridCols = () => {
    switch (layout.gridColumns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  return (
    <div 
      className="h-full border-2 border-dashed rounded-lg p-4 overflow-auto"
      style={{ 
        backgroundColor: colors.background,
        borderColor: colors.border,
      }}
    >
      {/* Preview Header */}
      <div className="mb-6 text-center">
        <h2 
          className="text-2xl font-bold mb-2"
          style={{ 
            color: colors.heading,
            fontFamily: typography.headingFont,
            fontWeight: typography.headingWeight,
          }}
        >
          {lang === 'en' ? 'Menu Preview' : 'மெனு முன்னோட்டம்'}
        </h2>
        <p 
          className="text-sm"
          style={{ 
            color: colors.text,
            fontFamily: typography.fontFamily,
            fontWeight: typography.bodyWeight,
          }}
        >
          {lang === 'en' ? 'Live preview of your menu design' : 'உங்கள் மெனு வடிவமைப்பின் நேரடி முன்னோட்டம்'}
        </p>
      </div>

      {/* Menu Items Grid */}
      <div className={`grid ${getGridCols()} gap-4`}>
        {sampleItems.map((item) => (
          <div
            key={item.id}
            className={`${getCardStyle()} ${getSpacing()}`}
            style={{ 
              borderColor: colors.border,
              backgroundColor: colors.background,
            }}
          >
            <div className={`flex gap-4 ${layout.imagePosition === 'top' ? 'flex-col' : ''}`}>
              {/* Image */}
              {visibility.showImages && item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className={`${getImageSize()} object-cover rounded flex-shrink-0 ${
                    layout.imagePosition === 'top' ? 'w-full h-48' : ''
                  }`}
                />
              )}

              <div className="flex-1 min-w-0">
                {/* Item Name */}
                <h3 
                  className="font-semibold truncate mb-1"
                  style={{ 
                    color: colors.heading,
                    fontFamily: typography.headingFont,
                    fontSize: `${typography.fontSize + 2}px`,
                  }}
                >
                  {lang === 'en' ? item.name : (item.nameTamil || item.name)}
                </h3>

                {/* Description */}
                {visibility.showDescriptions && item.description && (
                  <p 
                    className="text-sm mb-2 line-clamp-2"
                    style={{ 
                      color: colors.text,
                      fontFamily: typography.fontFamily,
                      fontSize: `${typography.fontSize - 2}px`,
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {/* Price */}
                {visibility.showPrices && (
                  <p 
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.primary }}
                  >
                    ₹{item.price}
                  </p>
                )}

                {/* Prep Time */}
                {visibility.showPrepTime && item.preparationTime && (
                  <div className="flex items-center gap-1 mb-2 text-xs" style={{ color: colors.text }}>
                    <Clock className="w-3 h-3" />
                    <span>{item.preparationTime} {lang === 'en' ? 'mins' : 'நிமிடங்கள்'}</span>
                  </div>
                )}

                {/* Badges */}
                {visibility.showBadges && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.isChefsSpecial && (
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded flex items-center gap-1"
                        style={{ 
                          backgroundColor: `${colors.highlight}20`,
                          color: colors.heading,
                        }}
                      >
                        <Star className="w-3 h-3" />
                        {lang === 'en' ? "Chef's" : 'சமையல்'}
                      </span>
                    )}
                    {item.isTodaysSpecial && (
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded flex items-center gap-1"
                        style={{ 
                          backgroundColor: `${colors.danger}20`,
                          color: colors.danger,
                        }}
                      >
                        <Flame className="w-3 h-3" />
                        {lang === 'en' ? 'Special' : 'சிறப்பு'}
                      </span>
                    )}
                    {item.isVeg && (
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded flex items-center gap-1"
                        style={{ 
                          backgroundColor: `${colors.success}20`,
                          color: colors.success,
                        }}
                      >
                        <Leaf className="w-3 h-3" />
                        {lang === 'en' ? 'Veg' : 'சைவம்'}
                      </span>
                    )}
                  </div>
                )}

                {/* Spice Level */}
                {visibility.showSpiceLevel && item.spiceLevel && item.spiceLevel > 0 && (
                  <div className="text-xs" style={{ color: colors.warning }}>
                    {'🌶️'.repeat(item.spiceLevel)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Note */}
      <div 
        className="mt-6 p-3 rounded-lg text-center text-xs"
        style={{ 
          backgroundColor: `${colors.primary}10`,
          color: colors.text,
        }}
      >
        {lang === 'en' 
          ? 'This is a preview. Your actual menu will show all items.' 
          : 'இது ஒரு முன்னோட்டம். உங்கள் உண்மையான மெனு அனைத்து உணவுகளையும் காட்டும்.'}
      </div>
    </div>
  );
}