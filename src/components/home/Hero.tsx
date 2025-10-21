import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@components/ui/Button';
import Badge from '@components/ui/Badge';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge icon={<Sparkles className="w-4 h-4" />}>
              Zero Cost Digital Menu Solution
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight px-4">
            Digital Menu Solution
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              for Modern Restaurants
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
            Transform your restaurant with beautiful QR code menus.
            Update instantly, track performance, delight customers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 px-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-xs sm:text-sm text-gray-500 px-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blobs - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="hidden md:block absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="hidden md:block absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
    </section>
  );
}