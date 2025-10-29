// Restaurant Types
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

// Time Slot Types
export interface TimeSlot {
  id: string;
  type: 'breakfast' | 'lunch' | 'snacks' | 'dinner' | 'latenight' | 'earlymorning' | 'brunch' | 'allday';
  start: string;
  end: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  nameTamil?: string;
  displayOrder: number;
  availableTimes: string[];
}

// Nutrition Facts Types
export interface NutritionFacts {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  nameTamil?: string;
  description?: string;
  price: number;
  categoryId: string;
  displayOrder?: number;
  isChefsSpecial?: boolean;
  isTodaysSpecial?: boolean;
  isSeasonal?: boolean;
  isVeg?: boolean;
  spiceLevel?: number;
  availableTimes: string[];
  viewCount: number;
  imageUrl?: string;
  // Optional detailed information
  ingredients?: string[];
  nutritionFacts?: NutritionFacts;
  allergens?: string[];
  servingSize?: string;
  servings?: number;
  funFact?: string;
  preparationTime?: number;
}

// Dashboard Data Type
export interface DashboardData {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
}