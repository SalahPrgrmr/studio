'use client';

import { Globe, Download, AppWindow, Home, Mail, Target } from 'lucide-react';
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
import { useLanguage, languages } from '@/lib/i18n/provider';
import type { Language } from '@/lib/i18n/settings';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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
    { href: '/', labelKey: 'header.links.home', icon: Home },
    { href: '/mission', labelKey: 'footer.links.mission' },
    { href: '/why-us', labelKey: 'footer.links.whyUs' },
    { href: '/contact', labelKey: 'header.links.contact', icon: Mail },
    { href: '/privacy-policy', labelKey: 'footer.links.privacy' },
    { href: '/terms-of-service', labelKey: 'footer.links.terms' },
  ],
  journey: [
    { href: '/journey-of-certainty', labelKey: 'footer.links.journeyMap' },
    { href: '/god-certainty', labelKey: 'footer.links.godCertainty' },
    { href: '/blessings-and-signs', labelKey: 'footer.links.blessings' },
    { href: '/cosmic-signs', labelKey: 'footer.links.cosmicSigns' },
    { href: '/self-guidance', labelKey: 'footer.links.selfGuidance' },
    { href: '/mahdi', labelKey: 'footer.links.mahdi' },
  ],
  engagement: [
      { href: '/stories', labelKey: 'footer.links.stories' },
      { href: '/practical-activities', labelKey: 'footer.links.activities' },
      { href: '/library', labelKey: 'footer.links.library' },
      { href: '/community', labelKey: 'footer.links.community' },
      { href: '/vr-journeys', labelKey: 'footer.links.vrJourneys' },
      { href: '/external-resources', labelKey: 'footer.links.externalResources' },
  ]
};

export default function Footer() {
  const { t, language, setLanguage, getDirection } = useLanguage();
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
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Temporarily hide elements that shouldn't be in the PDF
    const elementsToHide = document.querySelectorAll('.no-pdf');
    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');
    
    html2pdf().from(element).set(opt).save().then(() => {
        // Show elements again after PDF generation
        elementsToHide.forEach(el => (el as HTMLElement).style.display = '');
    });
  }
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
  };

  return (
    <footer className="bg-card border-t mt-12 no-pdf">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16">
            <div className="flex flex-col items-start space-y-4">
                <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-xl">{t('appName')}</span>
                </Link>
                <div className="flex items-center gap-2 flex-wrap">
                    {deferredPrompt && (
                    <Button onClick={handleInstallClick} variant="outline" size="sm">
                        <AppWindow className="ml-2 h-4 w-4" />
                        {t('footer.installApp')}
                    </Button>
                    )}
                    <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                        <Download className="ml-2 h-4 w-4" />
                        {t('footer.downloadPdf')}
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Globe className="ml-2 h-4 w-4" />
                            {t('footer.language')}
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                        {languages.map((lang) => (
                           <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                             {lang.icon}
                             <span>{lang.name}</span>
                           </DropdownMenuItem>
                         ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-headline font-semibold text-lg mb-4">{t('footer.headings.platform')}</h3>
                    <ul className="space-y-3">
                        {sitemapLinks.platform.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                                    {link.icon && <link.icon className="h-4 w-4" />}
                                    {t(link.labelKey)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-headline font-semibold text-lg mb-4">{t('footer.headings.journey')}</h3>
                    <ul className="space-y-3">
                        {sitemapLinks.journey.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    {t(link.labelKey)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-headline font-semibold text-lg mb-4">{t('footer.headings.engagement')}</h3>
                    <ul className="space-y-3">
                        {sitemapLinks.engagement.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    {t(link.labelKey)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <Separator className="my-12" />

        <Card className="bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary font-headline">
                    <Target className="h-6 w-6" />
                    تذكير بالغاية الأساسية
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
                <p>
                    إلى جميع الأعضاء والشركاء والمتطوعين والزوار: نذكركم بأن تكون جميع أعمالكم خالصة لله وحده، ومخصصة لهدفنا الأسمى وهو "لا إله إلا الله".
                </p>
                <p className="font-semibold">
                    لا تشتتوا جهودكم أو تميلوا عن هذا الهدف. إن كانت هناك أمور أخرى مهمة، فهناك منصات أخرى لها. شعارنا هو الاختصار، السهولة، والوضوح، فخير الكلام ما قل ودل في كل ما نقدمه.
                </p>
            </CardContent>
        </Card>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
            <Globe className="h-4 w-4" />
            <span>{t('footer.respectMessage')}</span>
          </div>
          <span>
            &copy; {new Date().getFullYear()} {t('appName')}. {t('footer.rightsReserved')}.
          </span>
        </div>
      </div>
    </footer>
  );
}
