
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Landmark, MessageSquare, BookOpen, GraduationCap } from "lucide-react";
import Link from 'next/link';

const resourceCategories = [
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: "مراكز إسلامية ومواقع دعوية",
    description: "ابحث عن مراكز إسلامية قريبة منك أو تصفح مواقع دعوية موثوقة للحصول على الدعم والإرشاد أو الدخول في الإسلام.",
    links: [
      { name: "IslamHouse.com - للدعوة بلغات متعددة", href: "https://islamhouse.com/ar" },
      { name: "موقع Muslim.org", href: "https://muslim.org/" },
    ]
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "مواقع للمناظرة والحوار",
    description: "مواقع متخصصة في الحوار بين الأديان والمناظرات الفكرية لاستكشاف الحقائق بعمق ومقارنة الأفكار.",
     links: [
      { name: "موقع بينات - د. إياد قنيبي", href: "https://bayyenat.net/" },
       { name: "Yaqeen Institute for Islamic Research", href: "https://yaqeeninstitute.org/" },
    ]
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "مصادر للتفقه في الدين والفتاوى",
    description: "مكتبات إلكترونية ومواقع علمية لتعلم الفقه الإسلامي وعلومه المختلفة من مصادرها الأصلية الموثوقة.",
     links: [
      { name: "موقع إسلام ويب - فتاوى ومقالات", href: "https://www.islamweb.net/ar/" },
      { name: "موقع الإسلام سؤال وجواب", href: "https://islamqa.info/ar" },
      { name: "موقع الدرر السنية - موسوعة علمية", href: "https://www.dorar.net/" },
      { name: "موقع الشيخ ابن باز - فتاوى وعلم شرعي", href: "https://binbaz.org.sa/" },
    ]
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "منصات تعليمية",
    description: "دورات وبرامج تعليمية عبر الإنترنت لتعميق فهمك للدين الإسلامي والحضارة الإسلامية.",
     links: [
      { name: "أكاديمية زاد - لتعليم العلوم الشرعية", href: "https://www.zad-academy.com/" },
      { name: "الجامعة الإسلامية المفتوحة (IOU)", href: "https://iou.edu.gm/" },
    ]
  },
];

export default function ExternalResourcesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <ExternalLink className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          روابط وموارد خارجية
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          مجموعة منتقاة من الروابط والمواقع التي قد تحتاجها في رحلتك للبحث عن المعرفة والتأكيد والاطمئنان.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resourceCategories.map((category) => (
          <Card key={category.title} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">{category.icon}</div>
              <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.links.map(link => (
                    <Button key={link.name} asChild variant="outline" className="w-full justify-start">
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                             <ExternalLink className="ml-2 h-4 w-4" />
                            {link.name}
                        </Link>
                    </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card className="mt-16 bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold mb-2">
            تنويه وإخلاء مسؤولية
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed">
            منصة "عين اليقين" تقدم هذه الروابط كخدمة للباحثين عن المعرفة. نحن لا نتحمل مسؤولية محتوى المواقع الخارجية، وننصح دائمًا بالتحقق من المعلومات من مصادر متعددة.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
