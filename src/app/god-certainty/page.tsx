import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';

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

      <Card className="my-16 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold flex items-center gap-3">
             <Star className="h-8 w-8 text-primary" />
            تعرف على الله: التأسيس العقدي لرحلة اليقين
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
            <div className="space-y-2">
                <h3 className="font-bold text-xl font-headline">"لا إله إلا الله": جوهر الوجود ومفتاح العزة</h3>
                <p className="text-muted-foreground leading-relaxed">
                   إن جوهر الرسالة الإسلامية ومحورها الأساسي هو كلمة التوحيد "لا إله إلا الله". هذه الكلمة ليست مجرد ذكر، بل هي منهج حياة شامل يوجب تسليم الأمر كله للخالق، والإقرار بسلطانه المطلق على جميع جوانب وجودنا. اليقين بهذه الكلمة هو مصدر العزة الحقيقية، فبقدر قوة اليقين في القلب، يكون الثبات والرفعة.
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-bold text-xl font-headline">الغاية الكبرى: العبودية الكاملة ومقصد الخلق</h3>
                <p className="text-muted-foreground leading-relaxed">
                    الغاية من خلقنا هي العبادة المطلقة: {`وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ`}. هذه العبادة هي منهج حياة يصوغ كل شيء وفق قواعد التوحيد. وقد ربط الله بين العبادة والرزق ليحرر القلب من عبودية الأسباب، مؤكداً: {`إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ`}. فالإقرار بأن الله هو الرزاق وحده يمنح النفس طمأنينة للانطلاق في العمل بيقين.
                </p>
            </div>
             <div className="space-y-2">
                <h3 className="font-bold text-xl font-headline">التوحيد شرط قبول العمل والإخلاص (العبادة الاقتصادية)</h3>
                <p className="text-muted-foreground leading-relaxed">
                    لا يقبل الله أي عمل إلا إذا صدر من موحد وكان خالصًا لوجهه. الشريعة لا تفصل بين "الدنيوي" و"الديني"، بل تدمج الرزق ضمن إطار العبادة. فالتجارة والعمل المهني يجب أن يخضعا للمنهج الإلهي، وبهذا تتحول التخصصات الدنيوية إلى وظائف دعوية مقدسة، حيث يصبح كل محترف داعية في مجاله.
                </p>
            </div>
             <div className="space-y-2">
                <h3 className="font-bold text-xl font-headline">صدق وعوده</h3>
                <p className="text-muted-foreground leading-relaxed">
                    إن الله لا يخلف الميعاد. كل ما وعد به في كتبه ورسله هو حق ويقين. وعده بالجزاء للمحسنين، والعقاب للمسيئين، والنصر للمؤمنين، واستجابة الدعاء هي وعود صادقة لا تتغير ولا تتبدل، مما يمنح القلب ثقة وطمأنينة.
                </p>
            </div>
        </CardContent>
      </Card>

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
