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
import { collection, getDocs, writeBatch } from 'firebase/firestore';
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
      
      if (querySnapshot.empty) {
        toast({
          title: 'لا يوجد مستخدمين للحذف',
          description: 'قاعدة بيانات المستخدمين فارغة بالفعل.',
        });
        setIsLoading(false);
        return;
      }
      
      // Firestore allows up to 500 operations in a single batch.
      // We will process in chunks of 499 to be safe.
      const batchSize = 499;
      for (let i = 0; i < querySnapshot.docs.length; i += batchSize) {
        const batch = writeBatch(firestore);
        const chunk = querySnapshot.docs.slice(i, i + batchSize);
        chunk.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      toast({
        title: 'نجاح!',
        description: `تم حذف ${querySnapshot.size} مستخدمًا بنجاح.`,
      });
      
      // Redirect to home page after deletion
      router.push('/');

    } catch (error) {
      console.error('Error deleting users:', error);
      toast({
        variant: 'destructive',
        title: 'حدث خطأ',
        description: 'فشل حذف المستخدمين. يرجى مراجعة صلاحيات Firestore.',
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
            هذا الإجراء سيقوم بحذف **جميع** مستندات المستخدمين من قاعدة بيانات Firestore بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            استخدم هذا الخيار فقط إذا كنت متأكدًا من أنك تريد البدء من جديد بقاعدة بيانات مستخدمين نظيفة. سيتم حذف جميع الملفات الشخصية والإعدادات والتفضيلات.
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
                    {user ? 'حذف جميع المستخدمين' : 'يجب تسجيل الدخول أولاً'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                  <AlertDialogDescription>
                    سيتم حذف جميع بيانات المستخدمين بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
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
