'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { User, Loader2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { format } from 'date-fns';

// Define the type for a single story fetched from Firestore
type SuccessStory = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  content: string;
  creationDate: string;
  status: 'pending_review' | 'approved';
  // Optional snippet or imageId can be added later
  snippet?: string;
  imageId?: string;
};


export default function StoryPage({ params }: { params: { id: string } }) {
  const { firestore, user } = useFirebase();

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

  // Only show the story if it's approved, OR if the current user is the author
  const canView = story && (story.status === 'approved' || (user && user.uid === story.authorId));

  if (error || !canView) {
    // Show notFound for errors, non-existent stories, or stories the user can't view
    notFound();
  }
  
  if (!story) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <article>
        <header className="mb-12 text-center">
             {story.status === 'pending_review' && (
                <div className="mb-4 text-center text-yellow-600 bg-yellow-100 p-3 rounded-lg">
                    هذه القصة قيد المراجعة حاليًا ولن تظهر للعامة حتى تتم الموافقة عليها.
                </div>
            )}
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
                 <span>•</span>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <time dateTime={story.creationDate}>{format(new Date(story.creationDate), 'd MMMM, yyyy')}</time>
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
