'use client';

import { useState, useEffect } from 'react';
import { Eye, Settings, Palette, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage, languages } from '@/lib/i18n/provider';
import type { Language } from '@/lib/i18n/settings';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const themes = [
  { name: 'default', color: 'hsl(204 88% 53%)' },
  { name: 'forest', color: 'hsl(158 75% 44%)' },
  { name: 'ocean', color: 'hsl(205 90% 50%)' },
  { name: 'sunset', color: 'hsl(25 95% 55%)' },
  { name: 'rose', color: 'hsl(340 90% 65%)' },
  { name: 'lavender', color: 'hsl(260 85% 70%)' },
  { name: 'slate', color: 'hsl(220 70% 65%)' },
  { name: 'sand', color: 'hsl(40 80% 55%)' },
  { name: 'emerald', color: 'hsl(150 70% 45%)' },
  { name: 'amethyst', color: 'hsl(280 80% 65%)' },
  { name: 'ruby', color: 'hsl(0 85% 60%)' },
  { name: 'topaz', color: 'hsl(175 80% 45%)' },
  { name: 'onyx', color: 'hsl(240 10% 80%)' },
];

const socialLinks = [
    { 
        name: "Facebook", 
        href: "#", 
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg> 
    },
    { 
        name: "X", 
        href: "#", 
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    },
    { 
        name: "YouTube", 
        href: "#", 
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
    },
    {
        name: "Telegram",
        href: "#",
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0C5.338 0 0 5.338 0 11.944c0 6.606 5.338 11.944 11.944 11.944 6.606 0 11.944-5.338 11.944-11.944C23.888 5.338 18.55 0 11.944 0zM17.153 8.399c-.114 1.424-.623 4.67-1.002 6.786-.412 2.301-1.183 3.064-2.053 3.088-.84.023-1.472-.572-2.316-1.148-1.373-.938-2.13-1.52-3.41-2.434-1.437-1.028-.516-1.595.316-2.502.21-.228 3.895-3.568 3.895-3.568s.352-.335-.125-.034c-.477.301-1.638 1.04-2.292 1.46-1.46.938-2.053 1.25-2.897 1.226-.844-.024-1.92-1.04-1.92-1.04s-.375-.166.188-.415c.563-.25 1.542-.64 2.292-.89 1.5-.5 2.735-.75 3.578-.75.75 0 1.275.167 1.638.416.362.25.437.915.412 1.52z"/></svg>
    },
];

export default function SettingsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const { language, setLanguage, getDirection } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedMode = (localStorage.getItem('mode') as 'light' | 'dark') || 'dark';
    setCurrentTheme(savedTheme);
    setMode(savedMode);
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.remove(...themes.map(t => `theme-${t.name}`));
    if (currentTheme !== 'default') {
      body.classList.add(`theme-${currentTheme}`);
    }
    localStorage.setItem('theme', currentTheme);

    body.classList.remove('light', 'dark');
    body.classList.add(mode);
    localStorage.setItem('mode', mode);
  }, [currentTheme, mode]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
  };
  
  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }

  const sidebarDir = getDirection(language) === 'rtl' ? 'left-0' : 'right-0';
  const sidebarTransform = getDirection(language) === 'rtl'
    ? (isOpen ? 'translate-x-0' : '-translate-x-full')
    : (isOpen ? 'translate-x-0' : 'translate-x-full');
  
  const triggerDir = getDirection(language) === 'rtl' ? 'left-0' : 'right-0';
  const triggerTransform = getDirection(language) === 'rtl'
    ? (isOpen ? 'translate-x-72' : 'translate-x-0')
    : (isOpen ? '-translate-x-72' : 'translate-x-0');


  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 z-[60] no-pdf"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
            "absolute top-1/2 -translate-y-1/2 bg-card border-y border-r rtl:border-r-0 rtl:border-l p-2 rounded-l-lg rtl:rounded-l-none rtl:rounded-r-lg shadow-lg transition-transform duration-300 ease-in-out",
            triggerDir,
            triggerTransform
        )}
      >
        <Settings className="h-6 w-6 animate-spin-slow" />
        <span className="sr-only">Settings</span>
      </button>

      <div
        className={cn(
            "fixed top-0 h-full w-72 bg-card border-r rtl:border-r-0 rtl:border-l shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
            sidebarDir,
            sidebarTransform
        )}
      >
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-3 font-headline">
            <Eye className="h-6 w-6" />
            تخصيص الواجهة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-6 overflow-y-auto flex-1">
          {/* Theme Section */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              الألوان
            </h4>
            <div className="grid grid-cols-7 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setCurrentTheme(theme.name)}
                  className={cn(
                    'h-8 w-8 rounded-full border-2 transition-transform hover:scale-110',
                    currentTheme === theme.name ? 'border-primary' : 'border-muted'
                  )}
                  style={{ backgroundColor: theme.color }}
                  aria-label={`Theme ${theme.name}`}
                />
              ))}
            </div>
             <Button onClick={toggleMode} variant="outline" className="w-full mt-4">
                {mode === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                {mode === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
            </Button>
          </div>

          {/* Language Section */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              اللغة
            </h4>
            <div className="space-y-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="w-6 h-6 mr-2 flex items-center justify-center font-bold">{lang.icon}</span>
                  <span>{lang.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <div className="border-t p-4">
            <h4 className="font-semibold mb-3 text-sm text-center text-muted-foreground">
              تابعنا
            </h4>
            <div className="flex justify-center gap-4">
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
    </div>
  );
}