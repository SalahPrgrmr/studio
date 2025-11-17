import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Globe, BookOpen, Users, Heart } from "lucide-react";
import Link from 'next/link';

const principles = [
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "الحياد والاحترام",
        description: "نحن منصة محايدة تحترم جميع الأديان والثقافات والجنسيات. هدفنا هو بناء الجسور وتعزيز التفاهم المشترك.",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "المعرفة الموثوقة",
        description: "نسعى لتقديم محتوى مبني على المعرفة الموثوقة والتفكير المنطقي، مع تبسيط المفاهيم العميقة لتكون في متناول الجميع.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "قوة المجتمع",
        description: "نؤمن بأن رحلة اليقين تكون أعمق وأكثر ثباتًا عندما تكون ضمن مجتمع داعم من خلال المنتديات والغرف التفاعلية وفرص التطوع.",
    },
    {
        icon: <Heart className="h-8 w-8 text-primary" />,
        title: "مشروع غير ربحي",
        description: "عين اليقين هي مبادرة غير ربحية، تعتمد على جهود المتطوعين ودعم المجتمع للاستمرار في تقديم رسالتها مجانًا للجميع.",
    }
]

export default function MissionPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Target className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          رسالتنا وهدفنا
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          نحن هنا لمساعدتك في رحلتك الشخصية نحو الوضوح والأمان والرفاهية.
        </p>
      </div>
      
      <Card className="mb-16 shadow-lg bg-primary/5 border-primary/20">
        <CardHeader>
            <CardTitle className="font-headline text-3xl text-center text-primary">ما هي عين اليقين؟</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-foreground">
                "عين اليقين" هي مبادرة تعليمية، غير ربحية، ومحايدة، تهدف إلى مساعدة الناس على خوض رحلتهم الشخصية لإيجاد اليقين بالله. نحن نؤمن بأن اليقين هو حجر الزاوية للسعادة، الطمأنينة، والقوة الداخلية. من خلال توفير محتوى موثوق، وأدوات تفاعلية مثل الأنشطة العملية، ومجتمع داعم، نسعى لتمكين كل فرد من بناء قناعات راسخة تنير دربه في الحياة.
            </p>
        </CardContent>
      </Card>


      <div className="mb-20">
        <h2 className="font-headline text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          مبادئنا الأساسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {principles.map((principle) => (
            <Card key={principle.title} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center p-6">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{principle.icon}</div>
                <CardTitle className="font-headline text-xl">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

       <div className="text-center mt-16 pt-8 border-t">
          <h2 className="font-headline text-2xl font-bold mb-4">هل أنت مستعد لبدء رحلتك؟</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">استكشف خارطة طريق رحلة اليقين وابدأ خطوتك الأولى نحو حياة أكثر طمأنينة وثباتًا.</p>
          <Button asChild size="lg">
            <Link href="/journey-of-certainty">اكتشف خارطة الطريق</Link>
          </Button>
        </div>

    </div>
  );
}
