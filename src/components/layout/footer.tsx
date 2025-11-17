'use client';

import { Globe, Download, AppWindow } from 'lucide-react';
import Logo from '../logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  
  const handleDownloadPDF = () => {
    const element = document.body;
    const opt = {
      margin:       0.5,
      filename:     'eye-of-certainty.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  }

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center space-x-2 md:justify-start justify-center">
            <Logo className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline">Eye of Certainty</span>
          </div>
          
          <div className="flex justify-center items-center gap-2">
            {deferredPrompt && (
              <Button onClick={handleInstallClick} variant="outline" size="sm">
                <AppWindow className="ml-2 h-4 w-4" />
                تحميل الموقع كتطبيق
              </Button>
            )}
            <Button onClick={handleDownloadPDF} variant="outline" size="sm">
              <Download className="ml-2 h-4 w-4" />
              تحميل كملف PDF
            </Button>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              شروط الخدمة
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Globe className="h-4 w-4" />
            <span>نحن نحترم جميع الأديان والجنسيات.</span>
          </div>
          <span>
            &copy; {new Date().getFullYear()} عين اليقين. جميع الحقوق محفوظة.
          </span>
        </div>
      </div>
    </footer>
  );
}
