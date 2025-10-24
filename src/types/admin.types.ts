export interface Restaurant {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'suspended';
  planType: 'basic' | 'pro' | 'premium';
  trialStartDate?: string;
  trialEndDate?: string;
  subscriptionEndDate?: string;
  imageUploadCount: number;
  imageUploadLimit: number;
  totalCategories: number;
  totalItems: number;
  totalViews: number;
  createdAt: string;
}

export interface SystemSettings {
  trialDurationDays: number;
  basicPlanImageLimit: number;
  proPlanImageLimit: number;
  premiumPlanImageLimit: number;
  totalRestaurants: number;
  activeSubscriptions: number;
  trialUsers: number;
  expiredUsers: number;
  totalRevenue: string;
  monthlyRevenue: string;
}

export interface AdminData {
  restaurants: Restaurant[];
  systemSettings: SystemSettings;
}