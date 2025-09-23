import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart, Rocket, Server, Users } from 'lucide-react';

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
          الداعمون والرعاة
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          بفضل دعمكم، نستطيع الاستمرار في تقديم هذه الخدمة وتطويرها. كل مساهمة، مهما كانت صغيرة، تحدث فرقًا كبيرًا.
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

      <Card className="bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold mb-4">
            كن شريكًا في النجاح
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            "مسار اليقين" هو مشروع غير ربحي يعتمد على كرم داعميه. إذا كنت تؤمن برسالتنا وترغب في المساهمة في استمراريتها، فإننا نرحب بدعمك.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
            ادعم المشروع (قريبًا)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
