'use client';

import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, ThumbsUp, Send, User, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo, use } from 'react'; // Import `use` from React
import { useFirebase, addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { doc, collection, query, orderBy, getDoc, getDocs, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import type { ForumPost, ForumComment } from '@/lib/types';
import { format } from 'date-fns';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

// The page receives a params promise, which is resolved using `use(params)`.
export default function ForumPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // Correctly unwrap the params promise

    const { firestore } = useFirebase();
    const { user } = useUser();
    const { toast } = useToast();
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const [post, setPost] = useState<ForumPost | null>(null);
    const [comments, setComments] = useState<ForumComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const postRef = useMemo(
        () => (firestore ? doc(firestore, 'forum_posts', id) : null),
        [firestore, id]
    );

    useEffect(() => {
        if (!postRef) return;

        const fetchPostAndComments = async () => {
            setIsLoading(true);
            try {
                const postSnap = await getDoc(postRef);

                if (postSnap.exists()) {
                    setPost({ id: postSnap.id, ...postSnap.data() } as ForumPost);

                    const commentsCol = collection(postRef, 'comments');
                    const commentsQuery = query(commentsCol, orderBy('timestamp', 'asc'));
                    const commentsSnap = await getDocs(commentsQuery);
                    const commentsData = commentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ForumComment));
                    setComments(commentsData);
                } else {
                    setPost(null);
                }
            } catch (e) {
                console.error("Error fetching post or comments:", e);
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postRef]);

    const hasLiked = user && post?.likes?.includes(user.uid);

    const handleLike = () => {
        if (!user || !postRef) {
            toast({ variant: 'destructive', title: 'يجب عليك تسجيل الدخول أولاً' });
            return;
        }
        updateDocumentNonBlocking(postRef, {
            likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
        });
        setPost(currentPost => {
            if (!currentPost) return null;
            const currentLikes = currentPost.likes || [];
            const newLikes = hasLiked
                ? currentLikes.filter(uid => uid !== user.uid)
                : [...currentLikes, user.uid];
            return { ...currentPost, likes: newLikes };
        });
    };

    const handleAddComment = async () => {
        if (!user || !postRef || !newComment.trim()) return;
        setIsSubmittingComment(true);

        const commentsCollection = collection(postRef, 'comments');
        const commentData = {
            author: user.displayName || 'مستخدم',
            authorId: user.uid,
            avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
            text: newComment,
            timestamp: new Date().toISOString(),
        };

        try {
            const newDocRef = await addDocumentNonBlocking(commentsCollection, commentData);
            const newCommentForUI: ForumComment = { ...commentData, id: newDocRef.id };
            setComments(currentComments => [...currentComments, newCommentForUI]);
            updateDocumentNonBlocking(postRef, { commentCount: increment(1) });
            setPost(currentPost => currentPost ? ({ ...currentPost, commentCount: (currentPost.commentCount || 0) + 1 }) : null);
            setNewComment('');
            toast({ title: 'تم إضافة تعليقك بنجاح!' });
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل إرسال التعليق'});
        } finally {
            setIsSubmittingComment(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
    }

    if (!post) {
        return (
          <div className="container mx-auto max-w-2xl text-center py-20">
              <Card className="border-destructive bg-destructive/5">
                  <CardHeader>
                      <div className="mx-auto bg-destructive/10 rounded-full p-3 w-fit mb-4"><AlertTriangle className="h-10 w-10 text-destructive" /></div>
                      <CardTitle className="text-destructive">فشل تحميل المشاركة</CardTitle>
                      <CardDescription>لم يتم العثور على المشاركة المطلوبة في قاعدة البيانات.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">المعرّف الذي تم البحث عنه:</p>
                      <div className="font-mono text-sm bg-muted rounded-md p-3 break-all">{id || "غير متوفر"}</div>
                      {error && (
                          <div className="text-left text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                              <p className="font-bold mb-1">رسالة الخطأ:</p>
                              <pre className="whitespace-pre-wrap">{error.message}</pre>
                          </div>
                      )}
                  </CardContent>
                   <CardFooter><Button asChild className="mx-auto"><Link href="/community/forum">العودة إلى المنتدى</Link></Button></CardFooter>
              </Card>
          </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
             <div className="mb-8">
                <Button asChild variant="ghost"><Link href="/community/forum" className="flex items-center gap-2 text-muted-foreground"><ArrowLeft className="h-4 w-4" />العودة إلى المنتدى</Link></Button>
            </div>
            <Card className="mb-8 shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl sm:text-4xl">{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-4 space-x-4 space-x-reverse">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8"><AvatarImage src={post.avatarUrl} alt={post.author} /><AvatarFallback>{post.author.charAt(0)}</AvatarFallback></Avatar>
                            <span>{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{format(new Date(post.timestamp), 'd MMMM, yyyy')}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed">
                        {(post.content || '').split('\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4 mt-4">
                    <div className="flex items-center space-x-6 space-x-reverse">
                        <div className="flex items-center gap-2 text-muted-foreground"><MessageSquare className="h-5 w-5" /><span>{comments?.length || 0} تعليقات</span></div>
                        <div className="flex items-center gap-2 text-muted-foreground"><ThumbsUp className="h-5 w-5" /><span>{post.likes?.length || 0} إعجابات</span></div>
                    </div>
                     <Button variant={hasLiked ? 'default' : 'outline'} onClick={handleLike} disabled={!user}><ThumbsUp className="ml-2 h-4 w-4" />{hasLiked ? 'تم الإعجاب' : 'إعجاب'}</Button>
                </CardFooter>
            </Card>
            <h2 className="font-headline text-2xl font-bold mb-6 flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" />التعليقات</h2>
            <Card className="mb-8 bg-muted/50">
                 <CardHeader><CardTitle className="text-lg font-headline">أضف تعليقًا</CardTitle></CardHeader>
                <CardContent>
                  {user ? (
                    <div className="flex items-start gap-4">
                        <Avatar><AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} /><AvatarFallback><User /></AvatarFallback></Avatar>
                        <div className="flex-1 space-y-4">
                            <Textarea placeholder="اكتب تعليقك هنا..." className="bg-background" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmittingComment} />
                            <Button onClick={handleAddComment} disabled={isSubmittingComment || !newComment.trim()}>{isSubmittingComment ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Send className="ml-2 h-4 w-4" />}إرسال التعليق</Button>
                        </div>
                    </div>
                  ) : (
                    <p className='text-muted-foreground'><Link href="/login" className="text-primary underline">سجل الدخول</Link> لإضافة تعليق.</p>
                  )}
                </CardContent>
            </Card>
            <div className="space-y-6">
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <Avatar className="h-10 w-10"><AvatarImage src={comment.avatarUrl} alt={comment.author} /><AvatarFallback>{comment.author.charAt(0)}</AvatarFallback></Avatar>
                            <div className="flex-1 rounded-lg border bg-card p-4">
                                <div className="flex justify-between items-center mb-2"><p className="font-bold text-sm">{comment.author}</p><p className="text-xs text-muted-foreground">{format(new Date(comment.timestamp), 'p, d MMM')}</p></div>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !isLoading &&
                    <div className="text-center text-muted-foreground py-8"><p>لا توجد تعليقات حتى الآن. كن أول من يشارك رأيه!</p></div>
                )}
                 {isLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />}
            </div>
        </div>
    );
}
