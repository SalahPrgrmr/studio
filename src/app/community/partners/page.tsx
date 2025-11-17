import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Book, Users, Monitor, HeartPulse } from 'lucide-react';

const partnerCategories = [
  {
    title: 'الجهات الرسمية ووزارات الأوقاف',
    description: 'نتعاون مع الجهات الرسمية في العالم الإسلامي لتنسيق الجهود وتوسيع نطاق رسالة اليقين.',
    icon: <Building className="h-8 w-8 text-primary" />,
    examples: [
        'وزارة الشؤون الإسلامية (السعودية)',
        'الهيئة العامة للشؤون الإسلامية (الإمارات)',
        'وزارة الأوقاف (مصر)',
        'وزارة الأوقاف (قطر)',
    ],
  },
  {
    title: 'العلماء والدعاة',
    description: 'يشكل العلماء والدعاة حجر الزاوية في المحتوى العلمي والروحي للمنصة، ونعتز بشراكتهم في تقديم المعرفة الموثوقة.',
    icon: <Users className="h-8 w-8 text-primary" />,
    examples: [
        'أ.د. خالد المصلح',
        'الشيخ صالح المغامسي',
        'د. محمد راتب النابلسي',
        'الشيخ عثمان الخميس',
    ],
  },
  {
    title: 'القنوات والمراكز الإعلامية',
    description: 'شركاؤنا الإعلاميون يساهمون في نشر رسالة اليقين على أوسع نطاق من خلال الإنتاج والبث الرقمي والفضائي.',
    icon: <Monitor className="h-8 w-8 text-primary" />,
     examples: [
        'شبكة المجد الفضائية',
        'قناة الرسالة الفضائية',
        'قناة اقرأ الفضائية',
        'مؤسسة بينه (Bayyinah)',
    ],
  },
   {
    title: 'المؤسسات التعليمية والبحثية',
    description: 'نعمل مع الجامعات والمراكز البحثية لتطوير المحتوى وإجراء الدراسات التي تعمق فهمنا لليقين وأثره.',
    icon: <Book className="h-8 w-8 text-primary" />,
     examples: [
        'Yaqeen Institute',
        'Zaytuna College',
        'الجامعة الإسلامية المفتوحة (IOU)',
        'أكاديمية زاد',
    ],
  },
  {
    title: 'مراكز الإرشاد النفسي والأطباء المسلمون',
    description: 'نتعاون مع الخبراء في الصحة النفسية لتقديم دعم متكامل يجمع بين العلم والإيمان، ومساعدة الأفراد على تحقيق التوازن النفسي والروحي.',
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    examples: [
        'د. طارق الحبيب',
        'د. عبد الرحمن ذاكر الهاشمي',
        'مؤسسة مطمئنة للاستشارات',
        'موقع المستشار',
    ],
  }
];

export default function PartnersPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Building className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          شركاء اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          نؤمن بقوة التعاون لتحقيق تأثير أوسع. شركاؤنا هم جزء لا يتجزأ من نجاحنا في نشر رسالة اليقين.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {partnerCategories.map((category) => (
          <Card key={category.title} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
               <div className="p-3 bg-primary/10 rounded-full">{category.icon}</div>
              <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                {category.examples.map(example => <li key={example} className="font-semibold">{example}</li>)}
                 <li className="text-muted-foreground">وغيرهم الكثير...</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold mb-4">
            هل ترغب في أن تصبح شريكًا؟
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            إذا كانت مؤسستك تشاركنا نفس الرؤية والقيم، وكنتم ترغبون في التعاون معنا لنشر اليقين وبناء مجتمع أفضل، يسعدنا تواصلكم معنا.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
            تواصل معنا (قريبًا)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
