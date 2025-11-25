# 🍽️ MenuCraft - Digital Menu Solution for Modern Restaurants

> Transform your restaurant with beautiful QR code menus. Update instantly, track performance, delight customers.

<!-- ![MenuCraft Banner](https://via.placeholder.com/1200x400/f97316/ffffff?text=MenuCraft) -->

---

## 🚀 Features

- ✨ **Beautiful QR Menus** - Mobile-optimized digital menus
- 🌐 **Multi-Language** - Tamil + English support
- 📊 **Analytics Dashboard** - Track popular dishes
- ⚡ **Instant Updates** - No reprinting needed
- 📱 **Mobile-First** - Works on any device
- 🎨 **Custom Branding** - Match your restaurant's style

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Utilities**: clsx

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/visainnovations/menucraft.git

# Navigate to project
cd menucraft

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📁 Project Structure

```
menucraft/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Basic elements (Button, Card, Badge)
│   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   └── home/         # Home-specific components
│   ├── pages/            # Page components (routes)
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── data/             # Static/mock data
│   └── styles/           # Global CSS
├── public/               # Static assets
└── ...config files
```

---

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## 🎨 Development Guidelines

### Component Structure
```typescript
// src/components/ui/Button.tsx
import { cn } from '@utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary',
  className 
}: ButtonProps) {
  return (
    <button className={cn(
      'px-4 py-2 rounded-lg font-semibold',
      variant === 'primary' && 'bg-primary-500 text-white',
      variant === 'secondary' && 'bg-gray-200 text-gray-900',
      className
    )}>
      {children}
    </button>
  );
}
```

### Path Aliases
Use absolute imports for cleaner code:
```typescript
// ❌ Bad
import Button from '../../../components/ui/Button';

// ✅ Good
import Button from '@components/ui/Button';
```

### Styling with Tailwind
```typescript
// Use cn() for conditional classes
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className // Allow override
)} />
```

---

## 🌈 Color Palette

### Primary (Orange)
- `primary-500`: #f97316 - Main brand color
- `primary-600`: #ea580c - Hover states

### Secondary (Red)
- `secondary-500`: #ef4444 - Accent color
- `secondary-600`: #dc2626 - Hover states

---

## 📱 Pages Overview

### 1. **HomePage** (`/`)
Landing page with hero, features, testimonials, and CTA sections.

### 2. **LoginPage** (`/login`)
User authentication (coming soon).

### 3. **RegisterPage** (`/register`)
User registration (coming soon).

### 4. **DemoPage** (`/demo`)
Interactive demo of digital menu (coming soon).

---

## 🔧 Configuration Files

### `vite.config.ts`
- Path aliases configuration
- React plugin setup
- Build optimizations

### `tailwind.config.js`
- Custom color palette
- Animation keyframes
- Plugin configurations

### `tsconfig.json`
- TypeScript compiler options
- Path mapping
- Strict mode enabled

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```
Output will be in `dist/` directory.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Visainnovations**
- Email: visainnovations123@gmail.com
<!-- - LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile) -->
- Portfolio: [visainnovations.com](https://visagansp.github.io/visainnovations/)

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- Chennai restaurant community for feedback
- Open source community for amazing tools

---

## 📞 Support

Need help? 
- 📧 Email: visainnovations123@gmail.com
- 💬 Discord: [Join our community](https://discord.gg/menucraft)
- 📚 Docs: [docs.menucraft.com](https://docs.menucraft.com)

---

Made with ❤️ in Chennai