import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush, Mic, Video, Megaphone, UserPlus } from 'lucide-react';
import Link from 'next/link';

const contributionAreas = [
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: 'الحشد والتبليغ المباشر',
    description: 'الانضمام إلى فرق ميدانية أو إلكترونية للدعوة المباشرة، وتذكير الناس بكلمة التوحيد، وإقامة الحجة عليهم.',
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    title: 'صناعة المحتوى الإنذاري',
    description: 'هل لديك موهبة في الكتابة أو التصميم؟ ساهم بمقالات ورسومات وقصص تركز على الإنذار وضرورة العودة إلى الله.',
  },
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: 'المؤثرون والدعاة',
    description: 'إذا كان لديك صوت مسموع وتأثير، يمكنك أن تكون من المبلغين عن الله، وتستخدم منصتك للدعوة إلى سبيله.',
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: 'إنتاج المرئيات التحذيرية',
    description: 'هل تجيد المونتاج أو صناعة الفيديو؟ ساهم بإنتاج محتوى مرئي قصير ومؤثر، يركز على رسالة الإنذار والبلاغ المبين.',
  },
];

export default function VolunteersPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          توزيع مهام التذكير والحشد والتبليغ والإنذار
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          هنا يتم توزيع الأدوار للانطلاق في دعوة الناس إلى "لا إله إلا الله". هذا هو مقصد المنصة وغايتها الوحيدة والمستمرة، فكن جزءًا من هذا الواجب العظيم.
        </p>
      </div>
      
       <Card className="mb-16 bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg border-primary/20">
        <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <UserPlus className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="font-headline text-3xl font-bold mb-2">
            هل أنت مستعد لإخلاء مسؤوليتك أمام الله؟
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            "مَّنْ أَعْرَضَ عَنْهُ فَإِنَّهُ يَحْمِلُ يَوْمَ الْقِيَامَةِ وِزْرًا". لا تكن من المعرضين. انضم الآن وساهم في تبليغ الرسالة قبل فوات الأوان. قدم بياناتك ومهاراتك لنقوم بتوظيفها في المكان المناسب.
          </p>
          <Button size="lg" asChild>
            <Link href="/community/volunteers/register">سجل كمتطوع الآن</Link>
          </Button>
        </CardContent>
      </Card>


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
    </div>
  );
}
