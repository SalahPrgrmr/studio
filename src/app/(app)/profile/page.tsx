'use client';

import { useEffect } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Loader2, User, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import type { UserProfile } from '@/lib/types';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !userProfile) {
    // This can happen briefly before redirect, or if the doc doesn't exist
    return (
        <div className="flex h-screen items-center justify-center">
             <Card className="mx-auto w-full max-w-sm text-center">
                <CardHeader>
                    <CardTitle>خطأ</CardTitle>
                    <CardDescription>لم يتم العثور على بيانات الملف الشخصي. الرجاء تسجيل الدخول مرة أخرى.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/login">تسجيل الدخول</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <Card className="shadow-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
            <AvatarImage src={userProfile.photoURL || ''} alt={userProfile.displayName} />
            <AvatarFallback className="text-3xl">
              {userProfile.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-3xl">{userProfile.displayName}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">{userProfile.email}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 border-t pt-6">
           <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center">
                    <Mail className="h-5 w-5 ml-3 text-primary"/>
                    <span>{userProfile.email}</span>
                </div>
                 <div className="flex items-center">
                    <Calendar className="h-5 w-5 ml-3 text-primary"/>
                    <span>عضو منذ: {format(new Date(userProfile.createdAt), 'd MMMM, yyyy')}</span>
                </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
