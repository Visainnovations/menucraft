import { Star } from 'lucide-react';
import { testimonials } from '@data/testimonials';
import Card from '@components/ui/Card';

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Trusted by restaurants across Chennai
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Join 100+ restaurants already using MenuCraft
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col h-full p-6 sm:p-8">
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed flex-grow">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {testimonial.restaurant}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}