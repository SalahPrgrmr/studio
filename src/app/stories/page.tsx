import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Story = {
  title: string;
  author: string;
  snippet: string;
  imageId: string;
};

const stories: Story[] = [
  {
    title: "Finding Peace in the Chaos",
    author: "Alex Johnson",
    snippet: "Through introspection and guidance, I discovered a core of certainty that transformed my anxiety into profound peace. Life's storms still come, but now I have an anchor.",
    imageId: "story-1"
  },
  {
    title: "From Doubt to Decisive Action",
    author: "Maria Garcia",
    snippet: "I was paralyzed by 'what-ifs'. The journey to certainty helped me define my values, and now I make choices with confidence and purpose, celebrating each step forward.",
    imageId: "story-2"
  },
  {
    title: "Reconnecting with My Community",
    author: "David Chen",
    snippet: "Feeling lost and isolated, I sought certainty and found it not just within, but in the connections I rebuilt with those around me. True strength is shared.",
    imageId: "story-3"
  },
  {
    title: "A New Perspective on a Lifelong Path",
    author: "Fatima Al-Fassi",
    snippet: "My faith was a cornerstone of my life, but I had questions. This journey didn't replace my beliefs but deepened them, providing a certainty that feels both ancient and new.",
    imageId: "story-4"
  },
  {
    title: "The Clarity to Change Careers",
    author: "Sam O'Connell",
    snippet: "I felt unfulfilled but was too scared to leave my stable job. Finding certainty in my personal mission gave me the courage to pursue a career that aligns with my soul.",
    imageId: "story-5"
  },
  {
    title: "Unlocking My Creative Potential",
    author: "Chloe Dubois",
    snippet: "My creative voice was blocked by self-doubt. By finding certainty in my own worth and vision, I was able to silence the inner critic and create art that feels truly mine.",
    imageId: "story-6"
  },
];


export default function StoriesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Stories of Transformation
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Read inspiring accounts from individuals who have found their path to certainty.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => {
          const imageData = PlaceHolderImages.find(img => img.id === story.imageId);
          return (
            <Card key={story.title} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
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
                <CardDescription>By {story.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground italic">"{story.snippet}"</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
