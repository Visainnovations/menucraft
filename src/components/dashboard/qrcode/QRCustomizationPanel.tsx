import { QRCodeSettings } from '@/types/dashboard.types';

interface QRCustomizationPanelProps {
  settings: QRCodeSettings;
  onChange: (settings: QRCodeSettings) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function QRCustomizationPanel({ 
  settings, 
  onChange, 
  canAccess, 
  lang 
}: QRCustomizationPanelProps) {
  const t = (en: string, ta: string) => (lang === 'en' ? en : ta);

  const handleChange = <K extends keyof QRCodeSettings>(
    key: K,
    value: QRCodeSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <h4 className="text-xs sm:text-sm font-semibold text-gray-700">{title}</h4>
      {children}
    </div>
  );

  const InputGroup = ({ 
    label, 
    children 
  }: { 
    label: string; 
    children: React.ReactNode;
  }) => (
    <div className="space-y-1.5">
      <label className="block text-xs sm:text-sm text-gray-600">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Basic Settings */}
      <Section title={t('Basic Settings', 'அடிப்படை அமைப்புகள்')}>
        <InputGroup label={t('Size', 'அளவு')}>
          <select
            value={settings.size}
            onChange={(e) => handleChange('size', Number(e.target.value))}
            disabled={!canAccess}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value={256}>{t('Small (256px)', 'சிறியது (256px)')}</option>
            <option value={512}>{t('Medium (512px)', 'நடுத்தரம் (512px)')}</option>
            <option value={1024}>{t('Large (1024px)', 'பெரியது (1024px)')}</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {t('Preview is scaled for mobile. Download gets full size.', 'முன்னோட்டம் மொபைலுக்காக அளவிடப்பட்டது. பதிவிறக்கம் முழு அளவில் கிடைக்கும்.')}
          </p>
        </InputGroup>

        <InputGroup label={t('Style', 'பாணி')}>
          <div className="grid grid-cols-3 gap-2">
            {(['squares', 'dots', 'rounded'] as const).map((style) => (
              <button
                key={style}
                onClick={() => handleChange('style', style)}
                disabled={!canAccess}
                className={`px-2 sm:px-3 py-2 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                  settings.style === style
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {style === 'squares' && t('Square', 'சதுரம்')}
                {style === 'dots' && t('Dots', 'புள்ளிகள்')}
                {style === 'rounded' && t('Round', 'வட்டம்')}
              </button>
            ))}
          </div>
        </InputGroup>

        <InputGroup label={t('Error Correction', 'பிழை திருத்தம்')}>
          <select
            value={settings.errorCorrectionLevel}
            onChange={(e) => handleChange('errorCorrectionLevel', e.target.value as 'L' | 'M' | 'Q' | 'H')}
            disabled={!canAccess}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="L">{t('Low (7%)', 'குறைவு (7%)')}</option>
            <option value="M">{t('Medium (15%)', 'நடுத்தரம் (15%)')}</option>
            <option value="Q">{t('High (25%)', 'அதிகம் (25%)')}</option>
            <option value="H">{t('Very High (30%)', 'மிக அதிகம் (30%)')}</option>
          </select>
        </InputGroup>
      </Section>

      {/* Colors */}
      <Section title={t('Colors', 'நிறங்கள்')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <InputGroup label={t('Foreground', 'முன்புறம்')}>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.fgColor}
                onChange={(e) => handleChange('fgColor', e.target.value)}
                disabled={!canAccess}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
              />
              <input
                type="text"
                value={settings.fgColor}
                onChange={(e) => handleChange('fgColor', e.target.value)}
                disabled={!canAccess}
                className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="#000000"
              />
            </div>
          </InputGroup>

          <InputGroup label={t('Background', 'பின்புறம்')}>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.bgColor}
                onChange={(e) => handleChange('bgColor', e.target.value)}
                disabled={!canAccess}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
              />
              <input
                type="text"
                value={settings.bgColor}
                onChange={(e) => handleChange('bgColor', e.target.value)}
                disabled={!canAccess}
                className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="#ffffff"
              />
            </div>
          </InputGroup>
        </div>
      </Section>

      {/* Logo Settings */}
      <Section title={t('Logo', 'லோகோ')}>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-xs sm:text-sm text-gray-700">
            {t('Include Logo', 'லோகோவை சேர்க்கவும்')}
          </span>
          <button
            onClick={() => handleChange('logoEnabled', !settings.logoEnabled)}
            disabled={!canAccess}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
              settings.logoEnabled ? 'bg-primary-600' : 'bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.logoEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {settings.logoEnabled && (
          <InputGroup label={t('Logo Size (%)', 'லோகோ அளவு (%)')}>
            <div className="space-y-2">
              <input
                type="range"
                min="20"
                max="40"
                value={settings.logoSize}
                onChange={(e) => handleChange('logoSize', Number(e.target.value))}
                disabled={!canAccess}
                className="w-full accent-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>20%</span>
                <span className="font-semibold text-primary-600">{settings.logoSize}%</span>
                <span>40%</span>
              </div>
            </div>
          </InputGroup>
        )}
      </Section>

      {/* Frame Settings */}
      <Section title={t('Frame', 'சட்டம்')}>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-xs sm:text-sm text-gray-700">
            {t('Show Frame Text', 'சட்ட உரையை காட்டு')}
          </span>
          <button
            onClick={() => handleChange('frameEnabled', !settings.frameEnabled)}
            disabled={!canAccess}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
              settings.frameEnabled ? 'bg-primary-600' : 'bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.frameEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {settings.frameEnabled && (
          <>
            <InputGroup label={t('Frame Text (English)', 'சட்ட உரை (ஆங்கிலம்)')}>
              <input
                type="text"
                value={settings.frameText}
                onChange={(e) => handleChange('frameText', e.target.value)}
                disabled={!canAccess}
                placeholder="Scan to view our menu"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </InputGroup>

            <InputGroup label={t('Frame Text (Tamil)', 'சட்ட உரை (தமிழ்)')}>
              <input
                type="text"
                value={settings.frameTextTamil || ''}
                onChange={(e) => handleChange('frameTextTamil', e.target.value)}
                disabled={!canAccess}
                placeholder="எங்கள் மெனுவைப் பார்க்க ஸ்கேன் செய்யவும்"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </InputGroup>
          </>
        )}
      </Section>

      {/* Additional Options */}
      <Section title={t('Additional Options', 'கூடுதல் விருப்பங்கள்')}>
        <div className="flex items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-3">
          <div className="flex-1">
            <span className="text-xs sm:text-sm font-medium text-gray-700 block">
              {t('Include Margin', 'விளிம்பை சேர்க்கவும்')}
            </span>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('Quiet zone around QR', 'QR சுற்றி இடம்')}
            </p>
          </div>
          <button
            onClick={() => handleChange('includeMargin', !settings.includeMargin)}
            disabled={!canAccess}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
              settings.includeMargin ? 'bg-primary-600' : 'bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.includeMargin ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </Section>

      {!canAccess && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs sm:text-sm text-yellow-800">
            {t(
              '⚠️ Upgrade to customize QR settings',
              '⚠️ QR அமைப்புகளை தனிப்பயனாக்க மேம்படுத்தவும்'
            )}
          </p>
        </div>
      )}
    </div>
  );
}