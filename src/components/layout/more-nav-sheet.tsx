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
    View
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
    
    const profileLink = { href: '/profile', label: 'ملفي الشخصي', icon: UserCircle2, requiresAuth: true };

    const NavLink = ({ href, label, icon: Icon, requiresAuth }: { href: string; label: string; icon: React.ElementType, requiresAuth?: boolean }) => {
        const isDisabled = requiresAuth && !user;
        return (
            <Link
                key={href}
                href={isDisabled ? '#' : href}
                onClick={!isDisabled ? onClose : (e) => e.preventDefault()}
                className={cn(
                    'flex items-center gap-4 text-base font-medium transition-colors hover:text-primary px-3 py-3 rounded-md',
                    pathname === href // Use exact match for active state
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
                </SheetHeader>
                <nav className="flex flex-col space-y-1 p-4">
                    {user && (
                         <Link href="/profile" onClick={onClose} className="flex items-center gap-3 rounded-lg p-3 mb-4 bg-muted/50 hover:bg-muted transition-colors">
                            <Avatar className="h-12 w-12 border-2 border-primary/50">
                                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-bold text-base">{user.displayName}</span>
                                <span className="text-sm text-muted-foreground">عرض الملف الشخصي</span>
                            </div>
                        </Link>
                    )}

                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">التنقل الرئيسي</h3>
                    {mainNavLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                     {!user && <NavLink {...profileLink} />}

                    <Separator className="my-4" />

                    <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">استكشف المنصة</h3>
                    {allNavLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
