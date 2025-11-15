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
    Heart
} from "lucide-react";

const tangibleBlessings = [
    {
        icon: <Sun className="h-8 w-8 text-primary" />,
        title: "نعم ظاهرة",
        description: "الصحة، الرزق، الأمان، والأسرة. نعم نراها ونلمسها كل يوم وهي دليل على رحمة الله ورعايته المستمرة.",
    },
    {
        icon: <Brain className="h-8 w-8 text-primary" />,
        title: "نعم باطنة",
        description: "الإيمان، الهداية، الرضا، وسكينة القلب. نعم تسكن في الروح ولا تقدر بثمن، وهي أساس السعادة الحقيقية.",
    },
];

const godSigns = [
    {
        icon: <User className="h-8 w-8 text-primary" />,
        title: "في الإنسان",
        description: "خلق الإنسان في أحسن تقويم، وتعقيد الجسد والروح، والقدرة على التفكير والشعور.",
    },
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "في السماء والأرض",
        description: "تعاقب الليل والنهار، ونزول المطر، وإحياء الأرض بعد موتها، كلها آيات لقوم يتفكرون.",
    },
    {
        icon: <MoonStar className="h-8 w-8 text-primary" />,
        title: "في الفلك",
        description: "حركة الكواكب والنجوم في مسارات دقيقة، واتساع الكون الذي لا ندرك أبعاده.",
    },
    {
        icon: <Waves className="h-8 w-8 text-primary" />,
        title: "في البحار",
        description: "عجائب الأعماق، والكائنات المتنوعة، وحفظ توازن المياه على الكوكب.",
    },
    {
        icon: <Bug className="h-8 w-8 text-primary" />,
        title: "في المخلوقات",
        description: "من أصغر حشرة إلى أكبر حيوان، كل مخلوق يسبح بحمد خالقه ويدل على عظمته.",
    },
    {
        icon: <Gem className="h-8 w-8 text-primary" />,
        title: "في الإتقان",
        description: "كل شيء في الكون مصنوع بإتقان وحكمة، لا ترى في خلق الرحمن من تفاوت.",
    },
    {
        icon: <Scale className="h-8 w-8 text-primary" />,
        title: "في القضاء والقدر",
        description: "جريان أحداث الحياة وفق حكمة إلهية، وأن كل ما يصيب الإنسان هو خير له وإن بدا غير ذلك.",
    },
    {
        icon: <LifeBuoy className="h-8 w-8 text-primary" />,
        title: "في البعث والنشور",
        description: "الموت والحياة، والوعد بالبعث بعد الموت للحساب والجزاء، آية اليقين الكبرى.",
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
                <p className="text-muted-foreground">{blessing.description}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {godSigns.map((sign) => (
            <Card key={sign.title} className="text-center p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{sign.icon}</div>
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="font-headline text-xl">{sign.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground text-sm">{sign.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
