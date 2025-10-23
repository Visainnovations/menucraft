import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Advertisement, Language } from '@/types/customer.types';

interface AdvertisementCarouselProps {
  advertisements: Advertisement[];
  lang: Language;
  isDark: boolean;
  primaryColor: string;
}

export default function AdvertisementCarousel({
  advertisements,
  lang,
  isDark,
  primaryColor,
}: AdvertisementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlaying || advertisements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % advertisements.length;
        return next;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, advertisements.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev === 0 ? advertisements.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (advertisements.length === 0) return null;

  const currentAd = advertisements[currentIndex];
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <>
      <style>{`
        /* Responsive banner sizing with media queries */
        .advertisement-banner-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          height: auto;
          max-height: none;
          overflow: hidden;
        }

        .advertisement-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Small tablets (640px+) */
        @media (min-width: 640px) {
          .advertisement-banner-container {
            aspect-ratio: 18 / 7;
          }
        }

        /* Medium screens (768px+) */
        @media (min-width: 768px) {
          .advertisement-banner-container {
            aspect-ratio: 20 / 7;
          }
        }

        /* Desktop / laptop (1024px+) */
        @media (min-width: 1024px) {
          .advertisement-banner-container {
            aspect-ratio: 24 / 7;
          }
        }

        /* Large desktop (1280px+) */
        @media (min-width: 1280px) {
          .advertisement-banner-container {
            aspect-ratio: 28 / 7;
          }
        }
      `}</style>

      <div className={`relative ${cardBg} rounded-2xl overflow-hidden shadow-lg mb-4`}>
        <div 
          className="advertisement-banner-container"
          style={{ backgroundColor: currentAd.backgroundColor }}
        >
          {/* Image */}
          <img
            key={currentIndex}
            src={currentAd.image}
            alt={lang === 'en' ? currentAd.title : currentAd.titleTamil}
            className="advertisement-banner-img transition-opacity duration-500"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-3">
            <h3 
              className="text-sm sm:text-base md:text-sm lg:text-base font-bold mb-0.5 drop-shadow-lg transition-all duration-500"
              style={{ color: currentAd.textColor }}
            >
              {lang === 'en' ? currentAd.title : currentAd.titleTamil}
            </h3>
            <p 
              className="text-xs sm:text-sm md:text-xs drop-shadow-md line-clamp-1 transition-all duration-500"
              style={{ color: currentAd.textColor, opacity: 0.9 }}
            >
              {lang === 'en' ? currentAd.subtitle : currentAd.subtitleTamil}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        {advertisements.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all backdrop-blur-sm z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all backdrop-blur-sm z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {advertisements.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {advertisements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6'
                    : 'w-1.5 bg-white/50 hover:bg-white/75'
                }`}
                style={
                  index === currentIndex
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}