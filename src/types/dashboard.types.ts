// Social Media Links (NEW)
export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  whatsapp?: string;
  website?: string;
}

// Restaurant Types (UPDATED)
export interface Restaurant {
  id: string;
  name: string;
  nameTamil: string;
  // Contact Information
  phone?: string;
  email?: string;
  address?: string;
  addressTamil?: string;
  socialMedia?: SocialMediaLinks; // NEW
  // Subscription Details
  subscriptionStatus: 'trial' | 'expired' | 'active';
  trialEndDate: Date;
  planType: 'basic' | 'pro' | 'premium';
  // Images
  imageUploadCount: number;
  imageUploadLimit: number;
  bannerImage?: string;
  logoImage?: string;
  // Branding
  primaryColor?: string;
  menuTemplate?: string;
  // Operating Hours
  timeSlots?: TimeSlot[];
  // Announcements
  announcements?: Announcement[];
  appearance?: AppearanceSettings;
}

// Announcement Type
export interface Announcement {
  id: string;
  title: string;
  titleTamil?: string;
  description: string;
  descriptionTamil?: string;
  imageUrl?: string;
  link?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
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

// ========================================
// APPEARANCE & THEMING TYPES
// ========================================

// Color Palette
export interface ColorPalette {
  primary: string;        // Main brand color (#f97316)
  secondary: string;      // Accent color (#ef4444)
  background: string;     // Menu background (#ffffff)
  text: string;           // Body text (#1f2937)
  heading: string;        // Titles (#111827)
  border: string;         // Dividers (#e5e7eb)
  highlight: string;      // Special items (#fbbf24)
  success: string;        // Veg indicator (#10b981)
  warning: string;        // Spicy indicator (#f59e0b)
  danger: string;         // Non-veg indicator (#ef4444)
}

// Typography Settings
export interface Typography {
  fontFamily: string;     // Body font
  headingFont: string;    // Heading font
  fontSize: number;       // Base size (14-18px)
  headingWeight: number;  // 600, 700, 800
  bodyWeight: number;     // 400, 500
}

// Layout Options
export interface LayoutOptions {
  cardStyle: 'rounded' | 'square' | 'elevated';
  spacing: 'compact' | 'comfortable' | 'spacious';
  imageSize: 'small' | 'medium' | 'large';
  imagePosition: 'left' | 'top';
  gridColumns: 1 | 2 | 3;
}

// Visibility Settings
export interface VisibilitySettings {
  showPrices: boolean;
  showImages: boolean;
  showDescriptions: boolean;
  showBadges: boolean;
  showSpiceLevel: boolean;
  showPrepTime: boolean;
}

// Complete Appearance Settings
export interface AppearanceSettings {
  templateId: string;
  colors: ColorPalette;
  typography: Typography;
  layout: LayoutOptions;
  visibility: VisibilitySettings;
}

// Theme Preset
export interface ThemePreset {
  id: string;
  name: string;
  nameTamil: string;
  colors: ColorPalette;
  thumbnail?: string;
}

// Default Appearance Settings
export const DEFAULT_APPEARANCE: AppearanceSettings = {
  templateId: 'template_1',
  colors: {
    primary: '#f97316',
    secondary: '#ef4444',
    background: '#ffffff',
    text: '#1f2937',
    heading: '#111827',
    border: '#e5e7eb',
    highlight: '#fbbf24',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  typography: {
    fontFamily: 'Inter',
    headingFont: 'Inter',
    fontSize: 16,
    headingWeight: 700,
    bodyWeight: 400,
  },
  layout: {
    cardStyle: 'rounded',
    spacing: 'comfortable',
    imageSize: 'medium',
    imagePosition: 'left',
    gridColumns: 2,
  },
  visibility: {
    showPrices: true,
    showImages: true,
    showDescriptions: true,
    showBadges: true,
    showSpiceLevel: true,
    showPrepTime: true,
  },
};