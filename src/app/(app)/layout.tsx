import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatAssistant from '@/components/assistant/chat-assistant';
import BottomNavBar from '@/components/layout/bottom-nav-bar';
import { MoreNavSheet } from '@/components/layout/more-nav-sheet';
import ScrollToTop from '@/components/scroll-to-top';
import SettingsSidebar from '@/components/layout/settings-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SettingsSidebar />
      <div className="flex-1 pb-16 lg:pb-0">{children}</div>
      <Footer />
      <ChatAssistant />
      <BottomNavBar />
      <MoreNavSheet />
      <ScrollToTop />
    </div>
  );
}
