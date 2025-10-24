// src/utils/adminData.ts

import { AdminData, Restaurant, SystemSettings } from '@/types/admin.types';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Saravana Bhavan',
    ownerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@saravanabhavan.com',
    subscriptionStatus: 'trial',
    planType: 'basic',
    trialStartDate: '2024-10-01',
    trialEndDate: '2024-10-15',
    imageUploadCount: 8,
    imageUploadLimit: 20,
    totalCategories: 5,
    totalItems: 32,
    totalViews: 1247,
    createdAt: '2024-10-01',
  },
  {
    id: '2',
    name: 'Anjappar',
    ownerName: 'Murugan P',
    phone: '+91 98765 43211',
    email: 'murugan@anjappar.com',
    subscriptionStatus: 'active',
    planType: 'pro',
    subscriptionEndDate: '2025-01-15',
    imageUploadCount: 35,
    imageUploadLimit: 50,
    totalCategories: 8,
    totalItems: 67,
    totalViews: 3421,
    createdAt: '2024-09-15',
  },
  {
    id: '3',
    name: 'Adyar Ananda Bhavan',
    ownerName: 'Venkat S',
    phone: '+91 98765 43212',
    email: 'venkat@a2b.com',
    subscriptionStatus: 'expired',
    planType: 'basic',
    trialEndDate: '2024-09-30',
    imageUploadCount: 12,
    imageUploadLimit: 20,
    totalCategories: 4,
    totalItems: 28,
    totalViews: 892,
    createdAt: '2024-09-01',
  },
  {
    id: '4',
    name: 'Sangeetha Restaurant',
    ownerName: 'Lakshmi Devi',
    phone: '+91 98765 43213',
    email: 'lakshmi@sangeetha.com',
    subscriptionStatus: 'active',
    planType: 'premium',
    subscriptionEndDate: '2025-03-20',
    imageUploadCount: 78,
    imageUploadLimit: 100,
    totalCategories: 12,
    totalItems: 145,
    totalViews: 8934,
    createdAt: '2024-08-10',
  },
];

const mockSystemSettings: SystemSettings = {
  trialDurationDays: 14,
  basicPlanImageLimit: 20,
  proPlanImageLimit: 50,
  premiumPlanImageLimit: 100,
  totalRestaurants: 127,
  activeSubscriptions: 89,
  trialUsers: 24,
  expiredUsers: 14,
  totalRevenue: '₹2,34,500',
  monthlyRevenue: '₹45,600',
};

export const getAdminData = (): AdminData => {
  return {
    restaurants: mockRestaurants,
    systemSettings: mockSystemSettings,
  };
};