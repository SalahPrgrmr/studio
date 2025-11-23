'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, HandHeart, Mic, Paintbrush, Languages, Code, Megaphone, Video } from 'lucide-react';
import Link from 'next/link';

const contributionAreas = [
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: 'التبليغ والدعوة',
    description: 'المشاركة في نشر رسالة التوحيد بشكل مباشر أو إلكتروني، وإقامة الحجة على الناس بالحكمة والموعظة الحسنة.',
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    title: 'صناعة المحتوى',
    description: 'لديك موهبة في الكتابة أو التصميم؟ ساهم بمقالات، رسومات، أو قصص تعمق مفهوم اليقين وتدعو إلى الله.',
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: 'الإنتاج الإعلامي',
    description: 'هل تجيد المونتاج أو صناعة الفيديو؟ ساهم بإنتاج محتوى مرئي مؤثر يخدم رسالة المنصة.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: 'الترجمة',
    description: 'هل تتقن لغات أخرى؟ ساعدنا في ترجمة محتوى المنصة لنصل برسالة اليقين إلى كل إنسان.',
  },
    {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: 'المؤثرون والدعاة',
    description: 'إذا كان لديك صوت مسموع وتأثير، يمكنك أن تكون من المبلغين عن الله، وتستخدم منصتك للدعوة إلى سبيله.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'التطوير التقني',
    description: 'هل أنت مطور أو مصمم واجهات؟ ساهم بمهاراتك في تحسين وتطوير المنصة وتجربة المستخدم.',
  }
];

export default function VolunteersPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
         <HandHeart className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          كن من جنود اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          "مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً". سخّر ما أنعم الله به عليك من علم أو مال أو وقت لخدمة أعظم قضية: تبليغ رسالة التوحيد.
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


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

       <Card className="shadow-lg bg-card border-border mt-16">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">شروط الانضمام لفريق العمل</CardTitle>
            <CardDescription>لضمان تحقيق رسالتنا بأمانة وفعالية، نلتزم بمجموعة من المبادئ عند انضمام أي فرد لفريق العمل (سواء كمتطوع أو شريك):</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h4 className="font-bold">1. اليقين والإخلاص:</h4>
                <p className="text-muted-foreground">أن يكون الهدف الأساسي للمنضم هو ابتغاء وجه الله، وأن يكون على قدر من اليقين بالرسالة التي تحملها المنصة. ففاقد الشيء لا يعطيه.</p>
            </div>
             <div>
                <h4 className="font-bold">2. المعرفة والمهارة:</h4>
                <p className="text-muted-foreground">أن يمتلك المعرفة الكافية والمهارة اللازمة للمساهمة في المجال الذي يرغب بالتطوع فيه.</p>
            </div>
             <div>
                <h4 className="font-bold">3. الالتزام بالمبادئ:</h4>
                <p className="text-muted-foreground">الالتزام الكامل بشروط وأحكام المنصة، والحفاظ على مبدأ الحياد والتركيز على الهدف الأسمى دون الانجرار إلى خلافات جانبية.</p>
            </div>
             <div>
                <h4 className="font-bold">4. روح الجماعة:</h4>
                <p className="text-muted-foreground">العمل بروح الفريق الواحد، والحرص على تقوية الجماعة وتوحيد الجهود بدلاً من شق الصف أو إنشاء كيانات موازية تضعف العمل.</p>
            </div>
             <div className="text-center pt-4">
                <Button variant="outline" asChild>
                    <Link href="/terms-of-service">قراءة الشروط الكاملة</Link>
                </Button>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
