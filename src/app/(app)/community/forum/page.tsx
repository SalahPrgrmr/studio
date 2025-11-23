'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useFirebase, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { ForumPost } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';


export default function ForumPage() {
  const { firestore } = useFirebase();
  const { user } = useUser();

  const postsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'forum_posts') : null),
    [firestore]
  );
  const postsQuery = useMemoFirebase(
    () => (postsCollection ? query(postsCollection, orderBy('timestamp', 'desc')) : null),
    [postsCollection]
  );

  const { data: forumPosts, isLoading } = useCollection<ForumPost>(postsQuery);

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
        <Button size="lg" asChild>
          <Link href="/community/forum/new">
            <PlusCircle className="ml-2 h-5 w-5" />
            مشاركة جديدة
          </Link>
        </Button>
      </div>

       {isLoading && (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && forumPosts?.length === 0 && (
         <div className="text-center text-muted-foreground py-16">
            <MessageSquare className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold">لا توجد مشاركات بعد</h3>
            <p className="mt-2">كن أول من يبدأ نقاشًا جديدًا!</p>
        </div>
      )}

      <div className="space-y-6">
        {forumPosts?.map((post) => (
          <Link href={`/community/forum/${post.id}`} key={post.id} className="block group">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 transform group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground pt-2 space-x-2 space-x-reverse">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.avatarUrl} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: ar })}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 space-x-reverse">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center space-x-6 space-x-reverse text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.commentCount || 0} تعليقات</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes?.length || 0} إعجابات</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
