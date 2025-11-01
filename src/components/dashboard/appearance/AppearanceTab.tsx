import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { Restaurant, AppearanceSettings, DEFAULT_APPEARANCE } from '@/types/dashboard.types';
import Button from '@components/ui/Button';
import LivePreview from '@components/dashboard/appearance/LivePreview';
import {
  TemplateSelection,
  ColorPaletteSection,
  TypographySection,
  LayoutOptionsSection,
  VisibilityToggles,
} from '@components/dashboard/appearance/AppearanceSections';

interface AppearanceTabProps {
  restaurant: Restaurant;
  onUpdate: (updates: Partial<Restaurant>) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function AppearanceTab({ restaurant, onUpdate, canAccess, lang }: AppearanceTabProps) {
  const [appearance, setAppearance] = useState<AppearanceSettings>(
    restaurant.appearance || DEFAULT_APPEARANCE
  );
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (updates: Partial<AppearanceSettings>) => {
    setAppearance({ ...appearance, ...updates });
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate({ appearance });
    setHasChanges(false);
    alert(lang === 'en' ? 'Appearance saved successfully!' : 'தோற்றம் வெற்றிகரமாக சேமிக்கப்பட்டது!');
  };

  const handleReset = () => {
    if (confirm(lang === 'en' ? 'Reset to default appearance?' : 'இயல்புநிலை தோற்றத்திற்கு மீட்டமைக்கவா?')) {
      setAppearance(DEFAULT_APPEARANCE);
      setHasChanges(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-lg">🎨</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 mb-1">
              {lang === 'en' ? 'Customize Your Menu Appearance' : 'உங்கள் மெனு தோற்றத்தை தனிப்பயனாக்குங்கள்'}
            </h3>
            <p className="text-sm text-purple-800">
              {lang === 'en' 
                ? 'Design your menu exactly how you want it. All changes update in real-time in the preview.'
                : 'உங்கள் மெனுவை நீங்கள் விரும்பும் விதத்தில் வடிவமைக்கவும். அனைத்து மாற்றங்களும் முன்னோட்டத்தில் நேரடியாக புதுப்பிக்கப்படும்.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout - Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Live Preview */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
              {lang === 'en' ? 'Live Preview' : 'நேரடி முன்னோட்டம்'}
              <span className="text-xs text-gray-500">
                {lang === 'en' ? 'Updates in real-time' : 'நேரடியாக புதுப்பிக்கப்படுகிறது'}
              </span>
            </h3>
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden" style={{ minHeight: '600px' }}>
              <LivePreview appearance={appearance} lang={lang} />
            </div>
          </div>
        </div>

        {/* Right - Controls */}
        <div className="space-y-4">
          {/* Template Selection */}
          <TemplateSelection
            selectedTemplate={appearance.templateId}
            planType={restaurant.planType}
            onSelect={(templateId) => handleChange({ templateId })}
            canAccess={canAccess}
            lang={lang}
          />

          {/* Color Palette */}
          <ColorPaletteSection
            colors={appearance.colors}
            onChange={(colors) => handleChange({ colors })}
            canAccess={canAccess}
            lang={lang}
          />

          {/* Typography */}
          <TypographySection
            typography={appearance.typography}
            onChange={(typography) => handleChange({ typography })}
            canAccess={canAccess}
            lang={lang}
          />

          {/* Layout Options */}
          <LayoutOptionsSection
            layout={appearance.layout}
            onChange={(layout) => handleChange({ layout })}
            canAccess={canAccess}
            lang={lang}
          />

          {/* Visibility Toggles */}
          <VisibilityToggles
            visibility={appearance.visibility}
            onChange={(visibility) => handleChange({ visibility })}
            canAccess={canAccess}
            lang={lang}
          />
        </div>
      </div>

      {/* Action Buttons - Sticky Footer */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-gray-200 -mx-4 px-4 sm:-mx-6 sm:px-6 py-4 flex flex-col sm:flex-row justify-between gap-3">
        <Button
          onClick={handleReset}
          variant="secondary"
          disabled={!canAccess}
          className="w-full sm:w-auto"
        >
          <RotateCcw className="w-4 h-4" />
          {lang === 'en' ? 'Reset to Default' : 'இயல்புநிலைக்கு மீட்டமை'}
        </Button>

        <Button
          onClick={handleSave}
          disabled={!canAccess || !hasChanges}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Save className="w-5 h-5" />
          {lang === 'en' ? 'Save Changes' : 'மாற்றங்களை சேமி'}
          {hasChanges && (
            <span className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse" />
          )}
        </Button>
      </div>
    </div>
  );
}