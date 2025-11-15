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
  Video,
  User,
  Users,
  Eye,
  Clapperboard,
  ArrowLeft,
  Settings,
  Share2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { VideoChatRoom } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useEffect, useRef, useState } from 'react';

export default function VideoRoomPage({ params }: { params: { id: string } }) {
  const { firestore, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);

  const roomRef = useMemoFirebase(
      () => (firestore && params.id ? doc(firestore, 'video_chat_rooms', params.id) : null),
      [firestore, params.id]
  );
  const { data: room, isLoading } = useDoc<VideoChatRoom>(roomRef);

  const isOwner = user && room ? user.uid === room.ownerId : false;
  const hasJoined = user && room?.members && room.members[user.uid];

  useEffect(() => {
    if (isOwner && hasJoined) {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setHasCameraPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
          }
        };
        getCameraPermission();
    } else if (hasJoined) {
        // In the future, this is where a viewer would connect to the stream
    }
  }, [isOwner, hasJoined]);


  const copyInviteLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'تم نسخ الرابط!',
        description: 'يمكنك الآن مشاركة رابط البث مع الآخرين.',
      });
    });
  };
  
   const joinRoom = async () => {
    if (!user || !firestore || !room || hasJoined) return;
    
    const role = user.uid === room.ownerId ? 'owner' : 'viewer';
    const newMembers = { ...room.members, [user.uid]: role as const };
    
    try {
        await updateDoc(roomRef!, { members: newMembers });
        toast({ title: 'أهلاً بك في غرفة البث!' });
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
  
  const participants = room.members
    ? Object.entries(room.members).map(([uid, role]) => ({
        id: uid,
        name: uid === room.ownerId ? 'المقدم' : `مشاهد ${uid.substring(0, 4)}`,
        avatar: `https://picsum.photos/seed/${uid}/40/40`,
        role,
      }))
    : [];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link
            href="/community/video-rooms"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة إلى كل الغرف
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
            <Card className="shadow-lg overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                    {hasJoined ? (
                        isOwner ? (
                          <>
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            {!hasCameraPermission && (
                                <Alert variant="destructive" className="m-4">
                                  <AlertTitle>الكاميرا غير متاحة</AlertTitle>
                                  <AlertDescription>
                                    يرجى السماح بالوصول إلى الكاميرا والميكروفون لبدء البث.
                                  </AlertDescription>
                                </Alert>
                            )}
                          </>
                        ) : (
                           <div className="text-center text-muted-foreground">
                             <p>أنت تشاهد الآن... (سيتم عرض بث الفيديو هنا)</p>
                           </div>
                        )
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <Video className="h-16 w-16 mx-auto mb-4" />
                            <p>انضم للغرفة لبدء المشاهدة.</p>
                        </div>
                    )}
                </div>
                <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <CardTitle className="font-headline text-2xl sm:text-3xl flex items-center gap-3">
                        <Clapperboard className="h-7 w-7 text-primary" />
                        {room.name}
                        </CardTitle>
                        <CardDescription className="mt-2 text-base">تقديم: {room.presenter}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="h-5 w-5" />
                        <span>{participants.length} مشاهد</span>
                    </div>
                </div>
                </CardHeader>
                <CardFooter className="flex flex-col md:flex-row items-center justify-center gap-4 border-t pt-6">
                 {user ? (
                        !hasJoined && (
                            <Button size="lg" onClick={joinRoom} className="w-full sm:w-auto">
                                <Eye className="ml-2 h-5 w-5" /> انضم للمشاهدة
                            </Button>
                        )
                   ) : (
                     <p className="text-muted-foreground">
                        <Link href="/login" className="text-primary underline">سجل الدخول</Link> للانضمام إلى البث.
                     </p>
                   )}
                     {isOwner && hasJoined && (
                         <Button variant="destructive" size="lg" disabled className="w-full sm:w-auto">إنهاء البث (قريبًا)</Button>
                     )}
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={copyInviteLink}>
                                    <Share2 className="ml-2 h-5 w-5" /> مشاركة
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>نسخ رابط الدعوة</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardFooter>
            </Card>
        </main>

        <aside>
            <Card className="shadow-lg">
                 <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        المشاركون ({participants.length})
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {participants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-primary/50">
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium truncate">{participant.name}</p>
                                <p className="text-sm text-muted-foreground">{participant.role === 'owner' ? 'المقدم' : 'مشاهد'}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                 </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}

    