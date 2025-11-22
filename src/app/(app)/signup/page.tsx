
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2, UserPlus, ArrowLeft } from 'lucide-react';
import { 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signupSchema, type SignupFormValues } from '@/lib/types';
import Link from 'next/link';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleEmailSignUp = async (values: SignupFormValues) => {
    if (!auth) {
      toast({ variant: "destructive", title: "خطأ", description: "خدمة المصادقة غير متوفرة حاليًا." });
      return;
    }
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Update user's profile display name in Firebase Auth
      await updateProfile(user, { displayName: values.displayName });

      // The onUserCreate cloud function will handle creating the firestore document.
      
      toast({ title: 'تم إنشاء الحساب بنجاح', description: 'أهلاً بك في رحلتك نحو اليقين!' });
      router.push('/');

    } catch (error: any) {
      console.error("Email sign-up error:", error);
      let description = "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.";
      if (error.code === 'auth/email-already-in-use') {
        description = "هذا البريد الإلكتروني مستخدم بالفعل. حاول تسجيل الدخول بدلاً من ذلك.";
      } else if (error.code === 'auth/weak-password') {
        description = "كلمة المرور ضعيفة جدًا. يرجى اختيار كلمة مرور أقوى.";
      }
      toast({ variant: 'destructive', title: 'خطأ في إنشاء الحساب', description });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-sm animate-in fade-in duration-500">
        <div className="p-2">
            <Button asChild variant="ghost" size="sm">
                <Link href="/login" className="flex items-center gap-1 text-muted-foreground text-xs">
                    <ArrowLeft className="h-3 w-3" />
                    العودة لتسجيل الدخول
                </Link>
            </Button>
        </div>
        <CardHeader className="text-center pt-0">
          <CardTitle className="text-2xl font-headline">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            انضم إلى مجتمعنا وابدأ رحلتك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEmailSignUp)} className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم (كما سيظهر للجميع)</FormLabel>
                    <FormControl>
                      <Input placeholder="الاسم الكامل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <UserPlus className="ml-2 h-4 w-4" />}
                إنشاء حساب
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
