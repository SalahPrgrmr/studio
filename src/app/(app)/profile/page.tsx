'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
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
import { Loader2, UserCircle, Pencil, Trash2, Save } from 'lucide-react';

// 1. Expanded User Profile Data Model
interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  firstName?: string;
  lastName?: string;
  country?: string;
  bio?: string;
}

export default function ProfilePage() {
  const { auth, firestore } = useFirebase();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Temporary state for form inputs
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (!auth || !firestore) return;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        try {
          const docSnap = await getDoc(userRef);
          let profileData: UserProfile;

          if (docSnap.exists()) {
            profileData = docSnap.data() as UserProfile;
          } else {
            // User document doesn't exist, create it with expanded fields
            profileData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'مستخدم جديد',
              photoURL: user.photoURL,
              firstName: '',
              lastName: '',
              country: '',
              bio: '',
            };
            await setDoc(userRef, profileData);
          }
          setUserProfile(profileData);
          setFormData(profileData); // Initialize form data
        } catch (err) {
          console.error("Error syncing user profile:", err);
          setError("حدث خطأ أثناء مزامنة ملفك الشخصي.");
        } finally {
            setIsLoading(false);
        }
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!firestore || !userProfile) return;
    setIsSaving(true);
    const userRef = doc(firestore, 'users', userProfile.uid);
    try {
      await updateDoc(userRef, formData);
      setUserProfile(prev => ({ ...prev!, ...formData }));
      setIsEditing(false);
      toast({ title: 'تم الحفظ بنجاح!', description: 'تم تحديث بيانات ملفك الشخصي.' });
    } catch (err) {
      console.error('Failed to save profile:', err);
      toast({ variant: 'destructive', title: 'فشل الحفظ', description: 'لم نتمكن من تحديث ملفك الشخصي.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
      if(!auth?.currentUser?.email) return;
      try {
          await sendPasswordResetEmail(auth, auth.currentUser.email);
          toast({ title: 'تم إرسال البريد الإلكتروني', description: 'تفقد بريدك الإلكتروني لإعادة تعيين كلمة المرور.' });
      } catch (error) {
          console.error('Password reset error:', error);
          toast({ variant: 'destructive', title: 'خطأ', description: 'فشل إرسال بريد إعادة تعيين كلمة المرور.' });
      }
  }

  const handleDeleteAccount = async () => {
      if (!auth?.currentUser || !firestore) return;
      const user = auth.currentUser;
      const userRef = doc(firestore, 'users', user.uid);

      try {
          // 1. Delete Firestore document
          await deleteDoc(userRef);
          // 2. Delete Auth user
          await deleteUser(user);
          toast({ title: 'تم حذف الحساب', description: 'تم حذف حسابك وبياناتك بنجاح.' });
          setUserProfile(null); // Clear local state
      } catch (error: any) {
          console.error('Error deleting account:', error);
           if (error.code === 'auth/requires-recent-login') {
                toast({ variant: 'destructive', title: 'المصادقة مطلوبة', description: 'هذه العملية حساسة وتتطلب إعادة تسجيل الدخول. الرجاء تسجيل الخروج ثم الدخول مرة أخرى والمحاولة مجدداً.' });
           } else {
                toast({ variant: 'destructive', title: 'فشل حذف الحساب', description: 'حدث خطأ غير متوقع.' });
           }
      }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  if (!userProfile) {
    return <div className="text-center p-8"><p className="text-muted-foreground">الرجاء تسجيل الدخول لعرض ملفك الشخصي.</p></div>;
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-center mb-12">ملفك الشخصي</h1>
      <Card className="shadow-lg animate-in fade-in duration-500">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <Avatar className="h-24 w-24">
                <AvatarImage src={formData.photoURL || undefined} alt={formData.displayName || 'User'} />
                <AvatarFallback><UserCircle className="h-full w-full text-muted-foreground" /></AvatarFallback>
            </Avatar>
            <div className='w-full'>
                <CardTitle className="text-2xl mb-2">{userProfile.displayName}</CardTitle>
                 <p className="text-md text-muted-foreground">{userProfile.email}</p>
            </div>
            {!isEditing && (
                <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}><Pencil className="h-4 w-4" /></Button>
            )}
        </CardHeader>
        <CardContent>
            {isEditing ? (
                <div className="space-y-4">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor="firstName">الاسم الأول</Label>
                            <Input id="firstName" value={formData.firstName || ''} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="lastName">اسم العائلة</Label>
                            <Input id="lastName" value={formData.lastName || ''} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="country">الدولة</Label>
                        <Input id="country" value={formData.country || ''} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="bio">نبذة تعريفية</Label>
                        <Textarea id="bio" value={formData.bio || ''} onChange={handleInputChange} placeholder='تحدث عن نفسك...' />
                    </div>
                </div>
            ) : (
                <div className="space-y-4 pt-4">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
                        <div><strong>الاسم الأول:</strong> <span className='text-muted-foreground'>{userProfile.firstName || 'لم يحدد'}</span></div>
                        <div><strong>اسم العائلة:</strong> <span className='text-muted-foreground'>{userProfile.lastName || 'لم يحدد'}</span></div>
                        <div><strong>الدولة:</strong> <span className='text-muted-foreground'>{userProfile.country || 'لم تحدد'}</span></div>
                    </div>
                    <div>
                        <strong>نبذة عني:</strong>
                        <p className='text-muted-foreground mt-1 whitespace-pre-line'>{userProfile.bio || 'لا توجد نبذة تعريفية.'}</p>
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-6'>
          {isEditing ? (
              <div className="flex space-x-2 ml-auto">
                  <Button variant="outline" onClick={() => { setIsEditing(false); setFormData(userProfile); }}>إلغاء</Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Save className='ml-2 h-4 w-4'/>} حفظ التغييرات
                  </Button>
              </div>
          ) : (
             <div className='border-t pt-6 w-full'>
                <h3 className="text-lg font-semibold mb-3">إدارة الحساب</h3>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <Button variant="secondary" onClick={handlePasswordReset}>إعادة تعيين كلمة المرور</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="destructive">حذف الحساب</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                            <AlertDialogDescription>
                                هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف حسابك بشكل دائم وإزالة بياناتك من خوادمنا.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction className='bg-destructive hover:bg-destructive/90 text-destructive-foreground' onClick={handleDeleteAccount}>نعم، احذف حسابي</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
             </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
