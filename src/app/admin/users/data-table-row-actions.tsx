'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserProfile } from '@/lib/types';
import { setUserRole } from './actions';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = row.original as UserProfile;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleRoleChange = (newRole: 'admin' | 'user') => {
    startTransition(async () => {
      const result = await setUserRole(user.id, newRole);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'خطأ',
          description: result.error,
        });
      } else {
        toast({
          title: 'تم التحديث',
          description: `تم تغيير صلاحية ${user.displayName} إلى ${newRole === 'admin' ? 'مسؤول' : 'مستخدم'}.`,
        });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">فتح القائمة</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          disabled={user.role === 'admin' || isPending}
          onClick={() => handleRoleChange('admin')}
        >
          <Shield className="mr-2 h-4 w-4" />
          الترقية إلى مسؤول
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={user.role === 'user' || isPending}
          onClick={() => handleRoleChange('user')}
        >
          <Shield className="mr-2 h-4 w-4" />
          إزالة صلاحية مسؤول
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
