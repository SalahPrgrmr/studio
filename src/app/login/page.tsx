
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Github, Loader2 } from 'lucide-react';
import { signInWithPopup, GithubAuthProvider, UserCredential } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();

  const handleGitHubSignIn = async () => {
    if (!auth) {
        toast({
            variant: "destructive",
            title: "خطأ",
            description: "خدمة المصادقة غير متوفرة حاليًا.",
        });
        return;
    }

    setIsGitHubLoading(true);
    const provider = new GithubAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'أهلاً بك مجددًا!',
      });
      router.push('/');
    } catch (error: any) {
      console.error('GitHub sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'خطأ في المصادقة',
        description: error.message || 'فشل تسجيل الدخول باستخدام GitHub. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsGitHubLoading(false);
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
                onClick={handleGitHubSignIn}
                disabled={isGitHubLoading}
              >
                {isGitHubLoading ? (
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
