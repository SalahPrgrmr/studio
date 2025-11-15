import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, Play, Clock, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const audioContent = [
  {
    id: 1,
    title: 'تأمل: سكون القلب',
    speaker: 'نور الإيمان',
    duration: '15 دقيقة',
    category: 'تأمل',
  },
  {
    id: 2,
    title: 'محاضرة: أثر أسماء الله الحسنى في زيادة اليقين',
    speaker: 'أحمد الحكيم',
    duration: '45 دقيقة',
    category: 'محاضرة',
  },
  {
    id: 3,
    title: 'بودكاست: حوار مع باحث في الإعجاز العلمي',
    speaker: 'فريق المنصة',
    duration: '30 دقيقة',
    category: 'بودكاست',
  },
];

export default function AudioLibraryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Headphones className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          المكتبة الصوتية
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          استمع بقلبك وروحك لمحتوى صوتي يهدئ النفس وينير العقل.
        </p>
      </div>

      <div className="space-y-6">
        {audioContent.map((audio) => (
          <Card key={audio.id} className="flex flex-col md:flex-row items-center justify-between p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex-1 mb-4 md:mb-0">
              <Badge variant="secondary" className="mb-2">{audio.category}</Badge>
              <CardTitle className="font-headline text-xl mb-2">{audio.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground space-x-4 space-x-reverse">
                <span className="flex items-center gap-1"><Mic className="h-4 w-4" /> {audio.speaker}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {audio.duration}</span>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Button className="w-full md:w-auto" disabled>
                <Play className="ml-2 h-5 w-5" />
                استمع الآن (قريبًا)
              </Button>
            </div>
          </Card>
        ))}
      </div>
       <div className="text-center mt-16">
        <p className="text-muted-foreground">يتم العمل على إضافة المزيد من المحتوى الصوتي قريبًا!</p>
      </div>
    </div>
  );
}
