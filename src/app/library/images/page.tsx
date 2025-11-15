import Image from 'next/image';
import { Images } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const imageGallery = [
  {
    id: 1,
    title: 'مجرة درب التبانة',
    description: 'نظرة إلى اتساع الكون وعظمة الخلق.',
    imageUrl: 'https://picsum.photos/seed/gallery1/800/600',
    imageHint: 'milky way galaxy',
  },
  {
    id: 2,
    title: 'خلية نحل',
    description: 'نظام دقيق وتعاون فريد في مملكة الحشرات.',
    imageUrl: 'https://picsum.photos/seed/gallery2/800/600',
    imageHint: 'beehive honeycomb',
  },
  {
    id: 3,
    title: 'ندفة ثلج',
    description: 'كل بلورة هي تصميم فريد لا يتكرر.',
    imageUrl: 'https://picsum.photos/seed/gallery3/800/600',
    imageHint: 'snowflake macro',
  },
  {
    id: 4,
    title: 'شروق الشمس من الفضاء',
    description: 'آية تتكرر كل يوم بنظام بديع.',
    imageUrl: 'https://picsum.photos/seed/gallery4/800/600',
    imageHint: 'sunrise from space',
  },
  {
    id: 5,
    title: 'عين الإنسان',
    description: 'تعقيد مذهل في تركيب بصري فائق الدقة.',
    imageUrl: 'https://picsum.photos/seed/gallery5/800/600',
    imageHint: 'human eye macro',
  },
  {
    id: 6,
    title: 'جذور شجرة',
    description: 'شبكة الحياة الممتدة تحت الأرض، رمز للقوة والثبات.',
    imageUrl: 'https://picsum.photos/seed/gallery6/800/600',
    imageHint: 'tree roots',
  },
];

export default function ImageLibraryPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Images className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مكتبة الصور
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          معرض للصور الملهمة التي تدعو للتفكر في آيات الله في الخلق.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {imageGallery.map((image) => (
           <Dialog key={image.id}>
             <DialogTrigger asChild>
                <div className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-center font-bold">{image.title}</p>
                  </div>
                </div>
             </DialogTrigger>
             <DialogContent className="max-w-4xl">
               <DialogHeader>
                 <DialogTitle className="font-headline text-2xl">{image.title}</DialogTitle>
                 <DialogDescription>{image.description}</DialogDescription>
               </DialogHeader>
               <div className="relative aspect-video mt-4">
                 <Image src={image.imageUrl} alt={image.title} fill className="object-contain" data-ai-hint={image.imageHint} />
               </div>
             </DialogContent>
           </Dialog>
        ))}
      </div>
    </div>
  );
}
