import type { Metadata } from 'next';
import { Alegreya, Cairo } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase';
import ChatAssistant from '@/components/assistant/chat-assistant';

export const metadata: Metadata = {
  title: 'عين اليقين',
  description: 'منصة دعوية عالمية تهدف للتعريف بالله وبكلمة التوحيد "لا إله إلا الله" والوصول بها إلى عين اليقين.',
  manifest: '/manifest.json',
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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          cairo.variable,
          alegreya.variable
        )}
      >
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <ChatAssistant />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
