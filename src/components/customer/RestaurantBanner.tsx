import { CustomerRestaurant, Language } from '@/types/customer.types';

interface RestaurantBannerProps {
  restaurant: CustomerRestaurant;
  lang: Language;
  isDark: boolean;
}

export default function RestaurantBanner({
  restaurant,
  lang,
  isDark,
}: RestaurantBannerProps) {
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';

  // Check if restaurant has banner image
  if (!restaurant.bannerImage) return null;

  return (
    <>
      <style>{`
        /* Responsive banner sizing with media queries */
        .restaurant-banner-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          height: auto;
          max-height: none;
          overflow: hidden;
        }

        .restaurant-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Small tablets (640px+) */
        @media (min-width: 640px) {
          .restaurant-banner-container {
            aspect-ratio: 18 / 7;
          }
        }

        /* Medium screens (768px+) */
        @media (min-width: 768px) {
          .restaurant-banner-container {
            aspect-ratio: 20 / 7;
          }
        }

        /* Desktop / laptop (1024px+) */
        @media (min-width: 1024px) {
          .restaurant-banner-container {
            aspect-ratio: 24 / 7;
          }
        }

        /* Large desktop (1280px+) */
        @media (min-width: 1280px) {
          .restaurant-banner-container {
            aspect-ratio: 28 / 7;
          }
        }
      `}</style>

      <div className={`relative ${cardBg} rounded-2xl overflow-hidden shadow-lg mb-4`}>
        <div className="restaurant-banner-container">
          {/* Restaurant Banner Image */}
          <img
            src={restaurant.bannerImage}
            alt={lang === 'en' ? restaurant.name : restaurant.nameTamil}
            className="restaurant-banner-img"
            loading="lazy"
          />
          
          {/* Optional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Optional Restaurant Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-3">
            <h2 
              className="text-lg sm:text-xl md:text-lg lg:text-xl font-bold drop-shadow-lg text-white"
            >
              {lang === 'en' ? restaurant.name : restaurant.nameTamil}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}