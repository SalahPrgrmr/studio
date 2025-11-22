'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';

const roleDisplay: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    admin: { label: 'مسؤول', variant: 'default' },
    editor: { label: 'محرر', variant: 'secondary' },
    moderator: { label: 'مشرف', variant: 'secondary' },
    user: { label: 'مستخدم', variant: 'outline' },
};


export const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: 'displayName',
    header: 'المستخدم',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.displayName}</span>
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
      const role = row.getValue('role') as string;
      const display = roleDisplay[role] || { label: role, variant: 'secondary' };
      return (
        <Badge variant={display.variant}>
          {display.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'points',
    header: ({ column }) => {
       return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          النقاط
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue('points')}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
