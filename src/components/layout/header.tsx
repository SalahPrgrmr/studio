'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Languages, LogOut } from 'lucide-react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navLinks = [
  { href: '/journey-of-certainty', label: 'رحلة اليقين' },
  { href: '/god-certainty', label: 'اليقين بالله' },
  { href: '/cosmic-signs', label: 'آيات الكون' },
  { href: '/stories', label: 'قصص نجاح' },
  { href: '/self-guidance', label: 'إرشاد ذاتي' },
  { href: '/library', label: 'المكتبة' },
  { href: '/community', label: 'المجتمع' },
  { href: '/vr-journeys', label: 'رحلات VR' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="ml-4 flex items-center">
          <Link href="/" className="ml-2 flex items-center justify-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline inline-block text-lg">
              مسار اليقين
            </span>
          </Link>
        </div>
        <nav className="flex-1 items-center space-x-1 hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md',
                pathname.startsWith(link.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end space-x-reverse space-x-2 md:space-x-4 flex-1 md:flex-initial">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">تغيير اللغة</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Languages className="ml-2 h-4 w-4" />
                <span>العربية</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Languages className="ml-2 h-4 w-4" />
                <span>English (قريبًا)</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Languages className="ml-2 h-4 w-4" />
                <span>Español (قريبًا)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <span className="font-medium">{user.displayName || 'مستخدم'}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
