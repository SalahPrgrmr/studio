
'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import type { UserProfile } from '@/lib/types';
import { setUserRole } from './actions';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define roles type locally for admin actions
type UserRole = 'user' | 'editor' | 'admin';
type UserProfileWithRole = UserProfile & { role?: UserRole };


interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const roles: { value: UserRole; label: string }[] = [
    { value: 'admin', label: 'مسؤول' },
    { value: 'editor', label: 'محرر' },
    { value: 'user', label: 'مستخدم' },
];

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = row.original as UserProfileWithRole;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleRoleChange = (newRole: UserRole) => {
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
          description: `تم تغيير صلاحية ${user.name} إلى ${roles.find(r => r.value === newRole)?.label}.`,
        });
      }
    });
  };

  const currentRole = user.role || 'user';

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
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Shield className="mr-2 h-4 w-4" />
                تغيير الصلاحية
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                 <DropdownMenuRadioGroup value={currentRole} onValueChange={(value) => handleRoleChange(value as UserRole)}>
                     {roles.map(role => (
                        <DropdownMenuRadioItem 
                            key={role.value} 
                            value={role.value}
                            disabled={isPending}
                        >
                            {role.label}
                        </DropdownMenuRadioItem>
                     ))}
                 </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
