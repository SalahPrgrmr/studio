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
import { collection, doc, runTransaction } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const newStorySchema = z.object({
  title: z.string().min(5, { message: 'العنوان يجب أن يكون 5 أحرف على الأقل.' }).max(100),
  author: z.string(), // Author is derived from user, so no validation needed here.
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
      author: user?.displayName || 'مستخدم غير مسجل',
      content: '',
    },
  });

  // Set user's name in the form when user object is available
  useEffect(() => {
    if (user?.displayName) {
        form.setValue('author', user.displayName);
    }
  }, [user, form]);
  
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
    
    const storiesCollection = collection(firestore, 'success_stories');
    const userProfileRef = doc(firestore, 'users', user.uid);

    try {
        // Create the complete and correct story payload
        const storyPayload = {
            title: values.title,
            content: values.content,
            author: user.displayName || 'مؤلف مجهول',
            authorId: user.uid,
            creationDate: new Date().toISOString(),
            status: 'approved' as const, // Story is approved immediately
            snippet: values.content.substring(0, 150), // Add a snippet for card view
        };

        // Add the story and update user profile in parallel
        await Promise.all([
            addDocumentNonBlocking(storiesCollection, storyPayload),
            runTransaction(firestore, async (transaction) => {
                const userProfileDoc = await transaction.get(userProfileRef);
                if (!userProfileDoc.exists()) {
                    const newProfile = {
                        id: user.uid,
                        displayName: user.displayName || 'مستخدم جديد',
                        photoURL: user.photoURL || '',
                        points: 150, // Points for first story
                        title: 'مستكشف',
                        badges: ['story_writer'],
                        stats: { storiesPublished: 1, forumPosts: 0, audioContributions: 0 },
                    };
                    transaction.set(userProfileRef, newProfile);
                } else {
                    const currentData = userProfileDoc.data();
                    const currentPoints = currentData.points || 0;
                    const currentStories = currentData.stats?.storiesPublished || 0;
                    const currentBadges = currentData.badges || [];
                    
                    const newBadges = [...currentBadges];
                    if (!newBadges.includes('story_writer')) {
                        newBadges.push('story_writer');
                    }

                    transaction.update(userProfileRef, {
                        points: currentPoints + 150,
                        'stats.storiesPublished': currentStories + 1,
                        badges: newBadges
                    });
                }
            })
        ]);

        toast({
            title: 'تم نشر قصتك بنجاح!',
            description: 'شكرًا لمشاركتك. لقد حصلت على 150 نقطة!',
        });

        // Redirect to the main stories page to avoid race condition on read
        router.push('/stories');

    } catch(e: any) {
        console.error("Error submitting story and updating profile:", e);
        toast({
            variant: "destructive",
            title: "حدث خطأ",
            description: "لم نتمكن من حفظ قصتك. يرجى المحاولة مرة أخرى."
        });
    } finally {
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
                شارك قصة ملهمة عن رحلتك مع اليقين، أو قصة سمعتها وأثرت فيك. سيتم نشر جميع المشاركات مباشرة.
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
                      <Input {...field} readOnly disabled className="bg-muted/50" />
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
            <CardFooter className="flex justify-between items-center">
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري النشر...
                  </>
                ) : (
                  <>
                    <Send className="ml-2 h-5 w-5" />
                    انشر القصة
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">سيتم نشر القصة مباشرة.</p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
