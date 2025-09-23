import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush, Mic, Film, Heart } from 'lucide-react';

const contributionAreas = [
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    title: 'صناعة المحتوى',
    description: 'هل لديك موهبة في الكتابة أو التصميم؟ ساهم بمقالات أو رسومات أو قصص ملهمة تثري رحلة الآخرين نحو اليقين.',
  },
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: 'المؤثرون والسفراء',
    description: 'إذا كان لديك صوت مسموع وتأثير إيجابي، يمكنك أن تكون سفيرًا لـ "مسار اليقين" وتساعد في نشر رسالتنا.',
  },
  {
    icon: <Film className="h-8 w-8 text-primary" />,
    title: 'إنتاج الفيديو',
    description: 'هل تجيد المونتاج أو صناعة الفيديو؟ ساهم بإنتاج محتوى مرئي جذاب يساعد على توصيل المفاهيم بطريقة مؤثرة.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'الدعم المجتمعي',
    description: 'كن جزءًا من فريق الدعم الذي يساعد الأعضاء الجدد، ويجيب على استفساراتهم، ويحافظ على بيئة إيجابية وداعمة.',
  },
];

export default function VolunteersPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          المتطوعون والمؤثرون
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          كن جزءًا من التغيير الإيجابي. انضم إلينا للمساهمة في بناء ونشر رسالة اليقين.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {contributionAreas.map((area, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">{area.icon}</div>
              <CardTitle className="font-headline text-xl">{area.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{area.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center bg-card p-8 rounded-lg shadow-inner">
        <h2 className="font-headline text-3xl font-bold mb-4">
          هل أنت مستعد للمساهمة؟
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed mb-6">
          إذا كنت ترى أن لديك الموهبة أو الشغف للمساهمة في أي من هذه المجالات، يسعدنا أن نسمع منك. تواصل معنا لنبدأ معًا.
        </p>
        <Button size="lg" disabled>
          تواصل معنا (قريبًا)
        </Button>
      </div>
    </div>
  );
}
