'use client';

import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { defaultLanguage, Language, Direction, LanguageConfig } from './settings';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import urTranslations from './locales/ur.json';
import { Languages } from 'lucide-react';

type Translations = { [key: string]: any };

const translations: Record<Language, Translations> = {
  ar: arTranslations,
  en: enTranslations,
  fr: frTranslations,
  es: esTranslations,
  ur: urTranslations,
};

export const languages: LanguageConfig[] = [
    { code: 'ar', name: 'العربية', dir: 'rtl', icon: 'AR' },
    { code: 'en', name: 'English', dir: 'ltr', icon: 'EN' },
    { code: 'fr', name: 'Français', dir: 'ltr', icon: 'FR' },
    { code: 'es', name: 'Español', dir: 'ltr', icon: 'ES' },
    { code: 'ur', name: 'اردو', dir: 'rtl', icon: 'UR' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getDirection: (lang: Language) => Direction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  
  useEffect(() => {
    // Set initial language from browser settings or localStorage if available
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && languages.some(l => l.code === savedLanguage)) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = getDirection(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
  };
  
  const getDirection = (lang: Language): Direction => {
    return languages.find(l => l.code === lang)?.dir || 'rtl';
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to default language (Arabic) if key not found
        let fallbackResult = translations[defaultLanguage];
        for (const fk of keys) {
             if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
                fallbackResult = fallbackResult[fk];
             } else {
                // If not in fallback, try English
                let enResult = translations['en'];
                for (const ek of keys) {
                    if(enResult && typeof enResult === 'object' && ek in enResult) {
                        enResult = enResult[ek];
                    } else {
                        return key; // Return the key itself if not found anywhere
                    }
                }
                return enResult as string;
             }
        }
        return fallbackResult as string;
      }
    }
    return result as string;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getDirection }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
