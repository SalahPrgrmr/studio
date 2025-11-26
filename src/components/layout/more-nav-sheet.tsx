'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { create } from 'zustand';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import {
    BookOpen,
    Globe,
    HeartHandshake,
    Map,
    Library,
    Users,
    UserCircle2,
    Home,
    Target,
    ShieldCheck,
    Eye,
    AlertTriangle,
    Sparkles,
    Waypoints,
    Activity,
    View,
    Mail,
    Lock,
    Gavel,
    HelpCircle,
    Share2
} from 'lucide-react';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

interface NavSheetState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNavSheet = create<NavSheetState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

const mainNavLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/journey-of-certainty', label: 'رحلة اليقين', icon: Map },
    { href: '/community', label: 'المجتمع', icon: Users },
    { href: '/library', label: 'المكتبة', icon: Library },
];

const sitemapLinks = {
  platform: [
    { href: '/mission', label: 'رسالتنا', icon: Target },
    { href: '/faq', label: 'الأسئلة المتكررة', icon: HelpCircle },
    { href: '/contact', label: 'تواصل معنا', icon: Mail },
    { href: '/privacy-policy', label: 'سياسة الخصوصية', icon: Lock },
    { href: '/terms-of-service', label: 'شروط الخدمة', icon: Gavel },
  ],
  journey: [
    { href: '/god-certainty', label: 'اليقين بالله', icon: ShieldCheck },
    { href: '/blessings-and-signs', label: 'النعم والآيات', icon: Eye },
    { href: '/cosmic-signs', label: 'البلاغ والإنذار', icon: AlertTriangle },
    { href: '/self-guidance', label: 'الإرشاد الذاتي', icon: Sparkles },
    { href: '/mahdi', label: 'المهدي', icon: Waypoints },
  ],
  engagement: [
      { href: '/stories', label: 'قصص النجاح', icon: HeartHandshake },
      { href: '/practical-activities', label: 'أنشطة عملية', icon: Activity },
      { href: '/share-center', label: 'مركز الدعوة الرقمية', icon: Share2 },
      { href: '/vr-journeys', label: 'رحلات VR', icon: View },
      { href: '/external-resources', label: 'مصادر خارجية', icon: Globe },
  ]
};

export function MoreNavSheet() {
    const { isOpen, onClose } = useNavSheet();
    const pathname = usePathname();
    const { user } = useUser();
    
    const NavLink = ({ href, label, icon: Icon, requiresAuth }: { href: string; label: string; icon: React.ElementType, requiresAuth?: boolean }) => {
        const isDisabled = requiresAuth && !user;
        return (
            <Link
                key={href}
                href={isDisabled ? '#' : href}
                onClick={!isDisabled ? onClose : (e) => e.preventDefault()}
                className={cn(
                    'flex items-center gap-4 text-base font-medium transition-colors hover:text-primary px-3 py-3 rounded-md',
                    pathname === href
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-primary',
                    isDisabled && 'text-muted-foreground cursor-not-allowed opacity-50'
                )}
            >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-full max-w-xs p-0 bg-background/95 backdrop-blur-sm">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle asChild>
                        <Link
                            href="/"
                            onClick={onClose}
                            className="flex items-center space-x-2 rtl:space-x-reverse"
                        >
                            <Logo className="h-6 w-6 text-primary" />
                            <span className="font-bold font-headline text-xl">
                                عين اليقين
                            </span>
                        </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        قائمة التنقل الرئيسية للموقع.
                    </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 p-4 overflow-y-auto h-[calc(100%-4.5rem)]">
                    {user && (
                         <div className="flex items-center gap-3 rounded-lg p-3 mb-2 bg-muted/50">
                            <Avatar className="h-12 w-12 border-2 border-primary/50">
                                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-bold text-base">{user.displayName}</span>
                                <span className="text-sm text-muted-foreground">مرحباً بك</span>
                            </div>
                        </div>
                    )}

                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">التنقل الرئيسي</h3>
                    {mainNavLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}

                    <Separator className="my-3" />
                    
                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">المنصة</h3>
                    {sitemapLinks.platform.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}

                    <Separator className="my-3" />

                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">رحلة اليقين</h3>
                    {sitemapLinks.journey.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}

                    <Separator className="my-3" />
                    
                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">التفاعل والمصادر</h3>
                    {sitemapLinks.engagement.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
