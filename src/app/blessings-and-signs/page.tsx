import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
    Gift, 
    Eye, 
    Sparkles, 
    User, 
    Globe, 
    MoonStar, 
    Waves, 
    Bug, 
    Gem, 
    Scale, 
    LifeBuoy,
    Sun,
    Brain,
    Heart,
    Wind,
    Droplets
} from "lucide-react";

const tangibleBlessings = [
    {
        icon: <Sun className="h-8 w-8 text-primary" />,
        title: "النعم الظاهرة",
        description: "هي كل ما نراه ونلمسه ونعيشه في كل لحظة. نعمة الصحة التي تسري في أجسادنا، والأمان في بيوتنا، والطعام والشراب الذي لا ينقطع. نعمة البصر الذي نرى به جمال الخلق، والسمع الذي نسمع به أصوات من نحب، واللسان الذي ننطق به. كلها عطايا محسوسة، برهان على رعاية الله التي تحيط بنا.",
    },
    {
        icon: <Brain className="h-8 w-8 text-primary" />,
        title: "النعم الباطنة",
        description: "هي كنوز الروح وأغلى العطايا. على رأسها نعمة الإيمان التي تملأ القلب نورًا، والهداية التي ترشدنا في دروب الحياة، والرضا الذي يجعلنا نتقبل أقدار الله بحب وطمأنينة، والسكينة التي لا تقدر بثمن. هي نعم تسكن أعماقنا وتشكل أساس السعادة الحقيقية التي لا تزول.",
    },
];

const godSigns = [
    {
        icon: <User className="h-8 w-8 text-primary" />,
        title: "آياته في خلق الإنسان",
        description: "خُلقنا في أحسن تقويم؛ من أجهزتنا المعقدة كالدماغ والقلب التي تعمل بانتظام دون تدخل منا، إلى أرواحنا التي هي سر من أسرار الله. قدرتنا على التفكير، والحب، والإبداع، كلها آيات تدل على عظمة الخالق ودقة صنعه.",
    },
    {
        icon: <Eye className="h-8 w-8 text-primary" />,
        title: "آياته في الحواس",
        description: "لكل حاسة عالمها الخاص. العين التي تلتقط ملايين الألوان، والأذن التي تميز بين آلاف الأصوات، والأنف الذي يشم الروائح، واللسان الذي يتذوق الأطعمة. كل حاسة هي نافذة على إبداع الخالق الذي لا حدود له.",
    },
     {
        icon: <Heart className="h-8 w-8 text-primary" />,
        title: "آياته في العقل والروح",
        description: "القدرة على التفكير المجرد، والوعي بالذات، والشعور بالحب والرحمة. الروح التي تحرك الجسد وتتوق إلى الخلود. هذه الأبعاد غير المادية فينا هي من أعظم الآيات التي تشير إلى أننا لسنا مجرد أجساد.",
    },
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "آياته في السماء والأرض",
        description: "تعاقب الليل والنهار بنظام دقيق لا يختل، ونزول المطر الذي يحيي الأرض بعد موتها، والجبال الشاهقة التي تحفظ توازنها، والأنهار التي تجري. كلها لوحات فنية عظيمة تشهد بوحدانية خالقها.",
    },
    {
        icon: <MoonStar className="h-8 w-8 text-primary" />,
        title: "آياته في الفلك",
        description: "كل كوكب ونجم ومجرة تسبح في فلكها بدقة متناهية لا تتخلف. هذا الاتساع الهائل للكون الذي لا ندرك أبعاده هو شاهد صامت على قدرة الخالق المطلقة وعلمه الذي أحاط بكل شيء.",
    },
    {
        icon: <Waves className="h-8 w-8 text-primary" />,
        title: "آياته في البحار",
        description: "عجائب الأعماق التي لا تزال تدهشنا، والكائنات البحرية المتنوعة، وحفظ توازن الملوحة والعذوبة، والحاجز بين البحرين الذي لا يبغيان. كلها آيات تدل على تدبير محكم وقدرة لا تُغلب.",
    },
    {
        icon: <Bug className="h-8 w-8 text-primary" />,
        title: "آياته في أصغر المخلوقات",
        description: "من أصغر حشرة ونظامها الاجتماعي المعقد، إلى الخلية الحية التي هي مصنع متكامل. في كل كائن صغير، مهما بلغ حجمه، كون من الإتقان والعجائب يروي قصة عظمة خالقه.",
    },
    {
        icon: <Droplets className="h-8 w-8 text-primary" />,
        title: "آياته في قطرة الماء",
        description: "هذا السائل العجيب الذي هو أساس كل شيء حي. خصائصه الفريدة، وقدرته على حمل الحياة، ودورته الدقيقة بين السماء والأرض، كلها آيات تدل على حكمة المصمم.",
    },
     {
        icon: <Wind className="h-8 w-8 text-primary" />,
        title: "آياته في الرياح",
        description: "تسخير الهواء لنقل السحاب، وتلقيح النبات، وتوليد الطاقة. الرياح، التي لا نراها ولكن نشعر بأثرها، هي جند من جنود الله تذكرنا بوجود القوى غير المرئية التي تحرك الكون.",
    },
    {
        icon: <Gem className="h-8 w-8 text-primary" />,
        title: "آياته في الإتقان والجمال",
        description: "تأمل في ورقة شجر، أو جناح فراشة، أو ندفة ثلج. لا ترى في خلق الرحمن من تفاوت أو خلل. كل شيء مصنوع بحكمة وإتقان وجمال لا مثيل له، مما يغذي الروح والقلب.",
    },
    {
        icon: <Scale className="h-8 w-8 text-primary" />,
        title: "آياته في القضاء والقدر",
        description: "جريان أحداث حياتنا ضمن حكمة إلهية قد لا ندركها في حينها. اليقين بأن كل ما يصيبنا هو خير لنا، وإن بدا في ظاهره شرًا، هو من أعظم أبواب الطمأنينة والثقة بالمدبر الحكيم.",
    },
    {
        icon: <LifeBuoy className="h-8 w-8 text-primary" />,
        title: "آياته في البعث والنشور",
        description: "كما يحيي الله الأرض بعد موتها بإنزال المطر، فإنه قادر على إحيائنا بعد الموت. الوعد بالبعث للحساب والجزاء هو آية اليقين الكبرى التي تضع لحياتنا معنى وهدفًا وتجعل للعدل كلمة الفصل.",
    },
];

export default function BlessingsAndSignsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          نعم الله وآياته
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          التفكر في نعم الله وآياته في الكون هو أقصر طريق لزيادة اليقين وترسيخ الإيمان في القلب.
        </p>
      </div>

      {/* Blessings Section */}
      <div className="mb-20">
        <h2 className="font-headline text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Gift className="h-8 w-8 text-primary" />
          نعم الله التي لا تحصى
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tangibleBlessings.map((blessing) => (
            <Card key={blessing.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center text-center p-6">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{blessing.icon}</div>
                <CardTitle className="font-headline text-2xl">{blessing.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">{blessing.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Signs Section */}
      <div>
        <h2 className="font-headline text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Eye className="h-8 w-8 text-primary" />
            آيات الله في الآفاق والأنفس
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {godSigns.map((sign) => (
            <Card key={sign.title} className="text-center p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{sign.icon}</div>
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="font-headline text-xl">{sign.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground text-sm leading-relaxed">{sign.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
