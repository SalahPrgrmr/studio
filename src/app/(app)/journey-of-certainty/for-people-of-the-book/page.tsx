import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Milestone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <Milestone className="h-8 w-8 text-primary" />,
    title: "الجذور المشتركة للإيمان",
    description: "استكشاف مفهوم التوحيد والإيمان بإله واحد كما ورد في جميع الرسالات السماوية.",
    link: "/god-certainty",
    linkLabel: "اليقين بالله"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "الحوار البناء",
    description: "فهم نقاط الالتقاء والاختلاف باحترام متبادل، والتركيز على القيم الإنسانية والأخلاقية المشتركة.",
    link: "/community/forum",
    linkLabel: "شارك في الحوار"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "قصص هداية ملهمة",
    description: "الاطلاع على تجارب وقصص أشخاص من خلفيات دينية مختلفة وجدوا طريقهم نحو يقين أعمق.",
    link: "/stories",
    linkLabel: "اقرأ قصص النجاح"
  }
];

export default function PeopleOfTheBookJourneyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          رحلة اليقين لأهل الكتاب
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          مسار للحوار البناء، يهدف إلى استكشاف الجذور المشتركة للإيمان واليقين بالله في الرسالات السماوية.
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
