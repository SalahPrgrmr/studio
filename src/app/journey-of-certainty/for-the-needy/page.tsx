import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Anchor, Sparkles, Handshake, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "قوة الدعاء",
    description: "الدعاء هو أسرع طريق إلى الله، خاصة للمضطر. تعلم كيف تدعو بيقين ورجاء، فالله يجيب دعوة المضطر إذا دعاه.",
    link: "/god-certainty",
    linkLabel: "اعرف المزيد عن وعده"
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    title: "الافتقار إلى الله",
    description: "الشعور بالحاجة والضعف هو بوابة القرب من الله. كلما شعرت بفقرك، كلما كنت أقرب إلى الغني الحميد.",
    link: "/stories",
    linkLabel: "اقرأ قصص المستجابة دعواتهم"
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "حسن الظن بالله",
    description: "اليقين بأن الله أرحم بك من نفسك، وأن اختياره لك هو الخير دائمًا، حتى لو لم تفهم الحكمة الآن.",
    link: "/community/forum",
    linkLabel: "شارك قصتك واطلب الدعم"
  }
];

export default function NeedyJourneyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Anchor className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          رحلة اليقين للمحتاجين والمضطرين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          عندما تضيق السبل، يفتح الله لك طريقًا مباشرًا إليه. هذا المسار هو ملاذك للوصول إلى الطمأنينة واليقين في أوقات الشدة.
        </p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <Card key={step.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="items-center text-center p-6">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{step.icon}</div>
                <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <Button asChild variant="outline">
                <Link href={step.link}>{step.linkLabel}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="text-center mt-16 pt-8 border-t">
          <h2 className="font-headline text-2xl font-bold mb-4">العودة إلى الخارطة الرئيسية</h2>
          <p className="text-muted-foreground mb-6">يمكنك دائمًا العودة واستكشاف مسارات أخرى.</p>
          <Button asChild size="lg">
            <Link href="/journey-of-certainty">خارطة طريق رحلة اليقين</Link>
          </Button>
        </div>
    </div>
  );
}
