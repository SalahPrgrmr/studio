import type { Metadata } from 'next';
import { Alegreya, Cairo } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase';
import ChatAssistant from '@/components/assistant/chat-assistant';
import BottomNavBar from '@/components/layout/bottom-nav-bar';

export const metadata: Metadata = {
  title: 'Eye of Certainty',
  description:
    'A global dawah platform aimed at introducing God and the concept of "La ilaha illa Allah" (There is no god but Allah) to reach the state of "Ayn al-Yaqin" (the Eye of Certainty).',
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
            <main className="flex-1 pb-20">{children}</main>
            <Footer />
            <BottomNavBar />
          </div>
          <ChatAssistant />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
