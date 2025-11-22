'use client';

import { ColumnDef } from '@tanstack/react-table';
import { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';

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
      return (
        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
          {role === 'admin' ? 'مسؤول' : 'مستخدم'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'points',
    header: 'النقاط',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
