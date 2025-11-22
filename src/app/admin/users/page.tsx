import { Users, AlertTriangle } from 'lucide-react';
import { getAllUsers } from './actions';
import { UsersTable } from './users-table';
import { columns } from './columns';

export default async function AdminUsersPage() {
  const { users, error } = await getAllUsers();

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-3">
          <Users className="h-8 w-8" />
          إدارة المستخدمين
        </h1>
        <p className="mt-1 text-muted-foreground">
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
