'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Globe,
  LogOut,
  Menu,
  User as UserIcon,
  UserCircle2,
  Mail,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useFirebase, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from 'firebase/auth';
import { useLanguage, languages } from '@/lib/i18n/provider';
import type { Language } from '@/lib/i18n/settings';

const navLinks = [
  { href: '/mission', labelKey: 'header.links.mission' },
  { href: '/journey-of-certainty', labelKey: 'header.links.journey' },
  { href: '/stories', labelKey: 'header.links.stories' },
  { href: '/community', labelKey: 'header.links.community' },
  { href: '/contact', labelKey: 'header.links.contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { auth } = useFirebase();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { t, language, setLanguage, getDirection } = useLanguage();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return <UserIcon className="h-5 w-5" />;
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const NavLink = ({ href, labelKey }: { href: string; labelKey: string }) => (
    <Link
      key={href}
      href={href}
      onClick={() => setIsSheetOpen(false)}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md',
        pathname.startsWith(href)
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground'
      )}
    >
      {t(labelKey)}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-pdf">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex items-center">
          <Link
            href="/"
            className="ml-6 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline inline-block text-lg">
              {t('appName')}
            </span>
          </Link>
           <p className="hidden md:block font-headline text-sm text-muted-foreground">
            أيا أيها الناس قولوا لا إله إلا الله تفلحون
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 items-center space-x-1 hidden lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex-1 flex justify-start">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('header.openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={getDirection(language) === 'ltr' ? 'left' : 'right'}>
              <SheetHeader>
                <Link
                  href="/"
                  onClick={() => setIsSheetOpen(false)}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">
                    {t('appName')}
                  </span>
                </Link>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mt-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center justify-end space-x-1 md:space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t('header.changeLanguage')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                  {lang.icon}
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isUserLoading ? (
            <div className="h-8 w-8 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL || ''}
                      alt={user.displayName || 'User'}
                    />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    <span>{t('header.profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('header.signOut')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/login">{t('header.signIn')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
