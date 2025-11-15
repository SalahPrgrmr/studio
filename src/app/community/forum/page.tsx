'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const forumPosts = [
  {
    id: 'how-to-differentiate-intuition-from-fear',
    title: 'كيف تفرق بين الحدس والخوف؟',
    author: 'كلارا و.',
    authorInitials: 'CW',
    avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    timestamp: 'قبل ساعتين',
    tags: ['نقاش', 'فلسفة'],
    comments: 12,
    likes: 34,
  },
  {
    id: 'my-story-finding-certainty',
    title: 'قصتي: العثور على اليقين بعد تغيير كبير في حياتي.',
    author: 'بن س.',
    authorInitials: 'BS',
    avatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    timestamp: 'قبل يوم واحد',
    tags: ['قصة-شخصية', 'إلهام'],
    comments: 8,
    likes: 56,
  },
  {
    id: 'practical-guide-to-daily-meditation',
    title: 'دليل عملي للتأمل اليومي نجح معي.',
    author: 'عائشة ك.',
    authorInitials: 'AK',
    avatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    timestamp: 'قبل 3 أيام',
    tags: ['إرشاد', 'ممارسة'],
    comments: 21,
    likes: 102,
  },
];

export default function ForumPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            منتدى المجتمع
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            شارك بأفكارك، واطرح الأسئلة، وتواصل مع الآخرين.
          </p>
        </div>
        <Button size="lg" disabled>
          <PlusCircle className="ml-2 h-5 w-5" />
          مشاركة جديدة (قريبًا)
        </Button>
      </div>

      <div className="space-y-6">
        {forumPosts.map((post) => (
          <Link href={`/community/forum/${post.id}`} key={post.id} className="block group">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 transform group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground pt-2 space-x-2 space-x-reverse">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.avatarUrl} alt={post.author} />
                    <AvatarFallback>{post.authorInitials}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 space-x-reverse">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center space-x-6 space-x-reverse text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments} تعليقات</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes} إعجابات</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-muted-foreground">المزيد من المناقشات والميزات قريبًا!</p>
      </div>
    </div>
  );
}
