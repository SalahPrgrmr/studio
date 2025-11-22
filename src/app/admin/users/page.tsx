'use client';

import { UserProfile } from '@/lib/types';
import { UsersTable } from './users-table';
import { columns } from './columns';
import { Users, Loader2, AlertTriangle } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function AdminUsersPage() {
  const { firestore } = useFirebase();

  const usersCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'users') : null),
    [firestore]
  );
  
  const { data: users, isLoading, error } = useCollection<UserProfile>(usersCollection);

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
      {isLoading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <span>جاري تحميل بيانات المستخدمين...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center py-16 text-destructive">
            <AlertTriangle className="h-8 w-8 mr-3" />
            <span>حدث خطأ أثناء تحميل المستخدمين: {error.message}</span>
        </div>
      )}
      {!isLoading && users && <UsersTable columns={columns} data={users} />}
    </div>
  );
}
