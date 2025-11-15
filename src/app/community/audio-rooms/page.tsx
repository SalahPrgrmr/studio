import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Mic, Headphones, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const audioRooms = [
  {
    id: 1,
    title: 'جلسة تأمل وتفكر صوتية',
    host: 'نور الإيمان',
    listeners: 128,
    tags: ['تأمل', 'هدوء'],
  },
  {
    id: 2,
    title: 'نقاش مفتوح: كيف نجد اليقين في عالم متغير؟',
    host: 'أحمد الحكيم',
    listeners: 76,
    tags: ['نقاش', 'فلسفة'],
  },
  {
    id: 3,
    title: 'قراءة وتفسير آيات كونية',
    host: 'فريق المنصة',
    listeners: 92,
    tags: ['قرآن', 'تفكر'],
  },
];

export default function AudioRoomsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Radio className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          غرف الدردشة الصوتية
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          انضم إلى محادثات مباشرة، استمع للخبراء، وشارك أفكارك مع المجتمع.
        </p>
      </div>

      <div className="text-center mb-12">
        <Button size="lg" disabled>
          <Mic className="ml-2 h-5 w-5" />
          ابدأ غرفة جديدة (قريبًا)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {audioRooms.map((room) => (
          <Card key={room.id} className="flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{room.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-2">
                <User className="h-4 w-4" />
                بإدارة: {room.host}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center text-muted-foreground">
                <Headphones className="ml-2 h-5 w-5" />
                <span>{room.listeners} مستمع</span>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                {room.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardContent>
            <div className="p-6 pt-0">
                <Button className="w-full" disabled>انضم الآن (قريبًا)</Button>
            </div>
          </Card>
        ))}
      </div>
       <div className="text-center mt-16">
        <p className="text-muted-foreground">ميزة الغرف الصوتية قيد التطوير وستتوفر قريبًا!</p>
      </div>
    </div>
  );
}
