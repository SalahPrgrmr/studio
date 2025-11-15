import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BookMarked, Download, FileText } from 'lucide-react';
import Image from 'next/image';

const bookContent = [
  {
    id: 1,
    title: 'لأنك الله: رحلة إلى السماء السابعة',
    author: 'علي بن جابر الفيفي',
    type: 'كتاب',
    thumbnailUrl: 'https://picsum.photos/seed/book1/400/600',
    thumbnailHint: 'spiritual book cover',
  },
  {
    id: 2,
    title: 'مقالة: أثر التفكر في ترسيخ الإيمان',
    author: 'فريق المنصة',
    type: 'مقالة',
    thumbnailUrl: 'https://picsum.photos/seed/book2/400/600',
    thumbnailHint: 'abstract thought concept',
  },
  {
    id: 3,
    title: 'ملخص كتاب: براهين وجود الله',
    author: 'د. سامي عامري',
    type: 'ملخص كتاب',
    thumbnailUrl: 'https://picsum.photos/seed/book3/400/600',
    thumbnailHint: 'philosophy book cover',
  },
];

export default function BookLibraryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مكتبة الكتب والمقالات
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          اغرس بذور المعرفة في قلبك من خلال قراءات مختارة بعناية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookContent.map((book) => (
          <Card key={book.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
             <div className="aspect-[2/3] relative">
               <Image 
                src={book.thumbnailUrl} 
                alt={book.title} 
                fill 
                className="object-cover"
                data-ai-hint={book.thumbnailHint}
                />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{book.title}</CardTitle>
              <CardDescription>
                <span className="flex items-center gap-2">
                  {book.type === 'كتاب' ? <BookMarked className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  {book.type} - {book.author}
                </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Maybe a short description here in the future */}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled>
                <Download className="ml-2 h-5 w-5" />
                تحميل (قريبًا)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="text-center mt-16">
        <p className="text-muted-foreground">يتم العمل على إضافة المزيد من الكتب والمقالات قريبًا!</p>
      </div>
    </div>
  );
}
