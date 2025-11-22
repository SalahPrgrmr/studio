'use client'

import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, ThumbsUp, Send, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data, this would come from a database in a real app
const forumPosts = [
  {
    id: 'how-to-differentiate-intuition-from-fear',
    title: 'كيف تفرق بين الحدس والخوف؟',
    author: 'كلارا و.',
    authorInitials: 'CW',
    avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    timestamp: 'قبل ساعتين',
    content: 'أجد صعوبة في التمييز بين صوت الحدس الذي يجب أن أتبعه، وصوت الخوف الذي يمنعني من التقدم. كلاهما يبدو قويًا في بعض الأحيان. كيف يمكن التفريق بينهما لاتخاذ قرارات أفضل وأكثر يقينًا؟ هل هناك علامات واضحة أو ممارسات تساعد على شحذ هذه المهارة؟ أود سماع تجاربكم وآرائكم.',
    comments: [
        { id: 1, author: 'أحمد الحكيم', avatar: 'https://picsum.photos/seed/comment1/40/40', text: 'سؤال عميق. أعتقد أن الحدس يأتي بشعور من السلام الداخلي والوضوح، حتى لو كان القرار صعبًا. أما الخوف فيأتي مع شعور بالضيق والتوتر. التأمل يساعد كثيرًا في تهدئة العقل وسماع صوت الحدس بوضوح أكبر.', timestamp: 'قبل ساعة' },
        { id: 2, author: 'فاطمة', avatar: 'https://picsum.photos/seed/comment2/40/40', text: 'أتفق مع أحمد. أضيف أن الحدس غالبًا ما يكون شعورًا هادئًا وثابتًا، بينما الخوف يكون صاخبًا ومليئًا بالسيناريوهات الكارثية. جربي كتابة أفكارك، فهذا يساعد على فرزها.', timestamp: 'قبل 45 دقيقة' }
    ],
    likes: 34,
  },
   {
    id: 'my-story-finding-certainty',
    title: 'قصتي: العثور على اليقين بعد تغيير كبير في حياتي.',
    author: 'بن س.',
    content: 'مررت بفترة صعبة فقدت فيها وظيفتي وشعرت بالضياع. كانت تلك الفترة مليئة بالشكوك والتساؤلات حول مستقبلي. بدأت رحلتي بالعودة إلى أبسط الأشياء: المشي في الطبيعة، قضاء وقت مع العائلة، وقراءة الكتب الملهمة. شيئًا فشيئًا، بدأت أرى أن اليقين لا يعني معرفة كل شيء، بل الثقة في قدرتي على التعامل مع المجهول. هذا التحول لم يكن سهلاً، لكنه كان يستحق العناء.',
    comments: [],
    likes: 56,
  },
  {
    id: 'practical-guide-to-daily-meditation',
    title: 'دليل عملي للتأمل اليومي نجح معي.',
    author: 'عائشة ك.',
    content: 'كنت أعتقد أن التأمل صعب وممل، لكني اكتشفت طرقًا بسيطة لجعلها عادة يومية. إليكم ما نجح معي: 1. ابدأ بـ 5 دقائق فقط كل صباح. 2. لا تضغط على نفسك لإفراغ عقلك تمامًا، فقط لاحظ الأفكار ودعها تمر. 3. استخدم تطبيقًا موجهًا في البداية. 4. اختر مكانًا هادئًا ومريحًا. الاستمرارية هي المفتاح!',
    comments: [],
    likes: 102,
  },
];

export default function ForumPostPage({ params }: { params: { id: string } }) {
    const post = forumPosts.find(p => p.id === params.id);
    const [likes, setLikes] = useState(post?.likes || 0);

    if (!post) {
        notFound();
    }

    const handleLike = () => {
        setLikes(prev => prev + 1);
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
             <div className="mb-8">
                <Button asChild variant="ghost">
                    <Link href="/community/forum" className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        العودة إلى المنتدى
                    </Link>
                </Button>
            </div>
            
            <Card className="mb-8 shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl sm:text-4xl">{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-4 space-x-4 space-x-reverse">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                            <AvatarImage src={post.avatarUrl} alt={post.author} />
                            <AvatarFallback>{post.authorInitials}</AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed">
                        <p>{post.content}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4 mt-4">
                    <div className="flex items-center space-x-6 space-x-reverse">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageSquare className="h-5 w-5" />
                            <span>{post.comments.length} تعليقات</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ThumbsUp className="h-5 w-5" />
                            <span>{likes} إعجابات</span>
                        </div>
                    </div>
                     <Button variant="outline" onClick={handleLike}>
                        <ThumbsUp className="ml-2 h-4 w-4" />
                        إعجاب
                    </Button>
                </CardFooter>
            </Card>

            {/* Comments Section */}
            <h2 className="font-headline text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                التعليقات
            </h2>

            {/* Add Comment Form */}
            <Card className="mb-8 bg-muted/50">
                 <CardHeader>
                     <CardTitle className="text-lg font-headline">أضف تعليقًا</CardTitle>
                 </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <Textarea placeholder="اكتب تعليقك هنا..." className="bg-background" rows={3} disabled />
                            <Button disabled>
                                <Send className="ml-2 h-4 w-4" />
                                إرسال التعليق (قريبًا)
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* Existing Comments */}
            <div className="space-y-6">
                {post.comments.length > 0 ? (
                    post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.avatar} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 rounded-lg border bg-card p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-sm">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>لا توجد تعليقات حتى الآن. كن أول من يشارك رأيه!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// This function can be used if you switch to Server-Side Rendering with dynamic data
// export async function generateStaticParams() {
//   // In a real app, you would fetch post IDs from a database
//   return forumPosts.map((post) => ({
//     id: post.id,
//   }))
// }
