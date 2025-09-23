import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Story = {
  title: string;
  author: string;
  snippet: string;
  imageId: string;
};

const stories: Story[] = [
  {
    title: "العثور على السلام في الفوضى",
    author: "أليكس جونسون",
    snippet: "من خلال التأمل والتوجيه، اكتشفت جوهر اليقين الذي حوّل قلقي إلى سلام عميق. لا تزال عواصف الحياة تأتي، لكن لدي الآن مرساة.",
    imageId: "story-1"
  },
  {
    title: "من الشك إلى العمل الحاسم",
    author: "ماريا غارسيا",
    snippet: "كنت مشلولة بسبب 'ماذا لو'. ساعدتني رحلة اليقين على تحديد قيمي، والآن أتخذ خياراتي بثقة وهدف، وأحتفل بكل خطوة إلى الأمام.",
    imageId: "story-2"
  },
  {
    title: "إعادة الاتصال بمجتمعي",
    author: "ديفيد تشين",
    snippet: "شعرت بالضياع والعزلة، وبحثت عن اليقين ووجدته ليس فقط في داخلي، ولكن في الروابط التي أعدت بناءها مع من حولي. القوة الحقيقية مشتركة.",
    imageId: "story-3"
  },
  {
    title: "منظور جديد على مسار مدى الحياة",
    author: "فاطمة الفاسي",
    snippet: "كان إيماني حجر الزاوية في حياتي، لكن كانت لدي أسئلة. هذه الرحلة لم تستبدل معتقداتي بل عمقتها، مما وفر يقينًا يبدو قديمًا وجديدًا في آن واحد.",
    imageId: "story-4"
  },
  {
    title: "الوضوح لتغيير المسار المهني",
    author: "سام أوكونيل",
    snippet: "شعرت بعدم الرضا ولكني كنت خائفًا جدًا من ترك وظيفتي المستقرة. العثور على اليقين في مهمتي الشخصية أعطاني الشجاعة لمتابعة مهنة تتماشى مع روحي.",
    imageId: "story-5"
  },
  {
    title: "إطلاق العنان لإمكانياتي الإبداعية",
    author: "كلوي دوبوا",
    snippet: "كان صوتي الإبداعي محجوبًا بالشك الذاتي. من خلال إيجاد اليقين في قيمتي ورؤيتي، تمكنت من إسكات الناقد الداخلي وإنشاء فن أشعر أنه ملكي حقًا.",
    imageId: "story-6"
  },
];


export default function StoriesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          قصص التحول
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          اقرأ قصصًا ملهمة من أفراد وجدوا طريقهم إلى اليقين.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => {
          const imageData = PlaceHolderImages.find(img => img.id === story.imageId);
          return (
            <Card key={story.title} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              {imageData && (
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <Image
                    src={imageData.imageUrl}
                    alt={imageData.description}
                    width={600}
                    height={400}
                    data-ai-hint={imageData.imageHint}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{story.title}</CardTitle>
                <CardDescription>بواسطة {story.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground italic">"{story.snippet}"</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
