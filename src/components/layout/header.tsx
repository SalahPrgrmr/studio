'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Globe,
  Languages,
  LogOut,
  Menu,
  User as UserIcon,
  UserCircle2,
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
import { useFirebase } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from 'firebase/auth';

const navLinks = [
  { href: '/mission', label: 'Our Mission' },
  { href: '/journey-of-certainty', label: 'Journey of Certainty' },
  { href: '/god-certainty', label: 'Certainty in God' },
  { href: '/blessings-and-signs', label: 'Blessings & Signs' },
  { href: '/cosmic-signs', label: 'Clarion Call' },
  { href: '/stories', label: 'Success Stories' },
  { href: '/self-guidance', label: 'Self-Guidance' },
  { href: '/mahdi', label: 'The Mahdi' },
  { href: '/practical-activities', label: 'Practical Activities' },
  { href: '/library', label: 'Library' },
  { href: '/community', label: 'Community' },
  { href: '/vr-journeys', label: 'VR Journeys' },
  { href: '/external-resources', label: 'External Resources' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, auth } = useFirebase();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return <UserIcon className="h-5 w-5" />;
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
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
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex items-center">
          <Link
            href="/"
            className="mr-2 flex items-center justify-center space-x-2"
          >
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline inline-block text-lg">
              Eye of Certainty
            </span>
          </Link>
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
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link
                  href="/"
                  onClick={() => setIsSheetOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">
                    Eye of Certainty
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
                <span className="sr-only">Change Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Languages className="mr-2 h-4 w-4" />
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Languages className="mr-2 h-4 w-4" />
                <span>العربية (soon)</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Languages className="mr-2 h-4 w-4" />
                <span>Español (soon)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
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
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
