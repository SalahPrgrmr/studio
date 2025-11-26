
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  User,
  Loader2,
  Mail,
  Calendar,
  LogIn,
  Globe,
  Palette,
  Bell,
  Heart
} from 'lucide-react';
import { useUser, useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import type { UserProfile, UserSettings, UserPreferences } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  // Memoize document references
  const profileRef = useMemoFirebase(
    () => (firestore && user?.uid ? doc(firestore, 'users', user.uid) : null),
    [firestore, user?.uid]
  );
  const settingsRef = useMemoFirebase(
    () => (firestore && user?.uid ? doc(firestore, 'users', user.uid, 'settings', 'general') : null),
    [firestore, user?.uid]
  );
  const prefsRef = useMemoFirebase(
    () => (firestore && user?.uid ? doc(firestore, 'users', user.uid, 'preferences', 'main') : null),
    [firestore, user?.uid]
  );
  
  // Fetch data from all documents
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(profileRef);
  const { data: userSettings, isLoading: areSettingsLoading } = useDoc<UserSettings>(settingsRef);
  const { data: userPreferences, isLoading: arePrefsLoading } = useDoc<UserPreferences>(prefsRef);


  const isLoading = isUserLoading || isProfileLoading || areSettingsLoading || arePrefsLoading;

  if (isLoading && !userProfile) { // Show skeleton loader only on initial load
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-48 w-full" />
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
            <p className="text-muted-foreground pt-2">
              لعرض ملفك الشخصي، يرجى تسجيل الدخول أولاً.
            </p>
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

  if (!userProfile) return null; // Should not happen if loading is handled

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'غير متوفر';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return format(date, 'd MMMM, yyyy', { locale: ar });
  };
  
  const formatRelativeDate = (timestamp: any) => {
    if (!timestamp) return 'غير متوفر';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: ar });
  };


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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
            <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                معلومات الحساب
            </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 text-base">
            <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">تاريخ الإنشاء:</span>
                <span>{formatDate(userProfile.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">آخر تسجيل دخول:</span>
                <span>{formatRelativeDate(userProfile.lastLogin)}</span>
            </div>
             <div className="flex items-center gap-2">
                <span className="font-semibold">الصلاحية:</span>
                <span>{userProfile.role}</span>
            </div>
            </CardContent>
        </Card>

        <Card className="shadow-md">
            <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                الإعدادات والتفضيلات
            </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 text-base">
            {userSettings ? (
                <>
                    <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">لغة الواجهة:</span>
                        <span>{userSettings.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">السمة (Theme):</span>
                        <span>{userSettings.theme}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">الإشعارات:</span>
                        <span>{userSettings.notifications ? 'مفعل' : 'معطل'}</span>
                    </div>
                </>
            ) : <p className="text-muted-foreground text-sm">جاري تحميل الإعدادات...</p>}
            {userPreferences ? (
                 <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">المفضلات:</span>
                    <span>{userPreferences.favorites?.length || 0}</span>
                </div>
            ) : <p className="text-muted-foreground text-sm">جاري تحميل التفضيلات...</p>}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
