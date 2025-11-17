import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Waypoints, Compass, UserCheck, Globe } from 'lucide-react';
import Link from 'next/link';

export default function MahdiPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Waypoints className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          المهدي المنتظر
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          لا تنتظر المهدي، بل اسلك سبيله. كن أنت التغيير الذي تنتظره في العالم.
        </p>
      </div>

      <Card className="mb-12 bg-primary/5 border-primary/20 shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-3xl text-center text-primary flex items-center justify-center gap-3">
                <Compass className="h-8 w-8" />
                اسلك سبيله، لا تنتظره
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-foreground">
                إن انتظار المهدي يجب ألا يكون حالة من الجمود والسلبية، بل هو دعوة حية ودافعة قوية لتمهيد طريقه. سبيل المهدي هو سبيل اليقين والعمل، يبدأ بإصلاح الذات ثم ينطلق لإصلاح العالم. كن أنت جنديًا في جيشه قبل مجيئه، وذلك عبر سلوك طريقه واتباع منهجه في هداية نفسك أولاً، ثم التحرك لهداية الناس أجمعين.
            </p>
        </CardContent>
      </Card>
      
      <Card className="mb-12 bg-card border-secondary shadow-md">
        <CardHeader>
            <CardTitle className="font-headline text-3xl text-center text-secondary-foreground flex items-center justify-center gap-3">
                <UserCheck className="h-8 w-8" />
                كن من السابقين السابقين
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-muted-foreground">
                المهدي سيختاره الله ويصلحه في ليلة. لا تقلق نفسك، فهذا من تقدير الله وتدبيره. دورك هو أن تكون مع "السابقين السابقين" في الإيمان والعمل الصالح والتبليغ، لتكون من المقربين إلى خليفة الله عند ظهوره.
            </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        {/* Step 1: Guide Yourself */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <UserCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">الخطوة الأولى: هداية نفسك</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              طريق المهدي يبدأ من داخلك. قبل أن تصلح العالم، يجب أن تصلح قلبك. انطلق في رحلة لطلب اليقين، وتعميق إيمانك، وتزكية نفسك. تعلم، تفكر، واعمل صالحًا لتكون على بصيرة من أمرك، مستعدًا لحمل الرسالة.
            </p>
            <Button asChild>
              <Link href="/journey-of-certainty">ابدأ رحلة اليقين</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Guide the World */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Globe className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">الخطوة الثانية: هداية العالم</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              بمجرد أن تستنير باليقين، تصبح مسؤولاً عن تبليغ هذا النور. تحرك لهداية الناس والعالم إلى "لا إله إلا الله" وحده. ادعُ إلى سبيل ربك بالحكمة والموعظة الحسنة، بمختلف اللغات والجنسيات، لتكون ممن يمهدون الطريق للعدل والسلام.
            </p>
            <Button asChild>
                <Link href="/community/volunteers">انضم إلى فرق التبليغ</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
