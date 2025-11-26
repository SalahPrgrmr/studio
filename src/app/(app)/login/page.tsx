
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Wrench } from 'lucide-react';

export default function LoginPage() {
  return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-sm text-center animate-in fade-in duration-500">
          <CardHeader>
            <div className="mx-auto bg-muted rounded-full p-3 w-fit mb-4">
                <Wrench className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-headline">الميزة قيد التطوير</CardTitle>
            <CardDescription>
              إنشاء الحسابات وتسجيل الدخول معطل حاليًا. نعمل على إعادة بناء هذه الميزة وستكون متاحة قريبًا.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="ml-2 h-4 w-4" />
                العودة إلى الصفحة الرئيسية
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}
