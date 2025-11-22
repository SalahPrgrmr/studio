import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';
import { UserProfile } from '@/lib/types';
import { UsersTable } from './users-table';
import { columns } from './columns';
import { Users } from 'lucide-react';

async function getUsers(): Promise<UserProfile[]> {
  const adminDb = getFirestore(initializeFirebaseAdmin());
  const usersSnapshot = await adminDb.collection('users').get();
  
  if (usersSnapshot.empty) {
    return [];
  }

  const users: UserProfile[] = [];
  usersSnapshot.forEach(doc => {
    // We can cast here as we trust the data structure from our app
    users.push(doc.data() as UserProfile);
  });

  return users;
}

export default async function AdminUsersPage() {
  const users = await getUsers();

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
      <UsersTable columns={columns} data={users} />
    </div>
  );
}
