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
import { useState } from 'react';
import Link from 'next/link';

const newStorySchema = z.object({
  title: z.string().min(5, { message: 'العنوان يجب أن يكون 5 أحرف على الأقل.' }).max(100),
  author: z.string().min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل.' }).max(50),
  content: z.string().min(50, { message: 'القصة يجب أن تكون 50 حرفًا على الأقل.' }).max(5000),
});

type NewStoryFormValues = z.infer<typeof newStorySchema>;

export default function NewStoryPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewStoryFormValues>({
    resolver: zodResolver(newStorySchema),
    defaultValues: {
      title: '',
      author: user?.displayName || '',
      content: '',
    },
  });
  
  async function onSubmit(values: NewStoryFormValues) {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'غير مصرح به',
        description: 'يجب عليك تسجيل الدخول لمشاركة قصة.',
      });
      return;
    }
    setIsSubmitting(true);
    
    try {
        const storiesCollection = collection(firestore, 'success_stories');
        await addDocumentNonBlocking(storiesCollection, {
            ...values,
            authorId: user.uid,
            creationDate: new Date().toISOString(),
        });

        toast({
            title: 'شكرًا لمشاركتك!',
            description: 'تم إرسال قصتك بنجاح وستظهر بعد المراجعة.',
        });
        
        router.push('/stories');

    } catch (e) {
        // Error is handled globally
        setIsSubmitting(false);
    }
  }
  
  if (!user) {
    return (
        <div className="container mx-auto max-w-2xl text-center py-20">
            <Card>
                <CardHeader>
                    <CardTitle>يجب عليك تسجيل الدخول</CardTitle>
                    <CardDescription>لمشاركة قصتك، يرجى تسجيل الدخول أولاً.</CardDescription>
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
                <Link href="/stories" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    العودة إلى القصص
                </Link>
            </Button>
        </div>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-3xl">
                <PenSquare className="h-8 w-8 text-primary" />
                اكتب قصتك
              </CardTitle>
              <CardDescription>
                شارك قصة ملهمة عن رحلتك مع اليقين، أو قصة سمعتها وأثرت فيك.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان القصة</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: كيف وجدت الطمأنينة في أصعب الأوقات" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم (كما سيظهر للجميع)</FormLabel>
                    <FormControl>
                      <Input placeholder="اسمك أو اسم مستعار" {...field} />
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
                    <FormLabel>محتوى القصة</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="اسرد قصتك هنا..."
                        className="resize-y"
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري النشر...
                  </>
                ) : (
                  <>
                    <Send className="ml-2 h-5 w-5" />
                    نشر القصة
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