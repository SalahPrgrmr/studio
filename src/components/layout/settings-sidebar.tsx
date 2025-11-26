
'use client';

import { useState, useEffect } from 'react';
import { Settings, Palette, Globe, Sun, Moon, ArrowLeftRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage, languages } from '@/lib/i18n/provider';
import type { Language, Direction } from '@/lib/i18n/settings';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Label } from '../ui/label';

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
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const { language, setLanguage, getDirection } = useLanguage();
  const [isLtr, setIsLtr] = useState(getDirection(language) === 'ltr');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedMode = (localStorage.getItem('mode') as 'light' | 'dark') || 'dark';
    setCurrentTheme(savedTheme);
    setMode(savedMode);
  }, []);

  useEffect(() => {
    const body = document.body;
    themes.forEach(theme => {
        body.classList.remove(`theme-${theme.name}`);
    });
    if (currentTheme !== 'default') {
      body.classList.add(`theme-${currentTheme}`);
    }
    localStorage.setItem('theme', currentTheme);

    body.classList.remove('light', 'dark');
    body.classList.add(mode);
    localStorage.setItem('mode', mode);
  }, [currentTheme, mode]);
  
  useEffect(() => {
    setIsLtr(getDirection(language) === 'ltr');
  }, [language, getDirection]);

  const handleLanguageChange = (langCode: string) => {
    const newLang = langCode as Language;
    setLanguage(newLang);
    const newDir = getDirection(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newDir;
    setIsLtr(newDir === 'ltr');
  };

  const handleDirectionChange = (checked: boolean) => {
    const isChecked = Boolean(checked);
    const newDir: Direction = isChecked ? 'ltr' : 'rtl';
    setIsLtr(isChecked);
    document.documentElement.dir = newDir;

    const newLang = languages.find(l => l.dir === newDir);
    if (newLang && newLang.code !== language) {
        setLanguage(newLang.code);
        document.documentElement.lang = newLang.code;
        localStorage.setItem('language', newLang.code);
    }
  }
  
  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }

  const directionClasses = isLtr ? {
    container: 'right-0',
    panel: 'right-12'
  } : {
    container: 'left-0',
    panel: 'left-12'
  };
  
  return (
    <div className={cn("fixed top-1/2 -translate-y-1/2 z-[60] no-pdf", directionClasses.container)}>
      <Button
        onClick={() => setIsPanelOpen(p => !p)}
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 bg-card border p-2 shadow-lg transition-transform hover:scale-110",
           isLtr ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
        )}
      >
        <Settings className="h-6 w-6 text-primary group-hover:animate-spin-slow" />
        <span className="sr-only">Settings</span>
      </Button>

      {isPanelOpen && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            directionClasses.panel,
          )}
        >
          <Card className="w-72 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <CardHeader className='relative'>
              <CardTitle className="font-headline">تخصيص الواجهة</CardTitle>
              <Button variant="ghost" size="icon" className={cn("absolute top-3 h-7 w-7", isLtr ? 'left-3' : 'right-3')} onClick={() => setIsPanelOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Palette className="h-4 w-4" />
                  الألوان
                </h4>
                <div className="grid grid-cols-7 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => setCurrentTheme(theme.name)}
                      className={cn(
                        'h-7 w-7 rounded-full border-2 transition-transform hover:scale-110',
                        currentTheme === theme.name ? 'border-primary' : 'border-muted'
                      )}
                      style={{ backgroundColor: theme.color }}
                      aria-label={`Theme ${theme.name}`}
                    />
                  ))}
                </div>
                <Button onClick={toggleMode} variant="outline" size="sm" className="w-full mt-4">
                    {mode === 'light' ? <Moon className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" /> : <Sun className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />}
                    {mode === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  اللغة
                </h4>
                <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر لغة" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                  <Checkbox id="ltr-mode" checked={isLtr} onCheckedChange={handleDirectionChange} />
                                  <Label htmlFor="ltr-mode" className="flex items-center gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    LTR <ArrowLeftRight className="h-3 w-3" />
                                  </Label>
                              </div>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>هذا الخيار يجعل الموقع مناسب للغة الإنجليزية (من اليسار لليمين)</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>

              </div>

              <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm text-muted-foreground">
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
