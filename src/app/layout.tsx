import type { Metadata, Viewport } from 'next';
import { Alegreya, Cairo } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase';
import ChatAssistant from '@/components/assistant/chat-assistant';
import BottomNavBar from '@/components/layout/bottom-nav-bar';
import { MoreNavSheet } from '@/components/layout/more-nav-sheet';
import App from './main';
import { LanguageProvider } from '@/lib/i18n/provider';
import ScrollToTop from '@/components/scroll-to-top';

const APP_NAME = "Ain Al-Yaqin";
const APP_DEFAULT_TITLE = "Ain Al-Yaqin - Your Journey to Certainty";
const APP_TITLE_TEMPLATE = "%s | Ain Al-Yaqin";
const APP_DESCRIPTION = "A global dawah platform to know God, understand the meaning of 'La ilaha illa Allah', and embark on a personal journey to achieve the 'Eye of Certainty' (Ayn al-Yaqin).";
const APP_KEYWORDS = [
    "القرآن الكريم", "التوحيد", "الإيمان", "اليقين بالله", "رحلة اليقين", "الإرشاد الديني", "الإسلام",
    "معنى الحياة", "قصص نجاح", "الدعوة الإسلامية", "محمد صلى الله عليه وسلم", "الله", "لا إله إلا الله",
    "God", "Certainty", "Faith", "Islamic Guidance", "Monotheism", "Tawhid",
    "Journey of Certainty", "Meaning of Life", "Dawah", "Spiritual Journey", "Ayn al-Yaqin", "Islam"
];

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A192F', // Dark mode color
  colorScheme: 'dark light',
};


const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <App />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          cairo.variable,
          alegreya.variable
        )}
      >
        <FirebaseClientProvider>
          <LanguageProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1 pb-20">{children}</main>
              <Footer />
              <BottomNavBar />
              <MoreNavSheet />
              <ScrollToTop />
            </div>
            <ChatAssistant />
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
