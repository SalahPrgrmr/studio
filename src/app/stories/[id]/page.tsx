import { notFound } from 'next/navigation';
import Image from 'next/image';
import { stories, Story } from '../data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return stories.map((story) => ({
    id: story.id,
  }));
}

export default function StoryPage({ params }: { params: { id: string } }) {
  const story = stories.find((s) => s.id === params.id);

  if (!story) {
    notFound();
  }

  const imageData = PlaceHolderImages.find(img => img.id === story.imageId);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <article>
        <header className="mb-12 text-center">
            {imageData && (
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg aspect-video">
                <Image
                    src={imageData.imageUrl}
                    alt={imageData.description}
                    width={1200}
                    height={675}
                    data-ai-hint={imageData.imageHint}
                    className="w-full h-full object-cover"
                />
                </div>
            )}
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
            <p className="lead text-xl italic text-muted-foreground mb-8">
                "{story.snippet}"
            </p>
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
