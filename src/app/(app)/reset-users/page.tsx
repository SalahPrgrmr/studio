'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function ResetUsersPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteAllUsers() {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'غير مصرح به',
        description: 'يجب عليك تسجيل الدخول لتنفيذ هذا الإجراء.',
      });
      return;
    }
    setIsLoading(true);

    try {
      const usersCollectionRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      
      const usersToDelete = querySnapshot.docs.filter(doc => doc.id !== user.uid);

      if (usersToDelete.length === 0) {
        toast({
          title: 'لا يوجد مستخدمين آخرين للحذف',
          description: 'أنت المستخدم الوحيد الموجود حاليًا.',
        });
        setIsLoading(false);
        return;
      }
      
      const batchSize = 499;
      for (let i = 0; i < usersToDelete.length; i += batchSize) {
        const batch = writeBatch(firestore);
        const chunk = usersToDelete.slice(i, i + batchSize);
        chunk.forEach(docToDelete => {
          batch.delete(docToDelete.ref);
        });
        await batch.commit();
      }

      toast({
        title: 'نجاح!',
        description: `تم حذف ${usersToDelete.length} مستخدمًا بنجاح. تم الإبقاء على حسابك الحالي.`,
      });
      
      // Redirect to home page after deletion
      router.push('/');

    } catch (error: any) {
      console.error('Error deleting users:', error);
      toast({
        variant: 'destructive',
        title: 'حدث خطأ',
        description: error.message || 'فشل حذف المستخدمين. يرجى مراجعة صلاحيات Firestore.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline text-2xl text-destructive">
            <AlertTriangle className="h-6 w-6" />
            إعادة تعيين بيانات المستخدمين
          </CardTitle>
          <CardDescription>
            هذا الإجراء سيقوم بحذف **جميع** مستندات المستخدمين من قاعدة بيانات Firestore بشكل نهائي، **باستثناء حسابك الحالي**. لا يمكن التراجع عن هذا الإجراء.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            استخدم هذا الخيار إذا كنت تريد البدء من جديد مع الاحتفاظ بحسابك الحالي. سيتم حذف جميع الملفات الشخصية الأخرى.
          </p>
        </CardContent>
        <CardFooter>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                 <Button variant="destructive" disabled={isLoading || !user}>
                    {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    {user ? 'حذف جميع المستخدمين الآخرين' : 'يجب تسجيل الدخول أولاً'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                  <AlertDialogDescription>
                    سيتم حذف جميع بيانات المستخدمين الآخرين بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAllUsers} className="bg-destructive hover:bg-destructive/90">
                    نعم، قم بالحذف
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
