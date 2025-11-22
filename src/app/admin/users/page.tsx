'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { UsersTable } from './users-table';
import { columns } from './columns';
import { Users, Loader2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase, useUser, useDoc } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminUsersPage() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const profileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(profileRef);

  const usersCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'users') : null),
    [firestore]
  );
  
  const { data: users, isLoading: areUsersLoading, error } = useCollection<UserProfile>(usersCollection);

  const isLoading = isUserLoading || isProfileLoading || areUsersLoading;

  useEffect(() => {
    if (!isUserLoading && !isProfileLoading && userProfile?.role !== 'admin') {
      router.push('/');
    }
  }, [user, userProfile, isUserLoading, isProfileLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mr-3" />
        <span>جاري التحقق من الصلاحيات وتحميل البيانات...</span>
      </div>
    );
  }

  if (userProfile?.role !== 'admin') {
    return (
      <div className="container mx-auto max-w-2xl text-center py-20">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-destructive">
              <ShieldAlert />
              وصول مرفوض
            </CardTitle>
            <CardDescription>
              ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/">العودة إلى الصفحة الرئيسية</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          إدارة المستخدمين
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          عرض، بحث، وتعديل صلاحيات المستخدمين في المنصة.
        </p>
      </div>
      {error && (
        <div className="flex items-center justify-center py-16 text-destructive">
          <AlertTriangle className="h-8 w-8 mr-3" />
          <span>حدث خطأ أثناء تحميل المستخدمين: {error.message}</span>
        </div>
      )}
      {!areUsersLoading && users && <UsersTable columns={columns} data={users} />}
    </div>
  );
}
