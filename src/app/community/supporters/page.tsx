import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart, Rocket, Server, Users, Award } from 'lucide-react';
import Link from 'next/link';

const supportTiers = [
  {
    title: 'دعم البنية التحتية',
    description: 'ساهم في تغطية تكاليف الخوادم والاستضافة لضمان بقاء المنصة متاحة وسريعة للجميع.',
    icon: <Server className="h-8 w-8 text-primary" />,
  },
  {
    title: 'تطوير المحتوى',
    description: 'ادعم جهودنا في إنشاء محتوى جديد ومتنوع، من المقالات إلى الدورات والفيديوهات، لإثراء رحلة المستخدمين.',
    icon: <Rocket className="h-8 w-8 text-primary" />,
  },
  {
    title: 'توسيع المجتمع',
    description: 'ساعدنا في الوصول إلى المزيد من الأشخاص وتنظيم فعاليات وورش عمل تعزز التواصل والنمو المشترك.',
    icon: <Users className="h-8 w-8 text-primary" />,
  },
];

export default function SupportersPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <HandHeart className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          الداعمون وتسخير النعم
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          إن النعم التي نمتلكها - من مال وعلم ومنصب - هي أمانات عظمى. شكرها الحقيقي يكون بتسخيرها استراتيجيًا في حق الله وخدمة مقصده الأعظم.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {supportTiers.map((tier) => (
          <Card key={tier.title} className="text-center p-6 flex flex-col items-center shadow-md">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              {tier.icon}
            </div>
            <CardHeader className="p-2">
              <CardTitle className="font-headline text-2xl">{tier.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{tier.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
       <Card className="mb-16 bg-card border-secondary shadow-md">
        <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
                 <Award className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">ميزان التفاضل الإلهي في التسخير</CardTitle>
            <CardDescription className="max-w-3xl mx-auto text-base">
                الميزان الحقيقي للتفاضل عند الله يعتمد على صدق النية وجودة البذل، وليس على كمية الثروة. المسلم الذي سخّر القليل الذي يملكه بصدق قد يكون أعظم أجرًا من صاحب الإمكانيات الواسعة الذي اكتفى بالصلاح الشخصي. فالنعمة كلما عظمت، كان اختبارها أشد، وتطلب تسخيرًا استراتيجيًا يتناسب مع حجمها.
            </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
             <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                وقد ضرب لنا الصحابة أروع الأمثلة في ذلك، فسخر عثمان بن عفان رضي الله عنه أمواله لتجهيز جيش العسرة، وتصدق عبد الرحمن بن عوف رضي الله عنه بقافلة تجارية كاملة في سبيل الله، وهذا يثبت أن التسخير المالي يجب أن يكون بلا حدود، متناسبًا مع عظمة المقصد.
            </p>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold mb-4">
            كن شريكًا في الأجر
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            "عين اليقين" هو مشروع غير ربحي يعتمد على كرم داعميه لتسخير نعمهم في سبيل الله. إذا كنت تؤمن برسالتنا وترغب في المساهمة في استمراريتها، فإننا نرحب بدعمك.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">ادعم المشروع</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
