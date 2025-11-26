
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Github, Loader2, LogIn, Mail } from 'lucide-react';
import { 
  signInWithPopup, 
  GithubAuthProvider, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// SVG Icons for social providers
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.655-3.449-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.226,44,30.41,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" {...props}>
    <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5 c-0.83,0-1,0.47-1,1v2h3l-0.5,3H13v6.95C18.05,21.45,22,17.19,22,12z" fill="#1877F2"/>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
  password: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState({
    github: false,
    google: false,
    facebook: false,
    x: false,
    email: false,
  });
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSocialSignIn = async (providerName: 'google' | 'github' | 'facebook' | 'x') => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "خدمة المصادقة غير متوفرة حاليًا.",
      });
      return;
    }

    let provider;
    switch (providerName) {
      case 'google': provider = new GoogleAuthProvider(); break;
      case 'github': provider = new GithubAuthProvider(); break;
      case 'facebook': provider = new FacebookAuthProvider(); break;
      case 'x': provider = new TwitterAuthProvider(); break;
      default: toast({ variant: "destructive", title: "مزود خدمة غير صالح" }); return;
    }

    setIsLoading(prev => ({ ...prev, [providerName]: true }));
    
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Sign-in popup closed by user.");
      } else {
        console.error(`${providerName} sign-in error:`, error);
        let description = error.message || `فشل تسجيل الدخول باستخدام ${providerName}. يرجى المحاولة مرة أخرى.`;
        if (error.code === 'auth/account-exists-with-different-credential') {
          description = 'يوجد حساب بالفعل بنفس البريد الإلكتروني ولكن ببيانات اعتماد مختلفة. جرب تسجيل الدخول باستخدام مزود خدمة آخر.';
        }
        toast({ variant: 'destructive', title: 'خطأ في المصادقة', description: description });
      }
    } finally {
      setIsLoading(prev => ({ ...prev, [providerName]: false }));
    }
  };

  const handleEmailSignIn = async (values: LoginFormValues) => {
    if (!auth) {
      toast({ variant: "destructive", title: "خطأ", description: "خدمة المصادقة غير متوفرة حاليًا." });
      return;
    }
    setIsLoading(prev => ({ ...prev, email: true }));
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/');
    } catch (error: any) {
      console.error("Email sign-in error:", error);
      let description = "فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.";
      if (error.code === 'auth/invalid-credential') {
        description = "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.";
      }
      toast({ variant: 'destructive', title: 'خطأ في تسجيل الدخول', description });
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }));
    }
  };

  return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-sm animate-in fade-in duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">تسجيل الدخول</CardTitle>
            <CardDescription>
              ادخل إلى حسابك للمتابعة.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEmailSignIn)} className="space-y-4">
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
                <Button type="submit" className="w-full" disabled={isLoading.email}>
                  {isLoading.email ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <LogIn className="ml-2 h-4 w-4" />}
                  تسجيل الدخول
                </Button>
              </form>
            </Form>
            <div className="relative my-6">
              <Separator />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                <span className="bg-background px-2 text-xs uppercase text-muted-foreground">أو</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button variant="outline" onClick={() => handleSocialSignIn('google')} disabled={isLoading.google}>
                {isLoading.google ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="ml-2 h-5 w-5" />}
                المتابعة باستخدام Google
              </Button>
              <Button variant="outline" onClick={() => handleSocialSignIn('facebook')} disabled={isLoading.facebook}>
                {isLoading.facebook ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <FacebookIcon className="ml-2 h-5 w-5" />}
                المتابعة باستخدام Facebook
              </Button>
               <Button variant="outline" onClick={() => handleSocialSignIn('x')} disabled={isLoading.x}>
                {isLoading.x ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <XIcon className="ml-2 h-4 w-4" />}
                المتابعة باستخدام X
              </Button>
              <Button variant="outline" onClick={() => handleSocialSignIn('github')} disabled={isLoading.github}>
                {isLoading.github ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Github className="ml-2 h-4 w-4" />}
                المتابعة باستخدام GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
             <Link href="/signup" className="text-primary hover:underline">
              ليس لديك حساب؟ أنشئ واحدًا الآن
            </Link>
          </CardFooter>
        </Card>
      </div>
  );
}
