import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const certaintyTopics = [
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'اليقين بوجود الله ووحدانيته',
    description:
      'الإيمان الراسخ بوجود خالق واحد لهذا الكون، المتصرف فيه بكل حكمة وعدل. هذا اليقين هو أساس كل خير ومصدر الطمأنينة الحقيقية.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'اليقين بأسمائه وصفاته',
    description:
      'معرفة أسماء الله الحسنى وصفاته العليا تزيد من محبته وتعظيمه في القلب. اليقين بأنه الرحمن الرحيم، القوي العزيز، يمنح المؤمن الأمان والثقة.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'اليقين بكلماته (القرآن الكريم)',
    description:
      'التصديق الكامل بأن القرآن الكريم هو كلام الله المنزل، فيه الهدى والنور والشفاء. تدبر آياته والعمل بها هو طريق اليقين والنجاة.',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'ثمار اليقين بالله',
    description:
      'اليقين يثمر الرضا بقضاء الله، الشجاعة في مواجهة الحياة، السكينة في القلب، والعمل الصالح الذي يرضي الله و ينفع الناس.',
  },
];

export default function GodCertaintyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          اليقين بالله وكلماته
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          أساس الرحلة الروحية ومصدر الطمأنينة والقوة الداخلية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certaintyTopics.map((topic, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">{topic.icon}</div>
              <CardTitle className="font-headline text-2xl">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">
                {topic.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-inner">
          <h2 className="font-headline text-3xl font-bold mb-4">
            كيف تصل إلى اليقين؟
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
            الطريق إلى اليقين رحلة تبدأ بالدعاء الصادق، وتستمر بالتفكر في خلق السماوات والأرض، وتتعمق بقراءة القرآن وتدبر معانيه، وتكتمل بالعمل الصالح ومصاحبة أهل الخير. إنها رحلة قلب وروح تسعى للقرب من الله.
          </p>
        </div>
    </div>
  );
}
