import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, PlusCircle } from 'lucide-react';

const forumPosts = [
  {
    id: 1,
    title: 'How do you differentiate between intuition and fear?',
    author: 'Clara W.',
    authorInitials: 'CW',
    avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    timestamp: '2 hours ago',
    tags: ['discussion', 'philosophy'],
    comments: 12,
    likes: 34,
  },
  {
    id: 2,
    title: 'My story: Finding certainty after a major life change.',
    author: 'Ben S.',
    authorInitials: 'BS',
    avatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    timestamp: '1 day ago',
    tags: ['personal-story', 'inspiration'],
    comments: 8,
    likes: 56,
  },
  {
    id: 3,
    title: 'A practical guide to daily reflection that worked for me.',
    author: 'Aisha K.',
    authorInitials: 'AK',
    avatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    timestamp: '3 days ago',
    tags: ['guidance', 'practice'],
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
            Community Forum
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Share your thoughts, ask questions, and connect with others.
          </p>
        </div>
        <Button size="lg" disabled>
          <PlusCircle className="mr-2 h-5 w-5" />
          New Post (Coming Soon)
        </Button>
      </div>

      <div className="space-y-6">
        {forumPosts.map((post) => (
          <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground pt-2 space-x-2">
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
              <div className="flex space-x-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments} Comments</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes} Likes</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-muted-foreground">More discussions and features coming soon!</p>
      </div>
    </div>
  );
}
