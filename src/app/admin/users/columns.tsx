'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';

const roleDisplay: Record<UserProfile['role'], { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    admin: { label: 'مسؤول', variant: 'destructive' },
    editor: { label: 'محرر', variant: 'secondary' },
    user: { label: 'مستخدم', variant: 'outline' },
};


export const columns: ColumnDef<UserProfile>[] = [
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
      const role = row.getValue('role') as UserProfile['role'];
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
