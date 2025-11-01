import { useState, useRef } from "react";
import {
  Download,
  Printer,
  Copy,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Restaurant,
  QRCodeSettings,
  DEFAULT_QR_SETTINGS,
} from "@/types/dashboard.types";
import Button from "@components/ui/Button";
import QRCodeGenerator from "@components/dashboard/qrcode/QRCodeGenerator";
import QRCustomizationPanel from "@components/dashboard/qrcode/QRCustomizationPanel";

interface QRCodeTabProps {
  restaurant: Restaurant;
  onUpdate?: (updates: Partial<Restaurant>) => void;
  canAccess?: boolean;
  lang: "en" | "ta";
}

export default function QRCodeTab({
  restaurant,
  onUpdate,
  canAccess = true,
  lang,
}: QRCodeTabProps) {
  const [qrSettings, setQrSettings] = useState<QRCodeSettings>(
    restaurant.qrSettings || DEFAULT_QR_SETTINGS
  );
  const [showCustomization, setShowCustomization] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const menuUrl = `https://menucraft.app/menu/${restaurant.id}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(menuUrl);
    alert(
      lang === "en" ? "URL copied to clipboard!" : "URL நகலெடுக்கப்பட்டது!"
    );
  };

  const handleDownload = () => {
    const canvas = qrContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Create download link
    const link = document.createElement("a");
    link.download = `${restaurant.name}-qrcode.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    alert(
      lang === "en" ? "QR Code downloaded!" : "QR குறியீடு பதிவிறக்கப்பட்டது!"
    );
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const canvas = qrContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const imageUrl = canvas.toDataURL("image/png");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${restaurant.name} - QR Code</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: Arial, sans-serif;
            }
            .container {
              text-align: center;
              page-break-inside: avoid;
            }
            .qr-code {
              max-width: 400px;
              margin: 20px auto;
              border: 2px solid #e5e7eb;
              border-radius: 16px;
              padding: 20px;
              background: white;
            }
            img {
              width: 100%;
              height: auto;
            }
            h1 {
              font-size: 32px;
              margin-bottom: 10px;
              color: #111827;
            }
            p {
              font-size: 18px;
              color: #6b7280;
              margin: 10px 0;
            }
            .url {
              font-size: 14px;
              color: #9ca3af;
              word-break: break-all;
              margin-top: 20px;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${restaurant.name}</h1>
            <p>${
              lang === "en"
                ? qrSettings.frameText
                : qrSettings.frameTextTamil || qrSettings.frameText
            }</p>
            <div class="qr-code">
              <img src="${imageUrl}" alt="QR Code" />
            </div>
            <p class="url">${menuUrl}</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleSaveSettings = () => {
    if (onUpdate) {
      onUpdate({ qrSettings });
      alert(
        lang === "en"
          ? "QR Code settings saved!"
          : "QR குறியீடு அமைப்புகள் சேமிக்கப்பட்டன!"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg">📱</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">
              {lang === "en"
                ? "Share Your Digital Menu"
                : "உங்கள் டிஜிட்டல் மெனுவை பகிரவும்"}
            </h3>
            <p className="text-sm text-blue-800">
              {lang === "en"
                ? "Customers can scan this QR code to instantly view your menu on their phones. Customize the design to match your brand!"
                : "வாடிக்கையாளர்கள் இந்த QR குறியீட்டை ஸ்கேன் செய்து உங்கள் மெனுவை உடனடியாக பார்க்கலாம். உங்கள் பிராண்டுக்கு ஏற்ப வடிவமைப்பை தனிப்பயனாக்குங்கள்!"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - QR Code Preview */}
        <div className="space-y-4">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8">
            {/* QR Code Container - Mobile Optimized */}
            <div
              ref={qrContainerRef}
              className="bg-white rounded-lg flex items-center justify-center p-4 sm:p-6 border-2 border-dashed border-gray-300 overflow-hidden"
              style={{ backgroundColor: qrSettings.bgColor }}
            >
              <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] mx-auto">
                <QRCodeGenerator
                  url={menuUrl}
                  settings={qrSettings}
                  logoUrl={restaurant.logoImage}
                />
                {qrSettings.frameEnabled && (
                  <div className="mt-3 sm:mt-4 text-center px-2">
                    <p
                      className="text-xs sm:text-sm font-medium break-words"
                      style={{ color: qrSettings.fgColor }}
                    >
                      {lang === "en"
                        ? qrSettings.frameText
                        : qrSettings.frameTextTamil || qrSettings.frameText}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <Button
                onClick={handleDownload}
                className="flex-1 text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                {lang === "en" ? "Download" : "பதிவிறக்கம்"}
              </Button>
              <Button
                variant="secondary"
                onClick={handlePrint}
                className="flex-1 text-sm sm:text-base"
              >
                <Printer className="w-4 h-4" />
                {lang === "en" ? "Print" : "அச்சிடு"}
              </Button>
            </div>
          </div>

          {/* Menu URL */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🔗</span>
              {lang === "en" ? "Direct Link" : "நேரடி இணைப்பு"}
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={menuUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-mono"
              />
              <Button
                variant="secondary"
                onClick={handleCopyUrl}
                size="sm"
                className="sm:w-auto"
              >
                <Copy className="w-4 h-4" />
                {lang === "en" ? "Copy" : "நகல்"}
              </Button>
            </div>
          </div>

          {/* Customization Toggle - Mobile */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowCustomization(!showCustomization)}
              variant="secondary"
              className="w-full"
            >
              <Settings className="w-4 h-4" />
              {showCustomization
                ? lang === "en"
                  ? "Hide Customization"
                  : "தனிப்பயனாக்கத்தை மறை"
                : lang === "en"
                ? "Customize QR Code"
                : "QR குறியீட்டை தனிப்பயனாக்கு"}
              {showCustomization ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Right - Customization Panel */}
        <div
          className={`${
            showCustomization ? "block" : "hidden lg:block"
          } space-y-4`}
        >
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary-600" />
                {lang === "en"
                  ? "Customize QR Code"
                  : "QR குறியீட்டை தனிப்பயனாக்கு"}
              </h3>
              {canAccess && onUpdate && (
                <Button size="sm" onClick={handleSaveSettings}>
                  {lang === "en" ? "Save" : "சேமி"}
                </Button>
              )}
            </div>

            <QRCustomizationPanel
              settings={qrSettings}
              onChange={setQrSettings}
              canAccess={canAccess}
              lang={lang}
            />
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          {lang === "en"
            ? "💡 Tips for Best Results"
            : "💡 சிறந்த முடிவுகளுக்கான குறிப்புகள்"}
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">•</span>
            <span>
              {lang === "en"
                ? "Use high error correction (H) if adding a logo for better scannability"
                : "லோகோ சேர்த்தால் அதிக பிழை திருத்தம் (H) பயன்படுத்தவும்"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">•</span>
            <span>
              {lang === "en"
                ? "Print at least 2x2 inches (5x5 cm) for easy scanning"
                : "எளிதாக ஸ்கேன் செய்ய குறைந்தது 2x2 அங்குலம் (5x5 செமீ) அச்சிடவும்"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">•</span>
            <span>
              {lang === "en"
                ? "Test the QR code with multiple phones before printing large quantities"
                : "அதிக அளவில் அச்சிடுவதற்கு முன் பல தொலைபேசிகளில் சோதிக்கவும்"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">•</span>
            <span>
              {lang === "en"
                ? "Place QR codes in well-lit areas at eye level"
                : "QR குறியீடுகளை நன்கு வெளிச்சமுள்ள பகுதிகளில் கண் மட்டத்தில் வைக்கவும்"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
