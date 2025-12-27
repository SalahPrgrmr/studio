'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, ArrowLeft, PenSquare } from 'lucide-react';
import { useFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const newPostSchema = z.object({
  title: z.string().min(10, { message: 'العنوان يجب أن يكون 10 أحرف على الأقل.' }).max(150),
  content: z.string().min(30, { message: 'المحتوى يجب أن يكون 30 حرفًا على الأقل.' }).max(10000),
  tags: z.string().optional(),
});

type NewPostFormValues = z.infer<typeof newPostSchema>;

export default function NewForumPostPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<NewPostFormValues>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  const { formState } = form;

  async function onSubmit(values: NewPostFormValues) {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'غير مصرح به',
        description: 'يجب عليك تسجيل الدخول لإنشاء مشاركة.',
      });
      router.push('/login');
      return;
    }
    
    const postsCollection = collection(firestore, 'forum_posts');
    const tagsArray = values.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [];

    const newPostData = {
        title: values.title,
        content: values.content,
        author: user.displayName || 'مستخدم',
        authorId: user.uid,
        avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
        timestamp: new Date().toISOString(),
        tags: tagsArray,
        likes: [],
        commentCount: 0,
    };

    try {
      await addDocumentNonBlocking(postsCollection, newPostData);
      toast({
        title: 'تم إنشاء المشاركة!',
        description: 'تم نشر مشاركتك الجديدة في المنتدى بنجاح.',
      });
      // Redirect to the main forum page to prevent race condition errors
      router.push('/community/forum');
    } catch (e) {
      // Error is handled by the global error handler
    }
  }
  
  if (!user) {
    return (
        <div className="container mx-auto max-w-2xl text-center py-20">
            <Card>
                <CardHeader>
                    <CardTitle>يجب عليك تسجيل الدخول</CardTitle>
                    <CardDescription>لإنشاء مشاركة جديدة، يرجى تسجيل الدخول أولاً.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/login">الذهاب إلى صفحة تسجيل الدخول</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
        <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/community/forum" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    العودة إلى المنتدى
                </Link>
            </Button>
        </div>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-3xl">
                <PenSquare className="h-8 w-8 text-primary" />
                إنشاء مشاركة جديدة
              </CardTitle>
              <CardDescription>
                شارك فكرة، اطرح سؤالاً، أو ابدأ نقاشًا جديدًا مع المجتمع.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان المشاركة</FormLabel>
                    <FormControl>
                      <Input placeholder="ما هو موضوع نقاشك؟" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المحتوى</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="اكتب هنا تفاصيل مشاركتك..."
                        className="resize-y"
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوسوم (Tags)</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: نقاش, إيمان, فلسفة" {...field} />
                    </FormControl>
                     <p className="text-xs text-muted-foreground">افصل بين الوسوم بفاصلة (,).</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={formState.isSubmitting} size="lg">
                {formState.isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري النشر...
                  </>
                ) : (
                  <>
                    <Send className="ml-2 h-5 w-5" />
                    نشر المشاركة
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
