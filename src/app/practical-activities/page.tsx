import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookHeart, Sprout, Headphones, HandHeart, Users, PowerOff, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const activities = [
  {
    icon: <BookHeart className="h-8 w-8 text-primary" />,
    title: "يوميات الامتنان والشكر",
    description: "خصص 5 دقائق كل يوم لكتابة ثلاثة أشياء على الأقل أنت ممتن لوجودها في حياتك. هذا التمرين يعمق الشعور بنعم الله التي لا تحصى.",
    buttonLabel: "ابدأ التدوين (قريبًا)",
    buttonLink: "#"
  },
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    title: "خلوة التفكر في الطبيعة",
    description: "اخرج إلى مكان طبيعي، حديقة أو شاطئ، وتأمل في خلق الله. راقب التفاصيل الدقيقة في ورقة شجر أو حركة السحاب. اربط بين جمال الخلق وعظمة الخالق.",
    buttonLabel: "شاهد آيات الكون",
    buttonLink: "/blessings-and-signs"
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "جلسة استماع وتدبر",
    description: "اختر سورة قصيرة من القرآن، واستمع إليها بقلب حاضر وتركيز كامل. حاول فهم رسالة واحدة من السورة وتأثيرها على حياتك.",
    buttonLabel: "اذهب للمكتبة الصوتية",
    buttonLink: "/library/audio"
  },
  {
    icon: <HandHeart className="h-8 w-8 text-primary" />,
    title: "مبادرة عطاء صغيرة",
    description: "قم بعمل خيري بسيط بنية خالصة، مثل إطعام طائر، أو مساعدة محتاج، أو حتى الابتسامة في وجه أخيك. العمل الصالح يجسد الإيمان ويقوي اليقين.",
    buttonLabel: "انضم للمتطوعين",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "حلقة نقاش إيمانية",
    description: "شارك في إحدى غرف النقاش الصوتية أو المنتدى. الحوار مع الآخرين حول مفاهيم الإيمان واليقين يفتح آفاقًا جديدة للمعرفة ويزيد من الثبات.",
    buttonLabel: "انضم للمجتمع",
    buttonLink: "/community"
  },
  {
    icon: <PowerOff className="h-8 w-8 text-primary" />,
    title: "ساعة خلوة رقمية",
    description: "خصص ساعة واحدة في يومك لقطع الاتصال بالإنترنت ووسائل التواصل. استثمر هذا الوقت في الصلاة، أو الذكر، أو مجرد الجلوس في هدوء مع نفسك.",
    buttonLabel: "جرب الإرشاد الذاتي",
    buttonLink: "/self-guidance"
  },
];

export default function PracticalActivitiesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Activity className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          أنشطة عملية لترسيخ اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          اليقين ينمو بالعمل والتطبيق. اختر نشاطًا وابدأ اليوم في رحلتك العملية لتقوية إيمانك وتعميق اتصالك بالله.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Card key={activity.title} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="items-center text-center p-6">
              <div className="p-4 bg-primary/10 rounded-full mb-4">{activity.icon}</div>
              <CardTitle className="font-headline text-2xl">{activity.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
            </CardContent>
            <div className="p-6 pt-0 text-center">
                <Button asChild>
                    <Link href={activity.buttonLink}>{activity.buttonLabel}</Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>

       <Card className="mt-20 bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold mb-4">
            الاستمرارية هي المفتاح
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            قليل دائم خير من كثير منقطع. اختر نشاطًا أو اثنين والتزم بهما بانتظام لترى الأثر الحقيقي في قلبك وحياتك. كل خطوة، مهما كانت صغيرة، هي خطوة نحو الله.
          </p>
          <Button size="lg" asChild>
            <Link href="/journey-of-certainty">راجع خارطة طريق اليقين</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
