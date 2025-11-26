'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { UserProfile, UserRoles } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';

// Combined type for the table's data
type UserWithRole = UserProfile & { role: UserRoles['role'] };


const roleDisplay: Record<UserRoles['role'], { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
    admin: { label: 'مسؤول', variant: 'default' },
    editor: { label: 'محرر', variant: 'secondary' },
    viewer: { label: 'مشاهد', variant: 'outline' },
};


export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: 'name',
    header: 'المستخدم',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
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
      const role = row.getValue('role') as UserRoles['role'];
      const display = roleDisplay[role] || { label: role, variant: 'secondary' };
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
