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
            تعرف على الله: جوهر التوحيد وأقسامه
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-lg">
            <div className="space-y-2">
                <h3 className="font-bold text-xl font-headline">"لا إله إلا الله": مفتاح اليقين</h3>
                <p className="text-muted-foreground leading-relaxed">
                   إن جوهر الرسالة الإسلامية ومحورها الأساسي هو كلمة التوحيد "لا إله إلا الله". هذه الكلمة ليست مجرد ذكر، بل هي منهج حياة شامل يقوم على العلم والعمل. واليقين بها هو مصدر العزة الحقيقية، فبقدر قوة اليقين في القلب، يكون الثبات والرفعة. والتوحيد الذي تدل عليه هذه الكلمة العظيمة ينقسم إلى ثلاثة أقسام متلازمة لا ينفك بعضها عن بعض:
                </p>
            </div>
            <div className="space-y-2 border-t pt-6">
                <h3 className="font-bold text-xl font-headline">1. توحيد الربوبية: اليقين بالخالق المدبّر</h3>
                <p className="text-muted-foreground leading-relaxed">
                    هو الإقرار الجازم بأن الله تعالى هو الرب الواحد لا شريك له؛ فهو الخالق، الرازق، المالك، المحيي، المميت، المدبر لجميع الأمور. هذا النوع من التوحيد أقر به الكفار في زمن النبي ﷺ ولكنهم لم يدخلوا في الإسلام لأنهم لم يأتوا بلازمه. قال تعالى: {`"وَلَئِن سَأَلْتَهُم مَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ لَيَقُولُنَّ اللَّهُ"`} (لقمان: 25). واليقين بالربوبية هو الأساس للتسليم المطلق لأمر الله والرضا بقضائه وقدره، وهو ما يورث طمأنينة القلب عند نزول المصائب.
                </p>
            </div>
             <div className="space-y-2 border-t pt-6">
                <h3 className="font-bold text-xl font-headline">2. توحيد الألوهية (العبادة): غاية الخلق ومقتضى اليقين</h3>
                <p className="text-muted-foreground leading-relaxed">
                    هو إفراد الله تعالى بجميع أنواع العبادة، الظاهرة والباطنة، القولية والفعلية. هذا هو التوحيد الذي جاءت به الرسل ونزلت به الكتب، وهو معنى "لا إله إلا الله" الحقيقي. فلا يُدعى إلا الله، ولا يُستغاث إلا به، ولا يُتوكل إلا عليه، ولا تُصرف الصلاة أو النذر أو الذبح إلا له. قال تعالى: {`"وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ"`} (الذاريات: 56). فاليقين بالربوبية يوجب ويستلزم اليقين بالألوهية، فمن أقر بأنه الرب الخالق، لزمه أن يفرده بالعبادة.
                </p>
            </div>
             <div className="space-y-2 border-t pt-6">
                <h3 className="font-bold text-xl font-headline">3. توحيد الأسماء والصفات: اليقين بكمال الله المطلق</h3>
                <p className="text-muted-foreground leading-relaxed">
                    هو الإيمان بما وصف الله به نفسه في كتابه، وما وصفه به رسوله ﷺ من الأسماء الحسنى والصفات العلى، وإثباتها لله على الوجه الذي يليق بجلاله وعظمته، من غير تحريف ولا تعطيل، ومن غير تكييف ولا تمثيل. اليقين بهذا الباب يورث المحبة والتعظيم لله في القلب، فعندما تعلم أنه السميع البصير، فإنك تستحي أن يرى منك ما يكره أو يسمع منك ما يغضبه. قال تعالى: {`"لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ"`} (الشورى: 11).
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
