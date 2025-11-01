import { useEffect, useRef } from 'react';
import QRCodeStyling, { 
  Options, 
  DotType, 
  CornerSquareType, 
  CornerDotType 
} from 'qr-code-styling';
import { QRCodeSettings } from '@/types/dashboard.types';

interface QRCodeGeneratorProps {
  url: string;
  settings: QRCodeSettings;
  logoUrl?: string;
}

export default function QRCodeGenerator({ url, settings, logoUrl }: QRCodeGeneratorProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    // Clear previous QR code
    qrCodeRef.current.innerHTML = '';

    // Map our style names to QR Code Styling types
    const getDotsType = (style: string): DotType => {
      switch (style) {
        case 'dots': return 'dots';
        case 'rounded': return 'rounded';
        default: return 'square';
      }
    };

    const getCornerSquareType = (style: string): CornerSquareType => {
      switch (style) {
        case 'rounded': return 'extra-rounded';
        default: return 'square';
      }
    };

    const getCornerDotType = (style: string): CornerDotType => {
      switch (style) {
        case 'dots': return 'dot';
        default: return 'square';
      }
    };

    // Use responsive size - max 280px for mobile
    const responsiveSize = Math.min(settings.size, 280);

    // Configure QR code options with proper typing
    const qrOptions: Options = {
      width: responsiveSize,
      height: responsiveSize,
      data: url,
      margin: settings.includeMargin ? 10 : 0,
      qrOptions: {
        errorCorrectionLevel: settings.errorCorrectionLevel,
      },
      dotsOptions: {
        color: settings.fgColor,
        type: getDotsType(settings.style),
      },
      backgroundOptions: {
        color: settings.bgColor,
      },
      cornersSquareOptions: {
        color: settings.fgColor,
        type: getCornerSquareType(settings.style),
      },
      cornersDotOptions: {
        color: settings.fgColor,
        type: getCornerDotType(settings.style),
      },
    };

    // Only add image options if logo is enabled AND logoUrl exists
    if (settings.logoEnabled && logoUrl) {
      qrOptions.image = logoUrl;
      qrOptions.imageOptions = {
        hideBackgroundDots: true,
        imageSize: settings.logoSize / 100,
        margin: 5,
      };
    } else {
      // Explicitly remove image when logo is disabled
      qrOptions.image = undefined;
      qrOptions.imageOptions = {
        hideBackgroundDots: false,
        imageSize: 0,
        margin: 0,
      };
    }

    // Create new QR code instance
    qrCodeInstance.current = new QRCodeStyling(qrOptions);
    qrCodeInstance.current.append(qrCodeRef.current);
  }, [url, settings, logoUrl]);

  return (
    <div 
      ref={qrCodeRef} 
      className="flex items-center justify-center w-full max-w-full"
    />
  );
}