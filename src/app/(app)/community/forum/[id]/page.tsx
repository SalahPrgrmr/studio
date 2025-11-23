'use client'

import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, ThumbsUp, Send, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useFirebase, useDoc, useCollection, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { doc, collection, query, orderBy, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import type { ForumPost, ForumComment } from '@/lib/types';
import { format } from 'date-fns';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export default function ForumPostPage({ params }: { params: { id: string } }) {
    const { firestore } = useFirebase();
    const { user } = useUser();
    const { toast } = useToast();
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const postRef = useMemoFirebase(
        () => (firestore ? doc(firestore, 'forum_posts', params.id) : null),
        [firestore, params.id]
    );

    const commentsCollection = useMemoFirebase(
        () => (firestore ? collection(firestore, 'forum_posts', params.id, 'comments') : null),
        [firestore, params.id]
    );
    const commentsQuery = useMemoFirebase(
        () => (commentsCollection ? query(commentsCollection, orderBy('timestamp', 'asc')) : null),
        [commentsCollection]
    );
    
    const { data: post, isLoading: isPostLoading } = useDoc<ForumPost>(postRef);
    const { data: comments, isLoading: areCommentsLoading } = useCollection<ForumComment>(commentsQuery);

    const hasLiked = user && post?.likes?.includes(user.uid);

    const handleLike = () => {
        if (!user || !postRef) {
            toast({ variant: 'destructive', title: 'يجب عليك تسجيل الدخول أولاً' });
            return;
        }
        updateDocumentNonBlocking(postRef, {
            likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
        });
    };

    const handleAddComment = async () => {
        if (!user || !commentsCollection || !newComment.trim()) {
            toast({ variant: 'destructive', title: 'لا يمكن إرسال تعليق فارغ' });
            return;
        }
        setIsSubmittingComment(true);

        const commentData = {
            author: user.displayName || 'مستخدم',
            authorId: user.uid,
            avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
            text: newComment,
            timestamp: new Date().toISOString(),
        };

        try {
            await addDocumentNonBlocking(commentsCollection, commentData);
            
            // Also update the comment count on the post
            if (postRef) {
                updateDocumentNonBlocking(postRef, {
                    commentCount: increment(1)
                });
            }

            setNewComment('');
            toast({ title: 'تم إضافة تعليقك بنجاح!' });
        } catch (error) {
            // Handled globally
        } finally {
            setIsSubmittingComment(false);
        }
    };


    if (isPostLoading || areCommentsLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
    }

    if (!post) {
        notFound();
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
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{format(new Date(post.timestamp), 'd MMMM, yyyy')}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed">
                        {post.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4 mt-4">
                    <div className="flex items-center space-x-6 space-x-reverse">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageSquare className="h-5 w-5" />
                            <span>{comments?.length || 0} تعليقات</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ThumbsUp className="h-5 w-5" />
                            <span>{post.likes?.length || 0} إعجابات</span>
                        </div>
                    </div>
                     <Button variant={hasLiked ? 'default' : 'outline'} onClick={handleLike} disabled={!user}>
                        <ThumbsUp className="ml-2 h-4 w-4" />
                        {hasLiked ? 'تم الإعجاب' : 'إعجاب'}
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
                  {user ? (
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <Textarea 
                                placeholder="اكتب تعليقك هنا..." 
                                className="bg-background" 
                                rows={3}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                disabled={isSubmittingComment}
                            />
                            <Button onClick={handleAddComment} disabled={isSubmittingComment || !newComment.trim()}>
                                {isSubmittingComment ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Send className="ml-2 h-4 w-4" />}
                                إرسال التعليق
                            </Button>
                        </div>
                    </div>
                  ) : (
                    <p className='text-muted-foreground'>
                        <Link href="/login" className="text-primary underline">سجل الدخول</Link> لإضافة تعليق.
                    </p>
                  )}
                </CardContent>
            </Card>
            
            {/* Existing Comments */}
            <div className="space-y-6">
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 rounded-lg border bg-card p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-sm">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">{format(new Date(comment.timestamp), 'p, d MMM')}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !areCommentsLoading &&
                    <div className="text-center text-muted-foreground py-8">
                        <p>لا توجد تعليقات حتى الآن. كن أول من يشارك رأيه!</p>
                    </div>
                )}
                 {areCommentsLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />}
            </div>
        </div>
    );
}
