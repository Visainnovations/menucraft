import { QrCode } from 'lucide-react';
import { Restaurant } from '@/types/dashboard.types';
import Button from '@components/ui/Button';

interface QRCodeTabProps {
  restaurant: Restaurant;
  lang: 'en' | 'ta';
}

export default function QRCodeTab({ restaurant, lang }: QRCodeTabProps) {
  const menuUrl = `https://menucraft.app/menu/${restaurant.id}`;
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(menuUrl);
    alert(lang === 'en' ? 'URL copied to clipboard!' : 'URL நகலெடுக்கப்பட்டது!');
  };

  const handleDownload = () => {
    alert(lang === 'en' ? 'QR Code download coming soon!' : 'QR குறியீடு பதிவிறக்கம் விரைவில்!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8">
        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 mx-auto rounded-lg flex items-center justify-center mb-4">
          <QrCode className="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {lang === 'en' 
            ? 'Customers scan this QR code to view your menu' 
            : 'உங்கள் மெனுவைப் பார்க்க வாடிக்கையாளர்கள் இந்த QR குறியீட்டை ஸ்கேன் செய்யவும்'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleDownload}>
            {lang === 'en' ? 'Download QR Code' : 'QR குறியீடு பதிவிறக்கம்'}
          </Button>
          <Button variant="secondary" onClick={handlePrint}>
            {lang === 'en' ? 'Print' : 'அச்சிடு'}
          </Button>
        </div>
      </div>
      
      <div className="text-left bg-gray-50 rounded-lg p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-2">
          {lang === 'en' ? 'Menu URL' : 'மெனு URL'}
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={menuUrl}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm"
          />
          <Button variant="secondary" onClick={handleCopyUrl} className="sm:w-auto">
            {lang === 'en' ? 'Copy' : 'நகல்'}
          </Button>
        </div>
      </div>
    </div>
  );
}