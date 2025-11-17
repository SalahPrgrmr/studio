'use client';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      wb.register();
    }
  }, []);
  return null;
};
export default App;
