'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2, LogIn, Shield } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@admin.com', password: '' },
  });

  const handleAdminSignIn = async (values: LoginFormValues) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'خدمة المصادقة غير متوفرة حاليًا.',
      });
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحبًا بك في لوحة التحكم!',
      });
      router.push('/admin');
    } catch (error: any) {
      let description =
        'فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.';
      if (error.code === 'auth/invalid-credential') {
        description =
          'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.';
      }
      toast({ variant: 'destructive', title: 'خطأ في تسجيل الدخول', description });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-sm animate-in fade-in duration-500">
        <CardHeader className="text-center">
          <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-2xl font-headline">
            تسجيل دخول المسؤول
          </CardTitle>
          <CardDescription>
            هذه المنطقة مخصصة للمسؤولين فقط.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAdminSignIn)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="ml-2 h-4 w-4" />
                )}
                دخول
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
