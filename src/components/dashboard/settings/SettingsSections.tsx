import { Store, Phone, Mail, MapPin, Upload, Image as ImageIcon, Share2, Palette } from 'lucide-react';
import { SocialMediaLinks } from '@/types/dashboard.types';

// Section Container Component
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ icon, title, children }: SectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// Basic Info Section
interface BasicInfoProps {
  name: string;
  nameTamil: string;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function BasicInfoSection({ name, nameTamil, onChange, errors, canAccess, lang }: BasicInfoProps) {
  return (
    <SettingsSection
      icon={<Store className="w-6 h-6 text-primary-600" />}
      title={lang === 'en' ? 'Basic Information' : 'அடிப்படை தகவல்'}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Restaurant Name (English)' : 'உணவக பெயர் (English)'} *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            disabled={!canAccess}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Restaurant Name (Tamil)' : 'உணவக பெயர் (தமிழ்)'}
          </label>
          <input
            type="text"
            value={nameTamil}
            onChange={(e) => onChange('nameTamil', e.target.value)}
            disabled={!canAccess}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
          />
        </div>
      </div>
    </SettingsSection>
  );
}

// Contact Info Section
interface ContactInfoProps {
  phone: string;
  email: string;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function ContactInfoSection({ phone, email, onChange, errors, canAccess, lang }: ContactInfoProps) {
  return (
    <SettingsSection
      icon={<Phone className="w-6 h-6 text-green-600" />}
      title={lang === 'en' ? 'Contact Information' : 'தொடர்பு தகவல்'}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            {lang === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            disabled={!canAccess}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            {lang === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            disabled={!canAccess}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="restaurant@example.com"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
    </SettingsSection>
  );
}

// Location Section
interface LocationSectionProps {
  address: string;
  addressTamil: string;
  onChange: (field: string, value: string) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function LocationSection({ address, addressTamil, onChange, canAccess, lang }: LocationSectionProps) {
  return (
    <SettingsSection
      icon={<MapPin className="w-6 h-6 text-red-600" />}
      title={lang === 'en' ? 'Location' : 'இருப்பிடம்'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Address (English)' : 'முகவரி (English)'}
          </label>
          <textarea
            value={address}
            onChange={(e) => onChange('address', e.target.value)}
            disabled={!canAccess}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 resize-none"
            placeholder="123 Main Street, Chennai, Tamil Nadu 600001"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Address (Tamil)' : 'முகவரி (தமிழ்)'}
          </label>
          <textarea
            value={addressTamil}
            onChange={(e) => onChange('addressTamil', e.target.value)}
            disabled={!canAccess}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 resize-none"
            placeholder="123 மெயின் தெரு, சென்னை, தமிழ்நாடு 600001"
          />
        </div>
      </div>
    </SettingsSection>
  );
}

// Social Media Section
interface SocialMediaSectionProps {
  socialMedia: SocialMediaLinks;
  onChange: (links: SocialMediaLinks) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function SocialMediaSection({ socialMedia, onChange, canAccess, lang }: SocialMediaSectionProps) {
  const handleChange = (platform: keyof SocialMediaLinks, value: string) => {
    onChange({ ...socialMedia, [platform]: value });
  };

  const platforms = [
    { key: 'facebook' as const, label: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/yourpage' },
    { key: 'instagram' as const, label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/yourpage' },
    { key: 'twitter' as const, label: 'Twitter/X', icon: '🐦', placeholder: 'https://twitter.com/yourpage' },
    { key: 'youtube' as const, label: 'YouTube', icon: '📹', placeholder: 'https://youtube.com/@yourchannel' },
    { key: 'whatsapp' as const, label: 'WhatsApp', icon: '💬', placeholder: '+91 98765 43210' },
    { key: 'website' as const, label: 'Website', icon: '🌐', placeholder: 'https://yourwebsite.com' },
  ];

  return (
    <SettingsSection
      icon={<Share2 className="w-6 h-6 text-blue-600" />}
      title={lang === 'en' ? 'Social Media & Links' : 'சமூக ஊடகம் & இணைப்புகள்'}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {platforms.map(({ key, label, icon, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              <span className="mr-1">{icon}</span>
              {label}
            </label>
            <input
              type="text"
              value={socialMedia[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={!canAccess}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}

// Branding Section
interface BrandingSectionProps {
  bannerImage: string;
  logoImage: string;
  primaryColor: string;
  onImageUpload: (field: 'bannerImage' | 'logoImage', e: React.ChangeEvent<HTMLInputElement>) => void;
  onColorChange: (color: string) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function BrandingSection({ 
  bannerImage, 
  logoImage, 
  primaryColor, 
  onImageUpload, 
  onColorChange, 
  canAccess, 
  lang 
}: BrandingSectionProps) {
  return (
    <SettingsSection
      icon={<Palette className="w-6 h-6 text-purple-600" />}
      title={lang === 'en' ? 'Branding' : 'பிராண்டிங்'}
    >
      <div className="space-y-6">
        {/* Banner & Logo in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Banner */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              {lang === 'en' ? 'Banner' : 'பேனர்'}
            </label>
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition-colors cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => onImageUpload('bannerImage', e)} 
                disabled={!canAccess}
                className="hidden" 
              />
              {bannerImage ? (
                <img src={bannerImage} alt="Banner" className="max-h-32 mx-auto rounded" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">1920x400</p>
                </>
              )}
            </label>
          </div>

          {/* Logo */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              {lang === 'en' ? 'Logo' : 'லோகோ'}
            </label>
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition-colors cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => onImageUpload('logoImage', e)} 
                disabled={!canAccess}
                className="hidden" 
              />
              {logoImage ? (
                <img src={logoImage} alt="Logo" className="w-24 h-24 object-contain mx-auto rounded" />
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">500x500</p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Primary Color' : 'முதன்மை நிறம்'}
          </label>
          <div className="flex gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onColorChange(e.target.value)}
              disabled={!canAccess}
              className="w-20 h-10 border border-gray-300 rounded-lg disabled:opacity-50 cursor-pointer"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => onColorChange(e.target.value)}
              disabled={!canAccess}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

// Menu Template Section
interface MenuTemplateSectionProps {
  selectedTemplate: string;
  planType: string;
  onSelect: (template: string) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function MenuTemplateSection({ selectedTemplate, planType, onSelect, canAccess, lang }: MenuTemplateSectionProps) {
  return (
    <SettingsSection
      icon={<Store className="w-6 h-6 text-indigo-600" />}
      title={lang === 'en' ? 'Menu Template' : 'மெனு டெம்ப்ளேட்'}
    >
      <div className="grid grid-cols-3 gap-3">
        {['template_1', 'template_2', 'template_3'].map((template, idx) => {
          const isPremium = idx > 0;
          const isLocked = isPremium && planType === 'basic';
          const isSelected = selectedTemplate === template;
          
          return (
            <button
              key={template}
              onClick={() => !isLocked && onSelect(template)}
              disabled={isLocked || !canAccess}
              className={`
                relative border-2 rounded-lg p-3 aspect-square flex items-center justify-center transition-all
                ${isLocked ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-primary-500'}
                ${isSelected ? 'border-primary-500 bg-primary-50' : ''}
              `}
            >
              <div className="text-center">
                <Store className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-600">{idx + 1}</p>
              </div>
              {isLocked && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Pro</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </SettingsSection>
  );
}