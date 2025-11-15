import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Book, FlaskConical, Cpu } from 'lucide-react';

const partnerTypes = [
  {
    title: 'المؤسسات التعليمية',
    description: 'نتعاون مع الجامعات والمدارس لدمج مفاهيم اليقين والتفكير النقدي في المناهج التعليمية.',
    icon: <Book className="h-8 w-8 text-primary" />,
  },
  {
    title: 'المراكز البحثية',
    description: 'نعمل مع الباحثين لدراسة أثر اليقين على الصحة النفسية والاجتماعية وتطوير أدوات قياس فعالة.',
    icon: <FlaskConical className="h-8 w-8 text-primary" />,
  },
  {
    title: 'الشركات التقنية',
    description: 'نبحث عن شركاء تقنيين للمساهمة في تطوير المنصة وتقديم تجارب مبتكرة مثل الواقع الافتراضي والذكاء الاصطناعي.',
    icon: <Cpu className="h-8 w-8 text-primary" />,
  },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {partnerTypes.map((type) => (
          <Card key={type.title} className="text-center p-6 flex flex-col items-center shadow-md">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              {type.icon}
            </div>
            <CardHeader className="p-2">
              <CardTitle className="font-headline text-2xl">{type.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{type.description}</p>
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
