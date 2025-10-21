import { Link } from 'react-router-dom';
import { Menu, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Menu className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MenuCraft</span>
            </div>
            <p className="text-sm leading-relaxed">
              Digital menu solution for modern restaurants in Chennai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-sm hover:text-primary-400 transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link to="#pricing" className="text-sm hover:text-primary-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-primary-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm break-all">support@menucraft.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span className="text-sm">Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs sm:text-sm">
            © {currentYear} MenuCraft. All rights reserved. Built with ❤️ in Chennai.
          </p>
        </div>
      </div>
    </footer>
  );
}