import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, Footprints, Telescope, Users, Milestone, TrendingUp, BookOpen, ShieldCheck, Heart, Search, Anchor, UserCheck, UserPlus, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CertaintyChart from '@/components/sections/certainty-chart';

const journeySteps = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'الخطوة الأولى: العلم والمعرفة',
    description: 'كل رحلة تبدأ بالمعرفة. الأمر الإلهي الأول هو "فاعلم". هذه مرحلة بناء الأساس المتين بالتعلم عن الله ووحدانيته وصدق كلماته.',
    link: '/god-certainty',
    linkLabel: 'ابدأ بالمعرفة'
  },
  {
    icon: <Telescope className="h-10 w-10 text-primary" />,
    title: 'الخطوة الثانية: التصديق عبر التفكر',
    description: 'التفكر في آيات الكون، من "البلاغ والإنذار المبين" إلى "النعم والآيات"، يحول العلم النظري إلى تصديق قلبي أولي بالخالق العظيم.',
    link: '/blessings-and-signs',
    linkLabel: 'تفكر في الآيات'
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'الخطوة الثالثة: الإيمان والعمل',
    description: 'الإيمان ينمو بالعمل الصالح. استلهم من "قصص النجاح" وانضم إلى "المجتمع" لترى أثر الإيمان في حياة الناس وتحوله إلى عمل ملموس.',
    link: '/stories',
    linkLabel: 'استلهم من التجارب'
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: 'الخطوة الرابعة: الوصول إلى اليقين',
    description: 'عندما تجتمع المعرفة والتصديق والعمل، يصل القلب إلى مرحلة اليقين. استخدم "مسارك الشخصي" و "الإرشاد الذاتي" لترسيخ هذا الشعور.',
    link: '/self-guidance',
    linkLabel: 'عزز يقينك'
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'الخطوة الخامسة: التغذية الراجعة المستمرة',
    description: 'اليقين يزيد وينقص. حافظ على منسوب عالٍ من اليقين من خلال مراجعة هذه الخطوات باستمرار، والتفكر، والعمل الصالح، للحفاظ على شعلة الإيمان متقدة.',
    link: '/journey-of-certainty',
    linkLabel: 'راجع رحلتك'
  },
];

const specializedPaths = [
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: 'رحلة اليقين لغير المؤمنين',
        description: 'مسار يعتمد على الأدلة العقلية والمنطقية والكونية لاستكشاف الأسئلة الكبرى وبناء اليقين من الصفر.',
        link: '/journey-of-certainty/for-non-believers'
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: 'رحلة اليقين لأهل الكتاب',
        description: 'حوار بناء لاستكشاف نقاط الالتقاء والجذور المشتركة لليقين بالله من خلال النصوص المقدسة.',
        link: '/journey-of-certainty/for-people-of-the-book'
    },
    {
        icon: <UserCheck className="h-8 w-8 text-primary" />,
        title: 'رحلة اليقين للمؤمنين',
        description: 'مسار لتعميق اليقين، الانتقال من علم اليقين إلى عين اليقين، ومواجهة الشبهات العصرية بثقة وثبات.',
        link: '/journey-of-certainty/for-believers'
    },
    {
        icon: <Anchor className="h-8 w-8 text-primary" />,
        title: 'رحلة اليقين للمحتاجين والمضطرين',
        description: 'طريق مباشر وسريع للاتصال بالله والوصول إلى اليقين من خلال بوابة الدعاء والافتقار في أوقات الشدة.',
        link: '/journey-of-certainty/for-the-needy'
    }
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

      <div className="mt-24">
          <div className="text-center mb-12">
              <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">مسارات مخصصة لرحلتك</h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                  كل شخص يبدأ من نقطة مختلفة. اختر المسار الذي يناسبك الآن.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specializedPaths.map((path) => (
                  <Link href={path.link} key={path.title} className="block group">
                      <Card className="h-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                          <CardHeader className="flex-row items-start gap-4">
                              <div className="p-3 bg-primary/10 rounded-full">{path.icon}</div>
                              <div className="flex-1">
                                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{path.title}</CardTitle>
                              </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                              <CardDescription>
                                  {path.description}
                              </CardDescription>
                          </CardContent>
                      </Card>
                  </Link>
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
