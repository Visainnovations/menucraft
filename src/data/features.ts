import { LucideIcon, QrCode, Globe, BarChart3, Zap, Shield, Smartphone } from 'lucide-react';

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: {
    from: string;
    to: string;
    iconBg: string;
    cardBg: string;
    textColor: string;
  };
}

export const features: Feature[] = [
  {
    id: 'qr-menus',
    icon: QrCode,
    title: 'Digital QR Menus',
    description: 'Beautiful, mobile-optimized menus that customers can access instantly by scanning a QR code. No app downloads required.',
    color: {
      from: 'from-orange-500',
      to: 'to-red-500',
      iconBg: 'from-orange-500 to-red-500',
      cardBg: 'from-orange-50 to-red-50',
      textColor: 'text-orange-600',
    }
  },
  {
    id: 'multi-language',
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Serve local and international customers with Tamil and English support. Switch languages with a single tap.',
    color: {
      from: 'from-blue-500',
      to: 'to-indigo-500',
      iconBg: 'from-blue-500 to-indigo-500',
      cardBg: 'from-blue-50 to-indigo-50',
      textColor: 'text-blue-600',
    }
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Track which dishes are popular, optimize your menu, and make data-driven decisions to increase revenue.',
    color: {
      from: 'from-purple-500',
      to: 'to-pink-500',
      iconBg: 'from-purple-500 to-pink-500',
      cardBg: 'from-purple-50 to-pink-50',
      textColor: 'text-purple-600',
    }
  },
  {
    id: 'instant-updates',
    icon: Zap,
    title: 'Instant Updates',
    description: 'Update prices, add new dishes, or remove items in seconds. No more expensive menu reprinting costs.',
    color: {
      from: 'from-yellow-500',
      to: 'to-orange-500',
      iconBg: 'from-yellow-500 to-orange-500',
      cardBg: 'from-yellow-50 to-orange-50',
      textColor: 'text-yellow-600',
    }
  },
  {
    id: 'secure',
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Bank-grade security with 99.9% uptime. Your menu data is safe and always accessible to customers.',
    color: {
      from: 'from-green-500',
      to: 'to-emerald-500',
      iconBg: 'from-green-500 to-emerald-500',
      cardBg: 'from-green-50 to-emerald-50',
      textColor: 'text-green-600',
    }
  },
  {
    id: 'mobile-first',
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Optimized for smartphones with lightning-fast loading. Works perfectly on any device, even with slow internet.',
    color: {
      from: 'from-cyan-500',
      to: 'to-blue-500',
      iconBg: 'from-cyan-500 to-blue-500',
      cardBg: 'from-cyan-50 to-blue-50',
      textColor: 'text-cyan-600',
    }
  },
];