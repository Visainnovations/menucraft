import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomerCategory, Language, TimeSlot } from '@/types/customer.types';

interface FoodCategoryCarouselProps {
  categories: CustomerCategory[];
  selectedTimeFilter: TimeSlot;
  lang: Language;
  isDark: boolean;
  primaryColor: string;
  onCategoryClick: (categoryId: string) => void;
  activeCategoryId?: string;
}

export default function FoodCategoryCarousel({
  categories,
  selectedTimeFilter,
  lang,
  isDark,
  primaryColor,
  onCategoryClick,
  activeCategoryId,
}: FoodCategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const availableCategories = categories.filter((cat) =>
    cat.availableTimes.includes(selectedTimeFilter)
  );

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [availableCategories]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (availableCategories.length === 0) return null;

  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <div className="relative mb-4">
      {/* Left Navigation Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:scale-110 transition-transform"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: primaryColor }} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {availableCategories.map((category) => {
          const isActive = activeCategoryId === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`flex-shrink-0 ${cardBg} rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group`}
              style={
                isActive
                  ? { 
                      border: `2px solid ${primaryColor}`,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                    }
                  : undefined
              }
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden">
                <img
                  src={category.defaultImage}
                  alt={lang === 'en' ? category.name : category.nameTamil}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs sm:text-sm font-bold text-center drop-shadow-lg leading-tight">
                  {lang === 'en' ? category.name : category.nameTamil}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Navigation Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:scale-110 transition-transform"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" style={{ color: primaryColor }} />
        </button>
      )}

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}