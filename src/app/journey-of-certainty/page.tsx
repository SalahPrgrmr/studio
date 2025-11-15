import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, Footprints, Telescope, BookHeart, Users, Milestone, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CertaintyChart from '@/components/sections/certainty-chart';

const journeySteps = [
  {
    icon: <Footprints className="h-10 w-10 text-primary" />,
    title: 'الخطوة الأولى: الاستكشاف والبحث',
    description: 'تبدأ الرحلة بالشعور بالحاجة إلى معنى أعمق. في هذه المرحلة، قد تبدأ في طرح أسئلة كبيرة حول الحياة والوجود. صفحة "الاستقصاء" هي نقطة انطلاق ممتازة.',
    link: '/survey',
    linkLabel: 'ابدأ الاستقصاء'
  },
  {
    icon: <Telescope className="h-10 w-10 text-primary" />,
    title: 'الخطوة الثانية: التفكر في الكون',
    description: 'من خلال مراقبة عظمة الكون ونظامه الدقيق، يمكنك أن ترى بصمات الخالق في كل مكان. تأمل في "آيات الكون" لتعميق هذا الشعور.',
    link: '/cosmic-signs',
    linkLabel: 'استكشف آيات الكون'
  },
  {
    icon: <BookHeart className="h-10 w-10 text-primary" />,
    title: 'الخطوة الثالثة: التعمق في المعرفة',
    description: 'اليقين ينمو بالمعرفة. تعرف على الله من خلال أسمائه وصفاته وكلماته. صفحة "اليقين بالله" تقدم لك هذا الأساس.',
    link: '/god-certainty',
    linkLabel: 'تعرف على الله'
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'الخطوة الرابعة: استلهام التجارب',
    description: 'أنت لست وحدك في هذه الرحلة. اقرأ "قصص نجاح" لأشخاص آخرين وجدوا طريقهم، وانضم إلى "المجتمع" للتواصل والدعم.',
    link: '/stories',
    linkLabel: 'اقرأ قصص النجاح'
  },
  {
    icon: <Milestone className="h-10 w-10 text-primary" />,
    title: 'الخطوة الخامسة: بناء مسارك الخاص',
    description: 'الآن، اجمع كل ما تعلمته وشعرت به لتبني "مسارك الشخصي". استخدم أداتنا المدعومة بالذكاء الاصطناعي لإنشاء خطة عملية تناسبك.',
    link: '/#personal-path',
    linkLabel: 'أنشئ مسارك الشخصي'
  },
];

export default function JourneyOfCertaintyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Map className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          خارطة طريق رحلة اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          اليقين ليس وجهة، بل هو رحلة مستمرة ومستدامة لشحن القلب باليقين لأنه يزيد وينقص، وهذه الرحلة لا تنتهي إلا بالموت. لا غنى لأي بشر عن اليقين، فهو الوقود المحرك للحياة والسعادة والاطمئنان في الدنيا، والفوز والفلاح في الآخرة.
        </p>
      </div>

      <div className="relative">
        {/* The connecting line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>

        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center md:gap-12">
              {/* Icon and Connector for alternating sides */}
              <div className={`flex-shrink-0 w-full md:w-1/2 flex items-center justify-center md:justify-start ${index % 2 === 1 ? 'md:justify-end md:order-3' : ''}`}>
                 <div className="relative w-full max-w-sm">
                    <div className="p-5 bg-primary/10 rounded-full inline-block mb-4 shadow-sm">
                        {step.icon}
                    </div>
                 </div>
              </div>

              {/* Card Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 w-full">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>
                    <Button asChild variant="outline">
                      <Link href={step.link}>{step.linkLabel}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Card className="mt-20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline text-3xl">
            <TrendingUp className="h-8 w-8 text-primary" />
            نمو اليقين وفوائده
          </CardTitle>
          <CardDescription className="text-base pt-2">
            هذا الرسم البياني يوضح كيف أن مستوى اليقين ينمو مع مرور الوقت والممارسة، على الرغم من أنه قد يواجه تقلبات. كلما زاد اليقين، زادت معه السعادة والطمأنينة.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertaintyChart />
        </CardContent>
      </Card>
    </div>
  );
}
