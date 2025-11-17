'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Users, Library, UserCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/journey-of-certainty', label: 'رحلة اليقين', icon: Map },
  { href: '/community', label: 'المجتمع', icon: Users },
  { href: '/library', label: 'المكتبة', icon: Library },
  { href: '/profile', label: 'ملفي', icon: UserCircle2, requiresAuth: true },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t lg:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <TooltipProvider>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.requiresAuth && !user) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <div className="inline-flex flex-col items-center justify-center px-5 text-gray-400 cursor-not-allowed">
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>سجل الدخول لعرض ملفك الشخصي</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'inline-flex flex-col items-center justify-center px-5 hover:bg-muted group',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
