'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, UserPlus } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signupSchema, type SignupFormValues } from '@/lib/types';


export default function SignupPage() {
  const { auth, firestore } = useFirebase(); // Make sure to get firestore instance
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { formState } = form;

  async function onSubmit(values: SignupFormValues) {
    if (!auth || !firestore) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const { user } = userCredential;

      // Update the user's profile with the display name
      await updateProfile(user, {
        displayName: values.displayName
      });
      
      // Create a document in Firestore
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        displayName: values.displayName,
        email: values.email,
        uid: user.uid,
        createdAt: new Date(),
        roles: ['user']
      });

      toast({
        title: 'تم إنشاء الحساب بنجاح!',
        description: 'مرحبًا بك. يتم توجيهك الآن...',
      });

      router.push('/profile');

    } catch (error: any) {
      console.error(error);
      let description = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'هذا البريد الإلكتروني مسجل بالفعل.';
      }
      toast({
        variant: 'destructive',
        title: 'فشل إنشاء الحساب',
        description,
      });
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-sm animate-in fade-in duration-500">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-headline">إنشاء حساب جديد</CardTitle>
              <CardDescription>
                انضم إلى مجتمعنا وابدأ رحلتك نحو اليقين.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم (كما سيظهر للآخرين)</FormLabel>
                    <FormControl>
                      <Input placeholder="اسمك الكامل" {...field} />
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
                      <Input type="email" placeholder="example@domain.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="ml-2 h-4 w-4" />
                )}
                إنشاء حساب
              </Button>
              <p className="text-xs text-muted-foreground">
                لديك حساب بالفعل؟{' '}
                <Link href="/login" className="text-primary hover:underline">
                  سجل الدخول
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
