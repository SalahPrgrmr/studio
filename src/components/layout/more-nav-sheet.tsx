'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { create } from 'zustand';
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from '@/components/ui/sheet';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import {
    BookOpen,
    Globe,
    Heart,
    Map,
    Library,
    Users,
    UserCircle2,
    Home,
    Target,
    ShieldCheck,
    Eye,
    AlertTriangle,
    HeartHandshake,
    Sparkles,
    Waypoints,
    Activity,
    View
} from 'lucide-react';
import { useUser } from '@/firebase';

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
    { href: '/profile', label: 'ملفي', icon: UserCircle2, requiresAuth: true },
];

const allNavLinks = [
  { href: '/mission', label: 'رسالتنا', icon: Target },
  { href: '/god-certainty', label: 'اليقين بالله', icon: ShieldCheck },
  { href: '/blessings-and-signs', label: 'النعم والآيات', icon: Eye },
  { href: '/cosmic-signs', label: 'البلاغ والإنذار', icon: AlertTriangle },
  { href: '/stories', label: 'قصص النجاح', icon: HeartHandshake },
  { href: '/self-guidance', label: 'الإرشاد الذاتي', icon: Sparkles },
  { href: '/mahdi', label: 'المهدي', icon: Waypoints },
  { href: '/practical-activities', label: 'أنشطة عملية', icon: Activity },
  { href: '/vr-journeys', label: 'رحلات VR', icon: View },
  { href: '/external-resources', label: 'مصادر خارجية', icon: Globe },
];

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
                    'flex items-center gap-4 text-lg font-medium transition-colors hover:text-primary px-3 py-3 rounded-md',
                    pathname.startsWith(href)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground',
                    isDisabled && 'text-muted-foreground cursor-not-allowed opacity-50'
                )}
            >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-full max-w-sm">
                <SheetHeader className="mb-6">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center space-x-2"
                    >
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline text-xl">
                            عين اليقين
                        </span>
                    </Link>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                    <h3 className="px-3 text-sm font-semibold text-muted-foreground">الرئيسية</h3>
                    {mainNavLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                    <div className="pt-4">
                         <h3 className="px-3 text-sm font-semibold text-muted-foreground">جميع الصفحات</h3>
                    </div>
                    {allNavLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
