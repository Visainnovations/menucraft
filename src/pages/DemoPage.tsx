import { Link } from 'react-router-dom';
import { Menu, ArrowLeft } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            MenuCraft
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Interactive Demo
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
            See MenuCraft in action
          </p>

          {/* Coming Soon Message */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 sm:p-6 text-center">
            <p className="text-sm sm:text-base text-primary-700 font-semibold mb-2">
              🚧 Coming Soon
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              We're building an amazing interactive demo to showcase all the features.
              Stay tuned!
            </p>
          </div>

          {/* Back Link */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-4 sm:mt-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}