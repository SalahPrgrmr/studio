import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Globe, BookOpen, Users, Heart, HeartHandshake, Focus } from "lucide-react";
import Link from 'next/link';
import FaqSection from "@/components/sections/faq-section";
import { Separator } from "@/components/ui/separator";

const principles = [
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "الحياد والاحترام",
        description: "نحن منصة محايدة تحترم جميع الأديان والثقافات والجنسيات. هدفنا هو بناء الجسور وتعزيز التفاهم المتبادل.",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "المعرفة الموثوقة",
        description: "نسعى لتقديم محتوى يعتمد على المعرفة الموثوقة والتفكير المنطقي، وتبسيط المفاهيم العميقة لجعلها في متناول الجميع.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "قوة المجتمع",
        description: "نؤمن بأن رحلة اليقين تكون أعمق وأكثر ثباتًا ضمن مجتمع داعم من خلال المنتديات والغرف التفاعلية وفرص التطوع.",
    },
    {
        icon: <HeartHandshake className="h-8 w-8 text-primary" />,
        title: "الانفتاح والتعاون",
        description: "أي جهة أو فرد يدعو إلى 'لا إله إلا الله، الأحد الصمد' ولا يرجو إلا وجه الله، فنحن من أتباعه وشركاؤه في الدعوة."
    }
]

export default function MissionPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Target className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          رسالتنا: التعريف بالله وبكلمة التوحيد
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          "لا إله إلا الله" هي أساس كل شيء، وهدفنا هو إيصال هذا المفهوم الصافي إلى كل إنسان.
        </p>
      </div>
      
      <Card className="mb-16 shadow-lg bg-primary/5 border-primary/20">
        <CardHeader>
            <CardTitle className="font-headline text-3xl text-center text-primary">ما هي عين اليقين؟</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-foreground">
                "عين اليقين" هي منصة دعوية عالمية، محايدة، وغير ربحية. مهمتها الأساسية هي التعريف بالله وبمفهوم التوحيد - "لا إله إلا الله"، وحده لا شريك له - والسعي للوصول إلى مستوى "عين اليقين" في هذا الفهم. ثم تهدف إلى إيصال هذه الرسالة الصافية إلى الناس كافة، بمختلف لغاتهم وثقافاتهم. نحن نوفر الأدوات المعرفية، والمحتوى الموثوق، والمجتمع الداعم لمساعدة كل باحث عن الحقيقة على بناء قناعات راسخة تنير طريقه في الحياة.
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
      
      <Card className="mb-16 bg-card border-secondary shadow-md">
        <CardHeader className="flex-row items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-full">
                <Focus className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle className="font-headline text-2xl">تركيزنا وتخصصنا</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
                إن عدم تطرق المنصة لمواضيع هامة أخرى لا يعني أنها لا تؤمن بها أو تعارضها، ولا يعني أنها تدعي الكمال فيما تقدمه. بل هو تأكيد على تخصصنا في الأساس الذي يُبنى عليه كل شيء: <strong>اليقين بالله وتوحيده</strong>.
            </p>
             <p className="text-muted-foreground leading-relaxed">
                نحن نؤمن بأن بقية الأمور الهامة والمشروعة والمطلوبة متاحة وميسرة في منصات أخرى متخصصة، ونحن نكمل عملهم بالتركيز على حجر الزاوية الذي يمثل نقطة الانطلاق لكل خير.
            </p>
        </CardContent>
      </Card>
      
      <Separator className="my-16" />
      
      <FaqSection />

       <div className="text-center mt-16 pt-8 border-t">
          <h2 className="font-headline text-2xl font-bold mb-4">هل أنت مستعد لبدء رحلتك؟</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">استكشف خارطة طريق رحلة اليقين واتخذ خطوتك الأولى نحو حياة أكثر أمانًا واستقرارًا.</p>
          <Button asChild size="lg">
            <Link href="/journey-of-certainty">اكتشف خارطة الطريق</Link>
          </Button>
        </div>

    </div>
  );
}
