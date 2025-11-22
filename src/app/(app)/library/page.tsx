import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Library, Mic, Video, Images, BookOpen } from 'lucide-react';

const librarySections = [
  {
    href: '/library/audio',
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: 'المكتبة الصوتية',
    description: 'استمع إلى محاضرات وتأملات وبودكاست تزيد من وعيك ويقينك.',
  },
  {
    href: '/library/videos',
    icon: <Video className="h-8 w-8 text-primary" />,
    title: 'مكتبة الفيديو',
    description: 'شاهد مقاطع مرئية ملهمة وورش عمل تساعدك في رحلتك.',
  },
  {
    href: '/library/images',
    icon: <Images className="h-8 w-8 text-primary" />,
    title: 'مكتبة الصور',
    description: 'تصفح صورًا فنية ورسومًا توضيحية تلهمك للتفكر في عظمة الكون.',
  },
  {
    href: '/library/books',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'مكتبة الكتب',
    description: 'اطلع على كتب ومقالات مقترحة لتعميق فهمك وتوسيع معرفتك.',
  },
];

export default function LibraryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Library className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مكتبة اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          مصادر متنوعة للمعرفة والإلهام، كلها في مكان واحد لدعم رحلتك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {librarySections.map((section) => (
          <Link href={section.href} key={section.title} className="block hover:no-underline">
            <Card className="h-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">{section.icon}</div>
                <div className="flex-1">
                  <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-base">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
