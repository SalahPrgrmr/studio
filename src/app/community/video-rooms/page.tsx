import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Clapperboard, PlayCircle, Eye } from 'lucide-react';
import Image from 'next/image';

const videoStreams = [
  {
    id: 1,
    title: 'ورشة عمل: خطوات عملية لزيادة اليقين',
    presenter: 'د. علي القاسم',
    viewers: 345,
    thumbnailUrl: 'https://picsum.photos/seed/video1/600/400',
    thumbnailHint: 'workshop presentation',
  },
  {
    id: 2,
    title: 'بث مباشر: رحلة عبر آيات الكون المرئية',
    presenter: 'فاطمة الزهراء',
    viewers: 512,
    thumbnailUrl: 'https://picsum.photos/seed/video2/600/400',
    thumbnailHint: 'galaxy stars',
  },
  {
    id: 3,
    title: 'لقاء مع مؤثر: قصة تحول ملهمة',
    presenter: 'عمر شريف',
    viewers: 890,
    thumbnailUrl: 'https://picsum.photos/seed/video3/600/400',
    thumbnailHint: 'inspirational speaker',
  },
];

export default function VideoRoomsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Video className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          غرف البث المرئي
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          شاهد ورش عمل ولقاءات مباشرة تساهم في تعميق فهمك لرحلة اليقين.
        </p>
      </div>

       <div className="text-center mb-12">
        <Button size="lg" disabled>
          <Clapperboard className="ml-2 h-5 w-5" />
          ابدأ بثًا جديدًا (قريبًا)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoStreams.map((stream) => (
          <Card key={stream.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-video relative">
               <Image 
                src={stream.thumbnailUrl} 
                alt={stream.title} 
                fill 
                className="object-cover"
                data-ai-hint={stream.thumbnailHint}
                />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 right-4 text-white flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4" />
                <span>{stream.viewers}</span>
               </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{stream.title}</CardTitle>
              <CardDescription>تقديم: {stream.presenter}</CardDescription>
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
        <p className="text-muted-foreground">ميزة البث المرئي قيد التطوير وستتوفر قريبًا!</p>
      </div>
    </div>
  );
}
