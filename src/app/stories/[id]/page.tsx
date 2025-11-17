'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

// Define the type for a single story fetched from Firestore
type SuccessStory = {
  id: string;
  title: string;
  author: string;
  content: string;
  status: 'pending_review' | 'approved';
  // Optional snippet or imageId can be added later
  snippet?: string;
  imageId?: string;
};


export default function StoryPage({ params }: { params: { id: string } }) {
  const { firestore } = useFirebase();

  // Memoize the document reference to prevent re-renders
  const storyRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'success_stories', params.id) : null),
    [firestore, params.id]
  );
  
  const { data: story, isLoading, error } = useDoc<SuccessStory>(storyRef);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
  }
  
  if (error || !story || story.status !== 'approved') {
    // Show notFound for errors, non-existent stories, or stories not yet approved
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <article>
        <header className="mb-12 text-center">
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg aspect-video">
                <Image
                    src={`https://picsum.photos/seed/${story.id}/1200/675`}
                    alt={story.title}
                    width={1200}
                    height={675}
                    data-ai-hint="inspiring spiritual journey"
                    className="w-full h-full object-cover"
                />
                </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                {story.title}
            </h1>
            <div className="mt-6 flex justify-center items-center space-x-4 space-x-reverse text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{story.author}</span>
                </div>
            </div>
        </header>

        <div className="prose prose-lg max-w-none mx-auto dark:prose-invert prose-p:leading-relaxed prose-headings:font-headline">
            {story.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>

       <div className="text-center mt-16 pt-8 border-t">
          <h2 className="font-headline text-2xl font-bold mb-4">هل ألهمتك هذه القصة؟</h2>
          <p className="text-muted-foreground mb-6">عد إلى قائمة القصص لاستكشاف المزيد من رحلات اليقين.</p>
          <Button asChild size="lg">
            <Link href="/stories">العودة إلى القصص</Link>
          </Button>
        </div>
    </div>
  );
}
