import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { View, Telescope, Milestone, Sparkles, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const vrExperiences = [
  {
    title: 'رحلة في أعماق المجرة',
    description: 'استكشف عظمة الكون، شاهد النجوم والمجرات عن قرب، وتأمل في دقة الخلق من منظور لم تختبره من قبل.',
    icon: <Telescope className="h-8 w-8 text-primary" />,
    thumbnailUrl: 'https://picsum.photos/seed/vr-galaxy/600/400',
    thumbnailHint: 'galaxy nebula space',
  },
  {
    title: 'محاكاة الكعبة المشرفة',
    description: 'عش تجربة روحانية فريدة من خلال زيارة افتراضية للكعبة المشرفة، واشعر بأجواء الطواف والصلاة في هذا المكان المقدس.',
    icon: <Milestone className="h-8 w-8 text-primary" />,
    thumbnailUrl: 'https://picsum.photos/seed/vr-kaaba/600/400',
    thumbnailHint: 'kaaba mecca islam',
  },
  {
    title: 'التأمل على قمة جبل',
    description: 'انتقل إلى قمة جبل شاهق محاط بالطبيعة الخلابة، ومارس التأمل في بيئة هادئة تساعد على تصفية الذهن والوصول إلى السكينة.',
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    thumbnailUrl: 'https://picsum.photos/seed/vr-mountain/600/400',
    thumbnailHint: 'mountain peak meditation',
  },
];

export default function VRJourneysPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <View className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          رحلات اليقين عبر الواقع الافتراضي (VR)
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          استعد لتجربة غامرة تنقلك إلى عوالم جديدة من التفكر والتأمل. تقنية الواقع الافتراضي تفتح أبوابًا جديدة لتعميق اليقين بالله.
        </p>
      </div>

      <Card className="mb-16 shadow-lg overflow-hidden">
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl flex items-center justify-center gap-3">
                <Youtube className="h-8 w-8 text-red-600"/>
                شاهد: رحلة من الأرض إلى الفضاء
            </CardTitle>
            <CardDescription>
                هذا الفيديو يجسد فكرة الانطلاق في رحلة تتجاوز المألوف، وهو ما نهدف لتحقيقه عبر تجارب الواقع الافتراضي.
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/N0wGv0pT34Y" 
                    title="Cosmic Eye (Original video) - High definition" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                </iframe>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vrExperiences.map((exp) => (
          <Card key={exp.title} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
             <div className="aspect-video relative">
               <Image 
                src={exp.thumbnailUrl} 
                alt={exp.title} 
                fill 
                className="object-cover"
                data-ai-hint={exp.thumbnailHint}
                />
            </div>
            <CardHeader className='items-center text-center'>
               <div className="p-3 bg-primary/10 rounded-full mb-2">
                {exp.icon}
               </div>
              <CardTitle className="font-headline text-xl">{exp.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <CardDescription>{exp.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-16 bg-primary/5 text-center p-8 md:p-12 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold mb-4">
            قريبًا... بُعد جديد لرحلتك
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            نعمل بجد لتطوير هذه التجارب الفريدة التي ستكون متاحة قريبًا. ستتمكن من استخدام نظارات الواقع الافتراضي للانغماس في رحلات تعزز إيمانك وتوسع آفاقك.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">احصل على إشعار عند الإطلاق</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
