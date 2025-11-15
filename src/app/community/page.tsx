import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, MessageSquare, HandHeart, HeartHandshake, Radio, Video } from 'lucide-react';

const communitySections = [
  {
    href: '/community/forum',
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'المنتدى',
    description: 'شارك بأفكارك، واطرح الأسئلة، وتواصل مع الآخرين في رحلتهم.',
  },
  {
    href: '/community/audio-rooms',
    icon: <Radio className="h-8 w-8 text-primary" />,
    title: 'غرف الدردشة الصوتية',
    description: 'انضم إلى نقاشات صوتية مباشرة حول مواضيع تهمك واستمع لآراء متنوعة.',
  },
  {
    href: '/community/video-rooms',
    icon: <Video className="h-8 w-8 text-primary" />,
    title: 'غرف البث المرئي',
    description: 'شاهد واستمع إلى بث مباشر وورش عمل تفاعلية من قبل خبراء ومؤثرين.',
  },
  {
    href: '/community/volunteers',
    icon: <HandHeart className="h-8 w-8 text-primary" />,
    title: 'المتطوعون والمؤثرون',
    description: 'انضم إلينا في نشر رسالة اليقين وساعد في نمو هذا المجتمع.',
  },
  {
    href: '/community/supporters',
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    title: 'الداعمون',
    description: 'ساهم في استمرارية وتطور المنصة من خلال دعمك.',
  },
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Users className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مجتمع اليقين
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          هنا نلتقي، نتناقش، وندعم بعضنا البعض في رحلتنا نحو اليقين.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {communitySections.map((section) => (
          <Link href={section.href} key={section.title} className="block hover:no-underline">
            <Card className="h-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <CardHeader className="flex-row items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">{section.icon}</div>
                <div className="flex-1">
                  <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  {section.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
