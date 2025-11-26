
'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';

// Define roles type locally for admin actions
type UserRole = 'user' | 'editor' | 'admin';
type UserProfileWithRole = UserProfile & { role?: UserRole };

const roleDisplay: Record<UserRole, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    admin: { label: 'مسؤول', variant: 'destructive' },
    editor: { label: 'محرر', variant: 'secondary' },
    user: { label: 'مستخدم', variant: 'outline' },
};


export const columns: ColumnDef<UserProfileWithRole>[] = [
  {
    accessorKey: 'name',
    header: 'المستخدم',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          البريد الإلكتروني
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'الصلاحية',
    cell: ({ row }) => {
      const role = row.getValue('role') as UserRole | undefined;
      // Default to 'user' if role is not present
      const currentRole = role || 'user';
      const display = roleDisplay[currentRole] || { label: currentRole, variant: 'secondary' };
      return (
        <Badge variant={display.variant}>
          {display.label}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
