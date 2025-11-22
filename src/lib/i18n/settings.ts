import { ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'fr' | 'es' | 'ur';
export type Direction = 'ltr' | 'rtl';

export interface LanguageConfig {
    code: Language;
    name: string;
    dir: Direction;
    icon: ReactNode;
}

export const defaultLanguage: Language = 'ar';
