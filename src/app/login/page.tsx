
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const router = useRouter();
  const { signInWithGithub } = useAuth();
  const { toast } = useToast();

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    try {
      await signInWithGithub();
      router.push('/');
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Failed to sign in with GitHub. Please try again.',
      });
      setIsGitHubLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
            <CardDescription>
              Sign in to your account to save your path and join the community.
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
                  <span className="animate-spin mr-2">...</span>
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                Continue with GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
