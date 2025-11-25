import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Landmark, MessageSquare, BookOpen, GraduationCap, BookMarked, BookText, Users, Link2Off } from "lucide-react";
import Link from 'next/link';

const resourceCategories = [
  {
    icon: <BookMarked className="h-8 w-8 text-primary" />,
    title: "مواقع القرآن الكريم وعلومه",
    description: "مصادر شاملة لتلاوة القرآن الكريم، وتفسيره، وترجمة معانيه، والبحث في علومه المختلفة.",
    links: [
      { name: "مجمع الملك فهد لطباعة المصحف الشريف", href: "https://qurancomplex.gov.sa/" },
      { name: "موقع Quran.com", href: "https://quran.com/ar" },
      { name: "التفسير الميسر", href: "https://www.quran-tafsir.net/" },
    ]
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "آيات موجهة لأهل الكتاب",
    description: "مجموعة من الآيات القرآنية التي تخاطب أهل الكتاب مباشرة، تدعوهم إلى كلمة سواء وتوضح نقاط الالتقاء.",
    links: [
       { name: "قل يا أهل الكتاب تعالوا إلى كلمة سواء (آل عمران: 64)", href: "https://quran.com/3/64" },
       { name: "يا أهل الكتاب لم تكفرون بآيات الله (آل عمران: 70)", href: "https://quran.com/3/70" },
    ]
  },
  {
    icon: <BookText className="h-8 w-8 text-primary" />,
    title: "مواقع الحديث الشريف والسيرة النبوية",
    description: "موسوعات حديثية شاملة ومواقع متخصصة في سيرة النبي صلى الله عليه وسلم لدراسة سنته وحياته.",
    links: [
      { name: "موقع الدرر السنية - الموسوعة الحديثية", href: "https://www.dorar.net/hadith" },
      { name: "موقع إسلام ويب - قسم الحديث", href: "https://www.islamweb.net/ar/hadith/" },
      { name: "موقع الرحيق المختوم", href: "https://www.al-eman.com/book/140" },
    ]
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "مصادر للتفقه في الدين والفتاوى",
    description: "مواقع علمية موثوقة لتعلم الفقه الإسلامي والحصول على فتاوى شرعية من هيئات وكبار العلماء.",
     links: [
      { name: "موقع إسلام ويب - الفتاوى", href: "https://www.islamweb.net/ar/fatwa/" },
      { name: "موقع الإسلام سؤال وجواب", href: "https://islamqa.info/ar" },
      { name: "موقع الشيخ ابن باز", href: "https://binbaz.org.sa/" },
    ]
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "مواقع للمناظرة والحوار الفكري",
    description: "مواقع متخصصة في الحوار بين الأديان والمذاهب، والرد على الشبهات، وتقديم الأدلة العقلية على وجود الله.",
     links: [
      { name: "موقع بينات - د. إياد قنيبي", href: "https://bayyenat.net/" },
       { name: "Yaqeen Institute for Islamic Research", href: "https://yaqeeninstitute.org/" },
    ]
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: "مراكز إسلامية ومنصات دعوية",
    description: "منصات تعليمية ومراكز دعوية تهدف إلى نشر المعرفة الإسلامية الصحيحة حول العالم وبلغات متعددة.",
    links: [
      { name: "IslamHouse.com - للدعوة بلغات متعددة", href: "https://islamhouse.com/ar" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <Button key={link.name} asChild variant="outline" className="w-full justify-start text-right opacity-70 cursor-not-allowed" disabled>
                        <Link href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-between w-full">
                            <span>{link.name}</span>
                            <Link2Off className="mr-2 h-4 w-4 flex-shrink-0" />
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
            منصة "عين اليقين" تقدم هذه الروابط كخدمة للباحثين عن المعرفة. نحن لا نتحمل مسؤولية محتوى المواقع الخارجية، وننصح دائمًا بالتحقق من المعلومات من مصادر متعددة والرجوع لأهل العلم الموثوقين.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
