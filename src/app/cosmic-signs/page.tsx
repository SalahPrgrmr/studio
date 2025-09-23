import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Eclipse, Mountain, Wind, Zap } from 'lucide-react';

const cosmicSigns = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'العواصف والبرق',
    description: 'تذكير بقوة الله المطلقة وقدرته على تغيير حال الكون في لحظة. إنها دعوة للتفكر في ضعف الإنسان أمام عظمة الخالق.',
  },
  {
    icon: <Mountain className="h-8 w-8 text-primary" />,
    title: 'الزلازل والبراكين',
    description: 'آيات تهز الأرض من تحت أقدامنا، لتوقظ القلوب الغافلة وتذكر بأن هذه الدنيا ليست بدار قرار، وأن القرار الحقيقي عند الله.',
  },
  {
    icon: <Eclipse className="h-8 w-8 text-primary" />,
    title: 'الخسوف والكسوف',
    description: 'ظواهر كونية دقيقة تظهر عظمة نظام الكون الذي أقامه الله، وفي نفس الوقت هي إنذار بأن هذا النظام يمكن أن يختل بأمر منه.',
  },
  {
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: 'الأعاصير والفيضانات',
    description: 'رسائل قوية تظهر أن ما نعتبره من المسلمات، كالماء والهواء، يمكن أن يتحول إلى جند من جنود الله يعذب به من يشاء من عباده.',
  },
];

export default function CosmicSignsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          اليقين بآيات الله في الكون
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          الكون كتاب مفتوح، وظواهره رسائل من الله لإيقاظ القلوب ودعوتها للعودة إلى طريق اليقين.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cosmicSigns.map((sign, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
               <div className="p-3 bg-primary/10 rounded-full">{sign.icon}</div>
              <CardTitle className="font-headline text-xl">{sign.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {sign.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="my-16 bg-destructive/10 border-destructive/20 shadow-lg">
        <CardHeader className="flex-row items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <CardTitle className="font-headline text-2xl text-destructive">
            رسالة تحذير وإنذار
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
            <p className="leading-relaxed text-destructive/90">
                هذه الظواهر ليست مجرد أحداث طبيعية عابرة، بل هي رسائل إلهية وإنذارات للناس. إنها تذكير بأن الكون يسير بأمر الله، وأن تجاهل هذه الآيات والإصرار على الغفلة قد يؤدي إلى عواقب وخيمة في الدنيا والآخرة.
            </p>
            <p className="leading-relaxed font-semibold text-destructive">
                إن الله يرسل بالآيات تخويفًا، لعل الناس يرجعون ويتوبون ويوقنون به قبل فوات الأوان. فمن لم يوقن بالرسائل اللطيفة، قد تأتيه رسائل أشد لعلها توقظه.
            </p>
        </CardContent>
      </Card>

    </div>
  );
}
