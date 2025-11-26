'use client';

import { Globe, Download, AppWindow, Home, Mail, Target, Share2 } from 'lucide-react';
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
    { href: '/faq', labelKey: 'footer.links.faq' },
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
      { href: '/share-center', labelKey: 'footer.links.shareCenter' },
      { href: '/vr-journeys', labelKey: 'footer.links.vrJourneys' },
      { href: '/external-resources', labelKey: 'footer.links.externalResources' },
  ]
};

const socialLinks = [
    { 
        name: "Facebook", 
        href: "#", 
        icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg> 
    },
    { 
        name: "X", 
        href: "#", 
        icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    },
    { 
        name: "Instagram", 
        href: "#", 
        icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>
    },
    { 
        name: "YouTube", 
        href: "#", 
        icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
    },
    {
        name: "Telegram",
        href: "#",
        icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0C5.338 0 0 5.338 0 11.944c0 6.606 5.338 11.944 11.944 11.944 6.606 0 11.944-5.338 11.944-11.944C23.888 5.338 18.55 0 11.944 0zM17.153 8.399c-.114 1.424-.623 4.67-1.002 6.786-.412 2.301-1.183 3.064-2.053 3.088-.84.023-1.472-.572-2.316-1.148-1.373-.938-2.13-1.52-3.41-2.434-1.437-1.028-.516-1.595.316-2.502.21-.228 3.895-3.568 3.895-3.568s.352-.335-.125-.034c-.477.301-1.638 1.04-2.292 1.46-1.46.938-2.053 1.25-2.897 1.226-.844-.024-1.92-1.04-1.92-1.04s-.375-.166.188-.415c.563-.25 1.542-.64 2.292-.89 1.5-.5 2.735-.75 3.578-.75.75 0 1.275.167 1.638.416.362.25.437.915.412 1.52z"/></svg>
    },
    {
        name: "WhatsApp",
        href: "#",
        icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 0C5.43 0 0 5.422 0 12.028c0 2.13.56 4.14 1.59 5.892L0 24l6.23-1.56c1.69.952 3.63 1.47 5.68 1.47 6.7 0 12.13-5.423 12.13-12.03 0-6.6-5.43-12.028-12.13-12.028zm5.23 15.63c-.22.45-.84.85-1.52.98-.52.1-1.14.15-3.32-.73-2.6-1.05-4.3-3.6-4.44-3.78-.13-.18-.9-1.2-.9-2.2s.53-1.5.7-1.7c.18-.2.37-.25.52-.25.15 0 .28 0 .4-.02.13 0 .3-.05.47.3.2.35.68.88.75 1 .05.1.1.2.03.3-.08.1-.15.18-.3.3-.12.1-.24.23-.35.35-.12.1-.24.25-.12.48.14.28.65 1.15 1.4 1.86.9.85 1.72 1.1 2 1.2.3.1.45.1.6-.05.16-.16.5-1.78.68-2.1.18-.3.35-.25.58-.15.22.1.9.44 1.05.5.15.1.25.15.3.25.04.1.02.53-.2 1z" /></svg>
    },
];

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
                 <div className="space-y-2 pt-4">
                    <h4 className="font-semibold text-sm text-muted-foreground">تابعنا وساهم في النشر</h4>
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors">
                                {social.icon}
                                <span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>
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
