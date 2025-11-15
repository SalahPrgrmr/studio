'use client';

import { notFound, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Headphones,
  User,
  Mic,
  Volume2,
  PhoneOff,
  ArrowLeft,
  Settings,
  Share2,
  Copy,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { VoiceChatRoom } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AudioRoomPage({ params }: { params: { id: string } }) {
  const { firestore, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const roomRef = useMemoFirebase(
      () => (firestore && params.id ? doc(firestore, 'voice_chat_rooms', params.id) : null),
      [firestore, params.id]
  );
  const { data: room, isLoading } = useDoc<VoiceChatRoom>(roomRef);

  const isOwner = user && room ? user.uid === room.ownerId : false;

  const copyInviteLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'تم نسخ الرابط!',
        description: 'يمكنك الآن مشاركة رابط الغرفة مع الآخرين.',
      });
    });
  };

  const leaveRoom = async () => {
    if (!user || !firestore || !room) return;
    
    const newMembers = { ...room.members };
    delete newMembers[user.uid];

    if (Object.keys(newMembers).length === 0) {
      // Logic to delete the room if the last member leaves can be added here
      console.log("Last member left. Room could be deleted.");
    }
    
    try {
        await updateDoc(roomRef!, { members: newMembers });
        toast({ title: 'لقد غادرت الغرفة' });
        router.push('/community/audio-rooms');
    } catch(e) {
        // Error handled globally
    }
  };
  
   const joinRoom = async () => {
    if (!user || !firestore || !room || (room.members && room.members[user.uid])) return;
    
    const newMembers = { ...room.members, [user.uid]: 'listener' as const };
    
    try {
        await updateDoc(roomRef!, { members: newMembers });
        toast({ title: 'أهلاً بك في الغرفة!' });
    } catch(e) {
        // Error handled globally
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }

  if (!room) {
    notFound();
  }
  
  const hasJoined = user && room.members && room.members[user.uid];

  const participants = room.members
    ? Object.entries(room.members).map(([uid, role]) => ({
        id: uid,
        name: uid === room.ownerId ? 'المالك' : `مستخدم ${uid.substring(0, 4)}`,
        avatar: `https://picsum.photos/seed/${uid}/40/40`,
        role,
        isMuted: role !== 'speaker', // Example logic
      }))
    : [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link
            href="/community/audio-rooms"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة إلى كل الغرف
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-3xl sm:text-4xl flex items-center gap-3">
                <Headphones className="h-8 w-8 text-primary" />
                {room.name}
                </CardTitle>
                <CardDescription className="mt-4 text-base">{room.description}</CardDescription>
            </div>
            <div className="flex gap-2">
                 {isOwner && (
                    <Button variant="outline" size="icon" disabled>
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">إعدادات الغرفة</span>
                    </Button>
                 )}
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={copyInviteLink}>
                                <Share2 className="h-5 w-5" />
                                <span className="sr-only">مشاركة الغرفة</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>نسخ رابط الدعوة</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-headline text-xl mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            المشاركون ({participants.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {participants.map((participant) => (
              <div key={participant.id} className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-primary/50">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {participant.role === 'speaker' || participant.role === 'owner' ? (
                     <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                        <Mic className="h-3 w-3" />
                     </div>
                  ): (
                     <div className="absolute -bottom-1 -right-1 bg-muted text-muted-foreground rounded-full p-1">
                        <Headphones className="h-3 w-3" />
                     </div>
                  )}
                </div>
                <span className="text-sm font-medium truncate w-full">{participant.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row items-center justify-center gap-4 border-t pt-6 mt-4">
           {user ? (
                hasJoined ? (
                    <>
                        <Button size="lg" variant="outline" disabled>
                            <Mic className="ml-2 h-5 w-5" /> طلب التحدث
                        </Button>
                        <Button size="lg" variant="destructive" onClick={leaveRoom}>
                            <PhoneOff className="ml-2 h-5 w-5" /> مغادرة
                        </Button>
                    </>
                ) : (
                    <Button size="lg" onClick={joinRoom}>
                        <Volume2 className="ml-2 h-5 w-5" /> انضم كمستمع
                    </Button>
                )
           ) : (
             <p className="text-muted-foreground">
                <Link href="/login" className="text-primary underline">سجل الدخول</Link> للانضمام إلى المحادثة.
             </p>
           )}
        </CardFooter>
      </Card>
      
       <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">هذه الميزة لا تزال قيد التطوير. وظيفة الصوت غير مفعلة بعد.</p>
      </div>
    </div>
  );
}
