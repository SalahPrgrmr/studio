'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PenSquare, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

// Define a type for the story data fetched from Firestore
type SuccessStory = {
  id: string;
  title: string;
  author: string;
  content: string;
  status: 'pending_review' | 'approved';
  // Assuming a snippet or imageId might be added later
  snippet?: string; 
  imageId?: string; 
};


export default function StoriesPage() {
  const { firestore } = useFirebase();

  // Memoize the collection reference and the query
  const storiesCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'success_stories') : null),
    [firestore]
  );
  
  const storiesQuery = useMemoFirebase(
    () => (storiesCollection ? query(storiesCollection, where('status', '==', 'approved')) : null),
    [storiesCollection]
  );

  const { data: stories, isLoading } = useCollection<SuccessStory>(storiesQuery);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          قصص التحول
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          اقرأ قصصًا ملهمة من أفراد وجدوا طريقهم إلى اليقين.
        </p>
      </div>

       <Card className="mb-12 bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg border-primary/20">
        <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <PenSquare className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="font-headline text-3xl font-bold mb-2">
            شارك قصتك وألهم الآخرين
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            هل لديك قصة عن رحلتك مع اليقين؟ أو ربما سمعت قصة أثرت فيك. مشاركتك يمكن أن تكون مصدر إلهام وقوة لشخص آخر يمر بنفس الطريق.
          </p>
          <Button size="lg" asChild>
            <Link href="/stories/new">اكتب قصتك الآن</Link>
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">جاري تحميل القصص...</p>
        </div>
      )}

      {!isLoading && stories?.length === 0 && (
         <div className="text-center text-muted-foreground py-16">
            <BookOpen className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold">لا توجد قصص موافق عليها بعد</h3>
            <p className="mt-2">كن أول من يشارك قصة، أو تحقق مرة أخرى قريبًا!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories?.map((story) => (
            <Link href={`/stories/${story.id}`} key={story.id} className="block group">
              <Card className="flex flex-col overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 transform group-hover:-translate-y-1 h-full">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${story.id}/600/400`}
                      alt={story.title}
                      width={600}
                      height={400}
                      data-ai-hint="inspiring story placeholder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{story.title}</CardTitle>
                  <CardDescription>بواسطة {story.author}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground italic line-clamp-3">"{story.content}"</p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
