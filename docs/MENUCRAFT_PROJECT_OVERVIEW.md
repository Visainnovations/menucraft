# 🍽️ MenuCraft - Complete Project Documentation

## 📋 Project Overview
**Name:** MenuCraft  
**Type:** SaaS Web Application  
**Tech Stack:** React + TypeScript + Vite + Tailwind CSS v3  
**Purpose:** Digital menu management system for restaurants in Chennai  
**Features:** QR code menus, multi-language support (English/Tamil), analytics, menu management

---

## 🗂️ Project Structure

```
menucraft/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/                          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   │
│   │   ├── layout/                      # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── home/                        # Home page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   │
│   │   └── dashboard/                   # Dashboard components
│   │       ├── DashboardLayout.tsx
│   │       ├── DashboardHeader.tsx
│   │       ├── SubscriptionBanner.tsx
│   │       ├── StatsCards.tsx
│   │       ├── TabNavigation.tsx
│   │       ├── ItemFormModal.tsx
│   │       └── tabs/
│   │           ├── MenuTab.tsx
│   │           ├── TimeSlotsTab.tsx
│   │           ├── QRCodeTab.tsx
│   │           ├── AnalyticsTab.tsx
│   │           └── SettingsTab.tsx
│   │
│   ├── pages/                           # Route pages
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DemoPage.tsx
│   │   └── DashboardPage.tsx
│   │
│   ├── hooks/                           # Custom React hooks
│   │   └── (empty for now)
│   │
│   ├── utils/                           # Utility functions
│   │   ├── cn.ts                        # Classname utility
│   │   ├── constants.ts
│   │   ├── translations.ts              # i18n translations
│   │   └── dashboardStorage.ts          # localStorage management
│   │
│   ├── types/                           # TypeScript types
│   │   ├── index.ts
│   │   └── dashboard.types.ts
│   │
│   ├── data/                            # Static/mock data
│   │   ├── features.ts
│   │   └── testimonials.ts
│   │
│   ├── styles/                          # Global styles
│   │   └── index.css
│   │
│   ├── App.tsx                          # Main app with routes
│   ├── main.tsx                         # Entry point
│   └── vite-env.d.ts
│
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🎨 Design System

### Colors (Tailwind Config)
```javascript
primary: {
  50: '#fff7ed',
  500: '#f97316',  // Main orange
  600: '#ea580c',
}
secondary: {
  50: '#fef2f2',
  500: '#ef4444',  // Main red
  600: '#dc2626',
}
```

### Key Components
- **Button:** 3 variants (primary, secondary, outline), 3 sizes (sm, md, lg)
- **Card:** Reusable card with hover effects
- **Badge:** Tags for special items

---

## 🔐 Authentication Flow

### Demo Credentials
```typescript
Admin:
  email: 'admin@menucraft.com'
  password: 'admin123'
  redirects to: /admin/dashboard

Owner:
  email: 'owner@restaurant.com'
  password: 'owner123'
  redirects to: /dashboard
```

### localStorage Keys
- `userRole`: 'admin' | 'owner'
- `userEmail`: string
- `userName`: string (from registration)
- `restaurantName`: string (from registration)
- `menucraft_dashboard_data`: JSON (all restaurant data)

---

## 📊 Data Structure

### Restaurant
```typescript
{
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
```

### MenuItem
```typescript
{
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
```

### Category
```typescript
{
  id: string;
  name: string;
  nameTamil?: string;
  displayOrder: number;
  availableTimes: string[];
}
```

---

## 🌐 Routes

```typescript
/ → HomePage (Landing page)
/login → LoginPage (Authentication)
/register → RegisterPage (Sign up)
/demo → DemoPage (Coming soon)
/dashboard → DashboardPage (Owner dashboard - protected)
/admin/dashboard → AdminDashboard (Coming soon)
```

---

## 🛠️ Key Features Implemented

### ✅ Landing Page
- Hero section with CTA
- Features grid (6 features)
- Testimonials (3 cards)
- CTA section
- Fully responsive

### ✅ Authentication
- Login with validation
- Registration with validation
- Password visibility toggle
- localStorage session management
- Auto-redirect after login

### ✅ Dashboard
**Stats Cards:**
- Categories count
- Items count
- Total views
- Image upload tracker

**Menu Tab:**
- View categories (expandable)
- View menu items (cards)
- Add new items (modal)
- Edit items (modal)
- Delete items (confirmation)
- Search categories
- Special tags (Chef's Special, Today's Special, Seasonal, Veg)
- Image upload (with preview)
- Spice level selector
- Time slots selection

**Time Slots Tab:**
- Configure breakfast/lunch/snacks/dinner times
- Visual time pickers

**QR Code Tab:**
- Display QR code placeholder
- Copy menu URL
- Download/Print options

**Analytics Tab:**
- Total menu views
- Most popular item
- Average time on menu
- Top 10 viewed items

**Settings Tab:**
- Update restaurant name (English/Tamil)
- Change primary color
- Select menu template (3 options)

**Header:**
- Restaurant name display
- Language toggle (English ↔ Tamil)
- Logout button

---

## 🌍 Internationalization (i18n)

**Languages:** English (en) | Tamil (ta)

**Translation keys:** dashboard, menu, categories, items, analytics, settings, qrCode, timeSlots, addCategory, addItem, save, cancel, edit, delete, etc.

**Implementation:** `@utils/translations.ts`

---

## 💾 Data Persistence

**Strategy:** localStorage (temporary, will be replaced with backend API)

**Main Functions:**
```typescript
getRestaurantData(): DashboardData
saveRestaurantData(data: DashboardData): void
clearRestaurantData(): void
```

**Storage Key:** `menucraft_dashboard_data`

---

## 🎯 Path Aliases

```typescript
@ → ./src
@components → ./src/components
@pages → ./src/pages
@utils → ./src/utils
@hooks → ./src/hooks
@data → ./src/data
```

**Note:** `@types` alias removed (conflicts with TypeScript built-in)

---

## 🚀 Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)

# Build
npm run build            # Production build
npm run preview          # Preview production build

# Deploy
npm run deploy           # Deploy to GitHub Pages
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px   (phone landscape)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
```

---

## 🐛 Known Issues & Solutions

### Issue 1: TypeScript import error with @types
**Solution:** Use `@/types/...` instead of `@types/...`

### Issue 2: Modal scroll issues
**Solution:** Use flexbox with `flex-shrink-0` for header/footer and `overflow-y-auto` for content

### Issue 3: Build error with tsconfig references
**Solution:** Remove `"references"` from tsconfig.json or add `"composite": true` to tsconfig.node.json

---

## 🔄 Future Enhancements (Not Yet Implemented)

- [ ] Backend API integration
- [ ] Real image upload to cloud storage
- [ ] Admin dashboard
- [ ] Category add/edit/delete
- [ ] Customer-facing menu view
- [ ] Real QR code generation
- [ ] Advanced analytics with charts
- [ ] Email notifications
- [ ] Payment integration
- [ ] Multi-restaurant support for admin
- [ ] Export menu as PDF
- [ ] WhatsApp integration
- [ ] Social media sharing

---

## 📝 Important Notes

1. **GitHub Pages Base Path:** Set in `vite.config.ts` and `App.tsx`
   ```typescript
   base: '/menucraft/'
   basename="/menucraft"
   ```

2. **Demo Data:** Automatically generated on first load

3. **Subscription Logic:** 
   - Trial: 7 days from first use
   - Expired: No access to edit features
   - Active: Full access (not implemented yet)

4. **Image Upload Limits:**
   - Basic: 20 images
   - Pro: 50 images
   - Premium: Unlimited

5. **Time Slots:** Default times set for Indian restaurants
   - Breakfast: 6:00 AM - 11:00 AM
   - Lunch: 11:00 AM - 4:00 PM
   - Snacks: 4:00 PM - 7:00 PM
   - Dinner: 7:00 PM - 11:30 PM

---

## 🎨 Design Decisions

- **Mobile-first:** All components responsive by default
- **Tailwind CSS:** Utility-first styling
- **No CSS-in-JS:** Pure Tailwind classes
- **Component-driven:** Reusable, modular components
- **TypeScript:** Full type safety
- **Functional Components:** No class components
- **React Hooks:** useState, useEffect, useNavigate, etc.

---

## 🔗 Quick Reference Links

- **Tailwind Docs:** https://tailwindcss.com/docs
- **Vite Docs:** https://vitejs.dev/
- **React Router:** https://reactrouter.com/
- **Lucide Icons:** https://lucide.dev/

---

## 🆘 Common Prompts for Claude

**To continue working on this project, share this file and say:**

1. "Continue building MenuCraft dashboard - add [feature name]"
2. "Fix [issue description] in MenuCraft project"
3. "Add [new component] to MenuCraft following existing patterns"
4. "Update MenuCraft [component name] with [requirements]"
5. "Create [new page] for MenuCraft with [specifications]"

**Always mention:**
- Component path (e.g., `src/components/dashboard/...`)
- What functionality you want
- Any specific design requirements
- Mobile responsiveness needs

---

## 🎯 Current State Summary

**✅ Completed:**
- Landing page (fully responsive)
- Authentication (login/register)
- Dashboard layout
- Menu management (CRUD operations)
- All 5 dashboard tabs (Menu, Time Slots, QR Code, Analytics, Settings)
- Bilingual support (EN/TA)
- localStorage data persistence
- Mobile responsive design
- Item form modal (add/edit items)

**🚧 In Progress:**
- Nothing currently

**📋 Next Priority:**
- Admin dashboard
- Backend API integration
- Real QR code generation
- Customer menu view

---

## 📊 Project Stats

- **Total Components:** ~25
- **Total Pages:** 5
- **Lines of Code:** ~3,500+
- **Languages:** TypeScript, CSS, HTML
- **Dependencies:** React, React Router, Tailwind, Lucide Icons, Vite

---

**Last Updated:** January 2025  
**Version:** 1.0.0 (MVP Complete)  
**Status:** ✅ Production Ready (Frontend)

---

## 💡 Tips for Future Development

1. Always maintain the existing file structure
2. Follow naming conventions (PascalCase for components, camelCase for functions)
3. Keep components under 300 lines (split if larger)
4. Use the existing `Button`, `Card`, `Badge` components
5. All new features should work in both English and Tamil
6. Test on mobile (375px), tablet (768px), and desktop (1920px)
7. Use `@` path aliases for cleaner imports
8. Store all strings in `translations.ts` for i18n
9. Use localStorage utility functions in `dashboardStorage.ts`
10. Follow responsive design patterns from existing components

---

**END OF DOCUMENTATION**