export interface Restaurant {
  id: string;
  name: string;
  nameTamil: string;
  subscriptionStatus: 'trial' | 'expired' | 'active';
  trialEndDate: Date;
  planType: 'basic' | 'pro' | 'premium';
  imageUploadCount: number;
  imageUploadLimit: number;
  primaryColor?: string;
  menuTemplate?: string;
  timeSlots?: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  type: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  start: string;
  end: string;
}

export interface Category {
  id: string;
  name: string;
  nameTamil?: string;
  displayOrder: number;
  availableTimes: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameTamil?: string;
  description?: string;
  price: number;
  categoryId: string;
  isChefsSpecial?: boolean;
  isTodaysSpecial?: boolean;
  isSeasonal?: boolean;
  isVeg?: boolean;
  spiceLevel?: number;
  availableTimes: string[];
  viewCount: number;
  imageUrl?: string;
}

export interface DashboardData {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
}