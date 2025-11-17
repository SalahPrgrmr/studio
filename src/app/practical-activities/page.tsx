import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookHeart, Sprout, Headphones, HandHeart, Users, PowerOff, Activity, Megaphone, Film, Clapperboard, Video, Briefcase, DollarSign, PenTool, Tv, Rocket, Brush, Globe, Languages, View, Box, HelpCircle } from "lucide-react";
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
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: "النشر النصي الدعوي",
    description: "كن جزءًا من الجهد الدعوي عبر نشر رسائل التذكير، الحشد، التبليغ، والإنذار. كل رسالة تنشرها هي سهم في سبيل الله تساهم به في إقامة الحجة.",
    buttonLabel: "انضم لفرق التبليغ",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Film className="h-8 w-8 text-primary" />,
    title: "نشر الوسائط الدعوية",
    description: "ساهم في نشر مقاطع الفيديو والصوتيات والصور التي تذكر بالله وتدعو إلى اليقين. كل مادة تنشرها هي نور يصل إلى قلوب قد تكون في أمس الحاجة إليه.",
    buttonLabel: "اكتشف مكتبة الوسائط",
    buttonLink: "/library"
  },
  {
    icon: <Clapperboard className="h-8 w-8 text-primary" />,
    title: "المشاركة في البث المباشر",
    description: "شارك في المحاضرات والبثوث المباشرة، أو انضم للغرف الصوتية والمرئية. تفاعلك المباشر يثري النقاش ويساهم في نشر الوعي.",
    buttonLabel: "اذهب إلى غرف البث",
    buttonLink: "/community/video-rooms"
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: "إنتاج سلسلة تدعم اليقين",
    description: "هل أنت صانع محتوى؟ استخدم موهبتك في إنتاج سلسلة مرئية، مكتوبة أو صوتية مبتكرة تشرح أحد مفاهيم اليقين بطريقة جذابة ومؤثرة.",
    buttonLabel: "ساهم بموهبتك",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "تمويل ومتابعة مشروع يقين",
    description: "ساهم في تمويل ورعاية مشاريع المنصة الدعوية والتعليمية، وتابع أثرها لتكون شريكًا استراتيجيًا في نشر رسالة اليقين على نطاق أوسع.",
    buttonLabel: "كن من الداعمين",
    buttonLink: "/community/supporters"
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "القيادة والإشراف على المشاريع",
    description: "إذا كنت تملك الخبرة في إدارة المشاريع والقيادة، يمكنك المساهمة في الإشراف على مبادرات ومشاريع المنصة لضمان تحقيق أهدافها بكفاءة.",
    buttonLabel: "انضم كقائد مشروع",
    buttonLink: "/community/volunteers"
  },
   {
    icon: <Tv className="h-8 w-8 text-primary" />,
    title: "إنتاج الميديا للمنصة",
    description: "هل لديك خبرة في المونتاج، الرسوم المتحركة، أو إنتاج الصوتيات؟ ساهم في إنتاج محتوى إعلامي عالي الجودة يعزز رسالة اليقين ويصل لجمهور أوسع.",
    buttonLabel: "ساهم في الإنتاج",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "التسويق والعلاقات العامة",
    description: "لديك خبرة في التسويق الرقمي أو العلاقات العامة؟ ساعدنا في بناء استراتيجيات لنشر رسالة المنصة، والوصول إلى الشركاء، وتوسيع قاعدة المتابعين.",
    buttonLabel: "انضم لفريق التسويق",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Brush className="h-8 w-8 text-primary" />,
    title: "التصميم وتطوير المنصة",
    description: "هل أنت مصمم واجهات، مطور تطبيقات، أو مبرمج؟ ساهم بمهاراتك التقنية في تحسين وتطوير تجربة المستخدم على المنصة، وإضافة ميزات جديدة.",
    buttonLabel: "انضم لفريق التطوير",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "سفراء اليقين",
    description: "كن ممثلاً لمنصة اليقين في بلدك، مدينتك، أو منطقتك. ساهم في بناء مجتمع محلي، وتنظيم لقاءات، وتوزيع المواد الدعوية على أرض الواقع.",
    buttonLabel: "كن سفيرًا لليقين",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: "الترجمة والنشر باللغات",
    description: "هل تتقن لغة أخرى؟ ساعدنا في ترجمة محتوى المنصة ومقاطع الفيديو والمقالات لنصل برسالة اليقين إلى كل إنسان على وجه الأرض.",
    buttonLabel: "ساهم في الترجمة",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Film className="h-8 w-8 text-primary" />,
    title: "إنتاج الرسوم والأفلام الكرتونية",
    description: "هل لديك موهبة في التحريك أو صناعة الأفلام الكرتونية؟ ساهم في إنتاج محتوى جذاب ومؤثر للأطفال والشباب لغرس بذور اليقين في قلوبهم.",
    buttonLabel: "ساهم في الإنتاج",
    buttonLink: "/community/volunteers"
  },
  {
    icon: <Box className="h-8 w-8 text-primary" />,
    title: "إنتاج مواد للواقع المعزز (AR)",
    description: "للمهتمين بالتقنيات الحديثة، ساهم في تصميم تجارب تفاعلية باستخدام الواقع المعزز لإظهار آيات الله في الكون بطريقة مبتكرة وغامرة.",
    buttonLabel: "ساهم في التطوير",
    buttonLink: "/community/volunteers"
  }
];

export default function PracticalActivitiesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Activity className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          الأنشطة العملية: إخراج ثمرة اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          بعد أن اكتسبت المعرفة والتصديق، حان وقت العمل. هذه الأنشطة هي الثمرة العملية لرحلتك، وهي الإجابة على السؤال الأهم.
        </p>
      </div>

       <Card className="my-16 bg-secondary text-center p-8 md:p-12 rounded-2xl shadow-lg border-border">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <HelpCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl font-bold mb-2 text-secondary-foreground">
            كيف تنصر الله؟
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            توقف لحظة واسأل نفسك: كيف يمكنك أن تنصر الله لتحقيق مراده بتبليغ الإيمان اليقيني وتكون من جنوده؟ اختر النشاط الذي يلامس قلبك ويتوافق مع مهاراتك، واتخذ خطوتك الأولى اليوم.
          </p>
          <Button size="lg" asChild>
            <Link href="/community/volunteers">انضم لجنود اليقين</Link>
          </Button>
        </CardContent>
      </Card>

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
