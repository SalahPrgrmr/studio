import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, PlayCircle, Eye } from 'lucide-react';
import Image from 'next/image';

const videoContent = [
  {
    id: 1,
    title: 'فيلم وثائقي: دقة الخلق في عالم النمل',
    presenter: 'قناة وثائقية',
    viewers: '1.2 مليون',
    thumbnailUrl: 'https://picsum.photos/seed/libvideo1/600/400',
    thumbnailHint: 'ant colony documentary',
  },
  {
    id: 2,
    title: 'ورشة عمل مسجلة: كيف تبني عادة التفكر اليومي؟',
    presenter: 'د. علي القاسم',
    viewers: '87 ألف',
    thumbnailUrl: 'https://picsum.photos/seed/libvideo2/600/400',
    thumbnailHint: 'person journaling sunrise',
  },
  {
    id: 3,
    title: 'رسوم متحركة: رحلة قطرة ماء',
    presenter: 'استوديو إبداع',
    viewers: '3.5 مليون',
    thumbnailUrl: 'https://picsum.photos/seed/libvideo3/600/400',
    thumbnailHint: 'water drop animation',
  },
];

export default function VideoLibraryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Video className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مكتبة الفيديو
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          شاهد محتوى مرئيًا يجمع بين الإلهام والمعرفة ليعمق فهمك لآيات الكون.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoContent.map((video) => (
          <Card key={video.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-video relative">
               <Image 
                src={video.thumbnailUrl} 
                alt={video.title} 
                fill 
                className="object-cover"
                data-ai-hint={video.thumbnailHint}
                />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 right-4 text-white flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4" />
                <span>{video.viewers}</span>
               </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{video.title}</CardTitle>
              <CardDescription>تقديم: {video.presenter}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                <PlayCircle className="ml-2 h-5 w-5" />
                شاهد الآن (قريبًا)
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="text-center mt-16">
        <p className="text-muted-foreground">يتم العمل على إضافة المزيد من الفيديوهات قريبًا!</p>
      </div>
    </div>
  );
}
