'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'ar',
          includedLanguages: 'en,ar,ur,fr,de,es,tr,id,ms,ru,zh-CN,ja,hi,bn,fa',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // The script in layout.tsx will call googleTranslateElementInit
  }, []);

  return <div id="google_translate_element" className="w-full"></div>;
};

export default GoogleTranslate;
