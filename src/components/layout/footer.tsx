'use client';

import { Globe, Download, AppWindow, Languages } from 'lucide-react';
import Logo from '../logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const sitemapLinks = {
  platform: [
    { href: '/mission', label: 'رسالتنا' },
    { href: '/privacy-policy', label: 'سياسة الخصوصية' },
    { href: '/terms-of-service', label: 'شروط الخدمة' },
  ],
  journey: [
    { href: '/journey-of-certainty', label: 'خارطة طريق اليقين' },
    { href: '/god-certainty', label: 'اليقين بالله' },
    { href: '/blessings-and-signs', label: 'النعم والآيات' },
    { href: '/cosmic-signs', label: 'البلاغ والإنذار' },
    { href: '/self-guidance', label: 'الإرشاد الذاتي' },
    { href: '/mahdi', label: 'المهدي' },
  ],
  engagement: [
      { href: '/stories', label: 'قصص النجاح' },
      { href: '/practical-activities', label: 'أنشطة عملية' },
      { href: '/library', label: 'المكتبة' },
      { href: '/community', label: 'المجتمع' },
      { href: '/vr-journeys', label: 'رحلات VR' },
      { href: '/external-resources', label: 'مصادر خارجية' },
  ]
};

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
  
  const handleDownloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.body;
    const opt = {
      margin:       0.5,
      filename:     'eye-of-certainty.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  }

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="flex flex-col items-start space-y-4 lg:w-1/4">
                <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-xl">عين اليقين</span>
                </Link>
                <div className="flex items-center gap-2 flex-wrap">
                    {deferredPrompt && (
                    <Button onClick={handleInstallClick} variant="outline" size="sm">
                        <AppWindow className="ml-2 h-4 w-4" />
                        تثبيت التطبيق
                    </Button>
                    )}
                    <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                        <Download className="ml-2 h-4 w-4" />
                        تحميل PDF
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Globe className="ml-2 h-4 w-4" />
                            اللغة
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                        <DropdownMenuItem>
                            <Languages className="mr-2 h-4 w-4" />
                            <span>العربية</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <Languages className="mr-2 h-4 w-4" />
                            <span>English (soon)</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-headline font-semibold text-lg mb-4">المنصة</h3>
                    <ul className="space-y-3">
                        {sitemapLinks.platform.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-headline font-semibold text-lg mb-4">رحلة اليقين</h3>
                    <ul className="space-y-3">
                        {sitemapLinks.journey.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-headline font-semibold text-lg mb-4">التفاعل والمصادر</h3>
                    <ul className="space-y-3">
                        {sitemapLinks.engagement.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
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
