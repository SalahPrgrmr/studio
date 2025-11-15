import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { stories } from '@/lib/stories-data';
import { PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoriesPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => {
          const imageData = PlaceHolderImages.find(img => img.id === story.imageId);
          return (
            <Link href={`/stories/${story.id}`} key={story.id} className="block group">
              <Card className="flex flex-col overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 transform group-hover:-translate-y-1 h-full">
                {imageData && (
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <Image
                      src={imageData.imageUrl}
                      alt={imageData.description}
                      width={600}
                      height={400}
                      data-ai-hint={imageData.imageHint}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{story.title}</CardTitle>
                  <CardDescription>بواسطة {story.author}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground italic">"{story.snippet}"</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
