
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Github, Loader2 } from 'lucide-react';
import { 
  signInWithPopup, 
  GithubAuthProvider, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    github: false,
    google: false,
    facebook: false,
    x: false,
  });
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();

  const handleSignIn = async (providerName: 'google' | 'github' | 'facebook' | 'x') => {
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
      case 'google':
        provider = new GoogleAuthProvider();
        break;
      case 'github':
        provider = new GithubAuthProvider();
        break;
      case 'facebook':
        provider = new FacebookAuthProvider();
        break;
      case 'x':
        provider = new TwitterAuthProvider();
        break;
      default:
        toast({ variant: "destructive", title: "مزود خدمة غير صالح" });
        return;
    }

    setIsLoading(prev => ({ ...prev, [providerName]: true }));
    
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'أهلاً بك مجددًا!',
      });
      router.push('/');
    } catch (error: any) {
      console.error(`${providerName} sign-in error:`, error);
      let description = error.message || `فشل تسجيل الدخول باستخدام ${providerName}. يرجى المحاولة مرة أخرى.`;
      // Handle common Firebase auth errors
      if (error.code === 'auth/account-exists-with-different-credential') {
        description = 'يوجد حساب بالفعل بنفس البريد الإلكتروني ولكن ببيانات اعتماد مختلفة. جرب تسجيل الدخول باستخدام مزود خدمة آخر.';
      }
      toast({
        variant: 'destructive',
        title: 'خطأ في المصادقة',
        description: description,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [providerName]: false }));
    }
  };

  return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-sm animate-in fade-in duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">تسجيل الدخول</CardTitle>
            <CardDescription>
              سجل الدخول إلى حسابك لحفظ مسارك والانضمام إلى المجتمع.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                variant="outline"
                onClick={() => handleSignIn('google')}
                disabled={isLoading.google}
              >
                {isLoading.google ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon className="ml-2 h-5 w-5" />
                )}
                المتابعة باستخدام Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSignIn('facebook')}
                disabled={isLoading.facebook}
              >
                {isLoading.facebook ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <FacebookIcon className="ml-2 h-5 w-5" />
                )}
                المتابعة باستخدام Facebook
              </Button>
               <Button
                variant="outline"
                onClick={() => handleSignIn('x')}
                disabled={isLoading.x}
              >
                {isLoading.x ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <XIcon className="ml-2 h-4 w-4" />
                )}
                المتابعة باستخدام X
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSignIn('github')}
                disabled={isLoading.github}
              >
                {isLoading.github ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="ml-2 h-4 w-4" />
                )}
                المتابعة باستخدام GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
