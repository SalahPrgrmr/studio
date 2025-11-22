import { Users, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase-admin'; // Using pre-initialized admin app
import { getAllUsers } from './actions';
import { UsersTable } from './users-table';
import { columns } from './columns';

async function verifyAdmin(): Promise<boolean> {
  try {
    const sessionCookie = cookies().get('session')?.value;
    if (!sessionCookie) {
      return false;
    }
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return decodedClaims.admin === true;
  } catch (error) {
    console.error("Admin verification failed:", error);
    return false;
  }
}

export default async function AdminUsersPage() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
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

  // If admin, fetch users
  const { users, error } = await getAllUsers();

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
        <div className="flex items-center justify-center py-16 text-destructive bg-destructive/10 rounded-lg">
          <AlertTriangle className="h-8 w-8 mr-3" />
          <span>حدث خطأ أثناء تحميل المستخدمين: {error}</span>
        </div>
      )}
      {users && <UsersTable columns={columns} data={users} />}
    </div>
  );
}
