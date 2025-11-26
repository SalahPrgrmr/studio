'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  User,
  Loader2,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useUser, useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const profileRef = useMemoFirebase(
    () => (firestore && user?.uid ? doc(firestore, 'users', user.uid) : null),
    [firestore, user?.uid]
  );

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(profileRef);

  const isLoading = isUserLoading || (user && !userProfile && isProfileLoading);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl text-center py-20 animate-in fade-in duration-500">
        <Card>
          <CardHeader>
            <CardTitle>يجب عليك تسجيل الدخول</CardTitle>
            <CardDescription>
              لعرض ملفك الشخصي، يرجى تسجيل الدخول أولاً.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">الذهاب إلى صفحة تسجيل الدخول</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!userProfile && !isProfileLoading) {
     return (
        <div className="flex flex-col justify-center items-center h-[60vh] gap-4 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">جاري إعداد ملفك الشخصي...</h2>
            <p className="text-muted-foreground max-w-md">
               يبدو أن هذا هو دخولك الأول. نقوم الآن بإنشاء ملفك الشخصي. قد يستغرق هذا بضع لحظات، يرجى تحديث الصفحة بعد قليل.
            </p>
        </div>
     )
  }

  if (!userProfile) return null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-8 mb-12">
        <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
          <AvatarImage src={userProfile.avatar || ''} alt={userProfile.name || 'User'} />
          <AvatarFallback className="text-4xl">
            {userProfile.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold">{userProfile.name}</h1>
          <p className="text-xl text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            {userProfile.email}
          </p>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="h-6 w-6 text-primary" />
            معلومات الحساب
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">تاريخ الإنشاء:</span>
            <span>{userProfile.created_at ? format(new Date((userProfile.created_at as any).seconds * 1000), 'd MMMM, yyyy') : 'غير متوفر'}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">حالة الحساب:</span>
            {userProfile.is_active ? (
              <span className="flex items-center gap-1 text-green-500">
                <CheckCircle className="h-5 w-5" /> نشط
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-500">
                <XCircle className="h-5 w-5" /> غير نشط
              </span>
            )}
          </div>
           <div className="flex items-center gap-2">
            <span className="font-semibold">رقم الهاتف:</span>
            <span>{userProfile.phone || 'لم يتم إضافته'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
