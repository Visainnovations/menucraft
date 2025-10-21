import { DashboardData } from '@/types/dashboard.types';

const STORAGE_KEY = 'menucraft_dashboard_data';

// Default mock data
const getDefaultData = (): DashboardData => {
//   const userEmail = localStorage.getItem('userEmail') || 'owner@restaurant.com';
//   const userName = localStorage.getItem('userName') || 'Restaurant Owner';
  const restaurantName = localStorage.getItem('restaurantName') || 'Saravana Bhavan';

  return {
    restaurant: {
      id: '1',
      name: restaurantName,
      nameTamil: 'சரவணா பவன்',
      subscriptionStatus: 'trial',
      trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      planType: 'basic',
      imageUploadCount: 5,
      imageUploadLimit: 20,
      primaryColor: '#f97316',
      menuTemplate: 'template_1',
      timeSlots: [
        { id: '1', type: 'breakfast', start: '06:00', end: '11:00' },
        { id: '2', type: 'lunch', start: '11:00', end: '16:00' },
        { id: '3', type: 'snacks', start: '16:00', end: '19:00' },
        { id: '4', type: 'dinner', start: '19:00', end: '23:30' },
      ],
    },
    categories: [
      { id: '1', name: 'Tiffin Items', nameTamil: 'டிபன்', displayOrder: 1, availableTimes: ['breakfast', 'dinner'] },
      { id: '2', name: 'Rice Items', nameTamil: 'சாத வகைகள்', displayOrder: 2, availableTimes: ['lunch', 'dinner'] },
      { id: '3', name: 'Sweets', nameTamil: 'இனிப்புகள்', displayOrder: 3, availableTimes: ['lunch', 'dinner', 'snacks'] },
    ],
    items: [
      {
        id: '1',
        name: 'Masala Dosa',
        nameTamil: 'மசாலா தோசை',
        description: 'Crispy rice crepe filled with spiced potato',
        price: 80,
        categoryId: '1',
        isChefsSpecial: true,
        isVeg: true,
        spiceLevel: 2,
        availableTimes: ['breakfast', 'dinner'],
        viewCount: 245,
      },
      {
        id: '2',
        name: 'Idli (3 pcs)',
        nameTamil: 'இட்லி',
        description: 'Soft steamed rice cakes',
        price: 50,
        categoryId: '1',
        isTodaysSpecial: true,
        isVeg: true,
        availableTimes: ['breakfast'],
        viewCount: 189,
      },
      {
        id: '3',
        name: 'Sambar Rice',
        nameTamil: 'சாம்பார் சாதம்',
        description: 'Rice mixed with lentil curry',
        price: 100,
        categoryId: '2',
        isVeg: true,
        availableTimes: ['lunch', 'dinner'],
        viewCount: 156,
      },
    ],
  };
};

export const getRestaurantData = (): DashboardData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date string back to Date object
      if (parsed.restaurant.trialEndDate) {
        parsed.restaurant.trialEndDate = new Date(parsed.restaurant.trialEndDate);
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
  
  const defaultData = getDefaultData();
  saveRestaurantData(defaultData);
  return defaultData;
};

export const saveRestaurantData = (data: DashboardData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving dashboard data:', error);
  }
};

export const clearRestaurantData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};