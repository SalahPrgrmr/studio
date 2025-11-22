'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Settings, BarChart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Logo from '@/components/logo';

const navItems = [
  { href: '/admin', label: 'لوحة التحكم', icon: Home },
  { href: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
  { href: '/admin/content', label: 'إدارة المحتوى', icon: FileText },
  { href: '/admin/reports', label: 'التقارير', icon: BarChart },
  { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-14 flex-col border-l bg-background sm:flex no-pdf rtl:border-l-0 rtl:border-r">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">عين اليقين</span>
        </Link>
        <TooltipProvider>
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                        isActive && 'bg-accent text-accent-foreground',
                        (item.href === '/admin/content' || item.href === '/admin/reports' || item.href === '/admin/settings') && 'opacity-50 cursor-not-allowed'
                        )}
                        onClick={(e) => (item.href === '/admin/content' || item.href === '/admin/reports' || item.href === '/admin/settings') && e.preventDefault()}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        {item.label}
                        {(item.href === '/admin/content' || item.href === '/admin/reports' || item.href === '/admin/settings') && ' (قريبًا)'}
                    </TooltipContent>
                </Tooltip>
                );
            })}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link href="/">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">خروج للرئيسية</span>
                    </Button>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="left">العودة للموقع</TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
