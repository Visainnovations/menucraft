export interface CustomerRestaurant {
  id: string;
  name: string;
  nameTamil: string;
  primaryColor: string;
  phone: string;
  address: string;
  addressTamil: string;
  bannerImage?: string;
  timings: {
    morning: { start: string; end: string };
    evening: { start: string; end: string };
  };
}

export interface CustomerCategory {
  id: string;
  name: string;
  nameTamil: string;
  availableTimes: string[];
  defaultImage: string;
}

export interface NutritionInfo {
  protein: string;
  carbs: string;
  fat: string;
  calories: string;
  fiber?: string;
}

export interface CustomerMenuItem {
  id: string;
  name: string;
  nameTamil: string;
  description: string;
  descriptionTamil: string;
  price: number;
  categoryId: string;
  imageUrl: string | null;
  isChefsSpecial: boolean;
  isTodaysSpecial: boolean;
  isSeasonal: boolean;
  isVeg: boolean;
  spiceLevel: number;
  availableTimes: string[];
  ingredients: string[];
  ingredientsTamil: string[];
  nutrition: NutritionInfo;
  preparationTime?: string;
  servingSize?: string;
}

export interface Advertisement {
  id: string;
  title: string;
  titleTamil: string;
  subtitle: string;
  subtitleTamil: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface CustomerMenuData {
  restaurant: CustomerRestaurant;
  categories: CustomerCategory[];
  items: CustomerMenuItem[];
  advertisements: Advertisement[];
}

export type TimeSlot = 'morning' | 'evening' | 'closed';
export type VegFilter = 'all' | 'veg' | 'nonveg';
export type Language = 'en' | 'ta';