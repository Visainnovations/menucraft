import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@components/ui/Button';

export default function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
          Ready to go digital?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
          Start your 14-day free trial today. No credit card required.
        </p>
        <Link to="/register">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:shadow-2xl w-full sm:w-auto"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}