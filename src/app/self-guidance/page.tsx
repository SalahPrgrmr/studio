import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb, Brain, Heart, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import KhalilAssistant from "@/components/assistant/khalil-assistant";

const guidanceSteps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "قوة النية الصادقة",
    description: "كل شيء يبدأ من داخلك. جدد نيتك كل يوم بأن تكون رحلتك خالصة لله، لطلب الهدوء واليقين. النية الصادقة هي البوصلة التي توجه كل أعمالك.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "فن التفكر الإيجابي",
    description: "عوّد عقلك على رؤية الخير في كل شيء. تفكر في نعم الله عليك، من أصغرها إلى أكبرها. هذا التفكر يغذي روحك ويحول نظرتك للحياة.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "أثر العمل الصالح",
    description: "اليقين ينمو بالعمل. اختر عملًا صالحًا بسيطًا وداوم عليه، كإدخال سرور على قلب مسلم أو مساعدة محتاج. العمل يجسد الإيمان ويجعله حيًا.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "بناء حصن الذكر",
    description: "اجعل لسانك رطبًا بذكر الله. التسبيح، الاستغفار، والحمد هي حصنك من وساوس الشيطان والقلق. الذكر يملأ القلب طمأنينة وأمانًا.",
  }
];

export default function SelfGuidancePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Zap className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          أرشد نفسك وأسعدها باليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          خطوات عملية لحياة أكثر طمأنينة وسعادة من خلال قوة اليقين.
        </p>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {guidanceSteps.map((step) => (
          <Card key={step.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">{step.icon}</div>
                <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <KhalilAssistant />

       <div className="text-center mt-16 pt-8 border-t">
          <h2 className="font-headline text-2xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
          <p className="text-muted-foreground mb-6">استخدم أداة المسار الشخصي للحصول على خطة مخصصة الآن.</p>
          <Button asChild size="lg">
            <Link href="/#personal-path">أنشئ مسارك الشخصي</Link>
          </Button>
        </div>
    </div>
  );
}
