import { Store, Palette, Type, Layout, Eye } from 'lucide-react';
import { AppearanceSettings, ColorPalette } from '@/types/dashboard.types';
import { THEME_PRESETS, FONT_OPTIONS } from '@utils/themePresets';

// Section Wrapper
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// Template Selection
interface TemplateSelectionProps {
  selectedTemplate: string;
  planType: string;
  onSelect: (id: string) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function TemplateSelection({ selectedTemplate, planType, onSelect, canAccess, lang }: TemplateSelectionProps) {
  const templates = [
    { id: 'template_1', name: lang === 'en' ? 'Classic' : 'கிளாசிக்', isPremium: false },
    { id: 'template_2', name: lang === 'en' ? 'Modern' : 'நவீன', isPremium: true },
    { id: 'template_3', name: lang === 'en' ? 'Elegant' : 'நேர்த்தியான', isPremium: true },
  ];

  return (
    <Section
      icon={<Store className="w-5 h-5 text-indigo-600" />}
      title={lang === 'en' ? 'Template' : 'டெம்ப்ளேட்'}
    >
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => {
          const isLocked = template.isPremium && planType === 'basic';
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => !isLocked && onSelect(template.id)}
              disabled={isLocked || !canAccess}
              className={`relative border-2 rounded-lg p-4 aspect-square transition-all ${
                isLocked ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-primary-500'
              } ${isSelected ? 'border-primary-500 bg-primary-50' : ''}`}
            >
              <div className="text-center">
                <Store className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-xs font-medium">{template.name}</p>
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
    </Section>
  );
}

// Color Palette
interface ColorPaletteProps {
  colors: ColorPalette;
  onChange: (colors: ColorPalette) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function ColorPaletteSection({ colors, onChange, canAccess, lang }: ColorPaletteProps) {
  const colorFields = [
    { key: 'primary' as keyof ColorPalette, label: lang === 'en' ? 'Primary' : 'முதன்மை', desc: lang === 'en' ? 'Brand color' : 'பிராண்ட் நிறம்' },
    { key: 'secondary' as keyof ColorPalette, label: lang === 'en' ? 'Secondary' : 'இரண்டாம்', desc: lang === 'en' ? 'Accent' : 'உச்சரிப்பு' },
    { key: 'background' as keyof ColorPalette, label: lang === 'en' ? 'Background' : 'பின்னணி', desc: lang === 'en' ? 'Menu BG' : 'மெனு பின்னணி' },
    { key: 'text' as keyof ColorPalette, label: lang === 'en' ? 'Text' : 'உரை', desc: lang === 'en' ? 'Body text' : 'உடல் உரை' },
    { key: 'heading' as keyof ColorPalette, label: lang === 'en' ? 'Heading' : 'தலைப்பு', desc: lang === 'en' ? 'Titles' : 'தலைப்புகள்' },
    { key: 'border' as keyof ColorPalette, label: lang === 'en' ? 'Border' : 'எல்லை', desc: lang === 'en' ? 'Lines' : 'கோடுகள்' },
  ];

  const handleColorChange = (key: keyof ColorPalette, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <Section
      icon={<Palette className="w-5 h-5 text-purple-600" />}
      title={lang === 'en' ? 'Colors' : 'நிறங்கள்'}
    >
      <div className="space-y-3">
        {colorFields.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center gap-3">
            <input
              type="color"
              value={colors[key]}
              onChange={(e) => handleColorChange(key, e.target.value)}
              disabled={!canAccess}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <input
              type="text"
              value={colors[key]}
              onChange={(e) => handleColorChange(key, e.target.value)}
              disabled={!canAccess}
              className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            />
          </div>
        ))}
      </div>

      {/* Presets */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-700 mb-2">
          {lang === 'en' ? 'Quick Presets' : 'விரைவு முன்னமைவுகள்'}
        </p>
        <div className="flex flex-wrap gap-2">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChange(preset.colors)}
              disabled={!canAccess}
              className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:border-primary-500 transition-colors disabled:opacity-50"
              style={{ borderLeftWidth: '4px', borderLeftColor: preset.colors.primary }}
            >
              {lang === 'en' ? preset.name : preset.nameTamil}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Typography
interface TypographyProps {
  typography: AppearanceSettings['typography'];
  onChange: (typography: AppearanceSettings['typography']) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function TypographySection({ typography, onChange, canAccess, lang }: TypographyProps) {
  return (
    <Section
      icon={<Type className="w-5 h-5 text-blue-600" />}
      title={lang === 'en' ? 'Typography' : 'எழுத்துரு'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Font Family' : 'எழுத்துரு குடும்பம்'}
          </label>
          <select
            value={typography.fontFamily}
            onChange={(e) => onChange({ ...typography, fontFamily: e.target.value, headingFont: e.target.value })}
            disabled={!canAccess}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Base Font Size' : 'அடிப்படை எழுத்துரு அளவு'}: {typography.fontSize}px
          </label>
          <input
            type="range"
            min="14"
            max="18"
            value={typography.fontSize}
            onChange={(e) => onChange({ ...typography, fontSize: Number(e.target.value) })}
            disabled={!canAccess}
            className="w-full"
          />
        </div>
      </div>
    </Section>
  );
}

// Layout Options
interface LayoutOptionsProps {
  layout: AppearanceSettings['layout'];
  onChange: (layout: AppearanceSettings['layout']) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function LayoutOptionsSection({ layout, onChange, canAccess, lang }: LayoutOptionsProps) {
  return (
    <Section
      icon={<Layout className="w-5 h-5 text-green-600" />}
      title={lang === 'en' ? 'Layout' : 'அமைப்பு'}
    >
      <div className="space-y-4">
        {/* Card Style */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Card Style' : 'கார்டு பாணி'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'rounded', label: lang === 'en' ? 'Rounded' : 'வட்டமான' },
              { value: 'square', label: lang === 'en' ? 'Square' : 'சதுரம்' },
              { value: 'elevated', label: lang === 'en' ? 'Elevated' : 'உயர்த்தப்பட்ட' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onChange({ ...layout, cardStyle: option.value as 'rounded' | 'square' | 'elevated' })}
                disabled={!canAccess}
                className={`px-3 py-2 text-xs border-2 rounded-lg transition-all disabled:opacity-50 ${
                  layout.cardStyle === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Spacing' : 'இடைவெளி'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'compact' as const, label: lang === 'en' ? 'Compact' : 'சுருக்கமான' },
              { value: 'comfortable' as const, label: lang === 'en' ? 'Comfortable' : 'வசதியான' },
              { value: 'spacious' as const, label: lang === 'en' ? 'Spacious' : 'விசாலமான' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onChange({ ...layout, spacing: option.value })}
                disabled={!canAccess}
                className={`px-3 py-2 text-xs border-2 rounded-lg transition-all disabled:opacity-50 ${
                  layout.spacing === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Size */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Image Size' : 'படம் அளவு'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'small' as const, label: lang === 'en' ? 'Small' : 'சிறிய' },
              { value: 'medium' as const, label: lang === 'en' ? 'Medium' : 'நடுத்தர' },
              { value: 'large' as const, label: lang === 'en' ? 'Large' : 'பெரிய' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onChange({ ...layout, imageSize: option.value })}
                disabled={!canAccess}
                className={`px-3 py-2 text-xs border-2 rounded-lg transition-all disabled:opacity-50 ${
                  layout.imageSize === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Columns */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {lang === 'en' ? 'Columns' : 'நெடுவரிசைகள்'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {([1, 2, 3] as const).map((cols) => (
              <button
                key={cols}
                onClick={() => onChange({ ...layout, gridColumns: cols })}
                disabled={!canAccess}
                className={`px-3 py-2 text-xs border-2 rounded-lg transition-all disabled:opacity-50 ${
                  layout.gridColumns === cols
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {cols}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Visibility Toggles
interface VisibilityTogglesProps {
  visibility: AppearanceSettings['visibility'];
  onChange: (visibility: AppearanceSettings['visibility']) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export function VisibilityToggles({ visibility, onChange, canAccess, lang }: VisibilityTogglesProps) {
  const toggles = [
    { key: 'showPrices' as keyof typeof visibility, label: lang === 'en' ? 'Show Prices' : 'விலைகளை காட்டு' },
    { key: 'showImages' as keyof typeof visibility, label: lang === 'en' ? 'Show Images' : 'படங்களை காட்டு' },
    { key: 'showDescriptions' as keyof typeof visibility, label: lang === 'en' ? 'Show Descriptions' : 'விளக்கங்களை காட்டு' },
    { key: 'showBadges' as keyof typeof visibility, label: lang === 'en' ? 'Show Badges' : 'பேட்ஜ்களை காட்டு' },
    { key: 'showSpiceLevel' as keyof typeof visibility, label: lang === 'en' ? 'Show Spice Level' : 'காரத்தை காட்டு' },
    { key: 'showPrepTime' as keyof typeof visibility, label: lang === 'en' ? 'Show Prep Time' : 'நேரத்தை காட்டு' },
  ];

  const handleToggle = (key: keyof typeof visibility) => {
    onChange({ ...visibility, [key]: !visibility[key] });
  };

  return (
    <Section
      icon={<Eye className="w-5 h-5 text-orange-600" />}
      title={lang === 'en' ? 'Visibility' : 'தெரிவுநிலை'}
    >
      <div className="space-y-2">
        {toggles.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={visibility[key]}
              onChange={() => handleToggle(key)}
              disabled={!canAccess}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </Section>
  );
}