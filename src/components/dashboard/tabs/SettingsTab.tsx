import { useState } from 'react';
import { Save, Megaphone } from 'lucide-react';
import { Restaurant } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';
import AnnouncementManager from '@components/dashboard/AnnouncementManager';
import {
  BasicInfoSection,
  ContactInfoSection,
  LocationSection,
  SocialMediaSection,
  BrandingSection,
  MenuTemplateSection,
  SettingsSection,
} from '@components/dashboard/settings/SettingsSections';

interface SettingsTabProps {
  restaurant: Restaurant;
  onUpdate: (updates: Partial<Restaurant>) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function SettingsTab({ restaurant, onUpdate, canAccess, lang }: SettingsTabProps) {
  const [formData, setFormData] = useState({
    name: restaurant.name,
    nameTamil: restaurant.nameTamil,
    phone: restaurant.phone || '',
    email: restaurant.email || '',
    address: restaurant.address || '',
    addressTamil: restaurant.addressTamil || '',
    socialMedia: restaurant.socialMedia || {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      whatsapp: '',
      website: '',
    },
    primaryColor: restaurant.primaryColor || '#f97316',
    menuTemplate: restaurant.menuTemplate || 'template_1',
    bannerImage: restaurant.bannerImage || '',
    logoImage: restaurant.logoImage || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === 'en' ? 'Restaurant name is required' : 'உணவக பெயர் தேவை';
    }

    if (formData.phone && !/^[+]?[0-9\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = lang === 'en' ? 'Invalid phone number' : 'தவறான தொலைபேசி எண்';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'en' ? 'Invalid email address' : 'தவறான மின்னஞ்சல் முகவரி';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleImageUpload = (field: 'bannerImage' | 'logoImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, [field]: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!validate()) {
      alert(lang === 'en' ? 'Please fix the errors' : 'பிழைகளை சரிசெய்யவும்');
      return;
    }

    onUpdate(formData);
    alert(lang === 'en' ? 'Settings saved successfully!' : 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Basic Information */}
      <BasicInfoSection
        name={formData.name}
        nameTamil={formData.nameTamil}
        onChange={handleFieldChange}
        errors={errors}
        canAccess={canAccess}
        lang={lang}
      />

      {/* Contact Information */}
      <ContactInfoSection
        phone={formData.phone}
        email={formData.email}
        onChange={handleFieldChange}
        errors={errors}
        canAccess={canAccess}
        lang={lang}
      />

      {/* Location */}
      <LocationSection
        address={formData.address}
        addressTamil={formData.addressTamil}
        onChange={handleFieldChange}
        canAccess={canAccess}
        lang={lang}
      />

      {/* Social Media */}
      <SocialMediaSection
        socialMedia={formData.socialMedia}
        onChange={(socialMedia) => setFormData({ ...formData, socialMedia })}
        canAccess={canAccess}
        lang={lang}
      />

      {/* Branding */}
      <BrandingSection
        bannerImage={formData.bannerImage}
        logoImage={formData.logoImage}
        primaryColor={formData.primaryColor}
        onImageUpload={handleImageUpload}
        onColorChange={(color) => setFormData({ ...formData, primaryColor: color })}
        canAccess={canAccess}
        lang={lang}
      />

      {/* Menu Template */}
      <MenuTemplateSection
        selectedTemplate={formData.menuTemplate}
        planType={restaurant.planType}
        onSelect={(template) => setFormData({ ...formData, menuTemplate: template })}
        canAccess={canAccess}
        lang={lang}
      />

      {/* Announcements */}
      <SettingsSection
        icon={<Megaphone className="w-6 h-6 text-orange-600" />}
        title={lang === 'en' ? 'Announcements & Updates' : 'அறிவிப்புகள் & புதுப்பிப்புகள்'}
      >
        <AnnouncementManager
          announcements={restaurant.announcements || []}
          onUpdate={(announcements) => onUpdate({ announcements })}
          canAccess={canAccess}
          lang={lang}
        />
      </SettingsSection>

      {/* Save Button - Sticky */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur py-4 border-t border-gray-200 -mx-4 px-4 sm:-mx-6 sm:px-6 flex justify-end">
        <Button onClick={handleSave} disabled={!canAccess} size="lg">
          <Save className="w-5 h-5" />
          {t('save', lang)} {t('settings', lang)}
        </Button>
      </div>
    </div>
  );
}