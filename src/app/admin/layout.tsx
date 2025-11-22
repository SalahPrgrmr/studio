import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';

import { serviceAccount } from '@/firebase/service-account-credentials';
import AdminSidebar from './sidebar';

// This function can be extracted to a shared utility if used in multiple places
async function verifyAdmin(): Promise<boolean> {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    const sessionCookie = cookies().get('session')?.value;
    if (!sessionCookie) {
      return false;
    }
    const decodedClaims = await admin.auth().verifySessionCookie(
      sessionCookie,
      true
    );
    return decodedClaims.admin === true;
  } catch (error) {
    console.error('Admin verification failed:', error);
    return false;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-1 flex-col overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
