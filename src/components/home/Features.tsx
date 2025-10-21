import { ArrowRight } from 'lucide-react';
import { features } from '@data/features';
import { cn } from '@utils/cn';

export default function Features() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Everything you need to go digital
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            Powerful features to help your restaurant succeed
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={cn(
                  'group relative bg-gradient-to-br rounded-2xl p-6 sm:p-8',
                  'hover:shadow-2xl transition-all duration-300 border',
                  feature.color.cardBg,
                  'border-opacity-20'
                )}
              >
                {/* Hover Effect Overlay */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br rounded-2xl',
                    'opacity-0 group-hover:opacity-5 transition-opacity',
                    feature.color.iconBg
                  )}
                ></div>

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br rounded-xl',
                      'flex items-center justify-center mb-4 sm:mb-6',
                      'group-hover:scale-110 transition-transform',
                      feature.color.iconBg
                    )}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div
                    className={cn(
                      'mt-4 sm:mt-6 flex items-center font-semibold text-sm sm:text-base',
                      'group-hover:gap-2 transition-all',
                      feature.color.textColor
                    )}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}