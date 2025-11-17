'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Clapperboard, PlayCircle, Eye, PlusCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useFirebase,
  useCollection,
  addDocumentNonBlocking,
  useMemoFirebase,
} from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { VideoChatRoom } from '@/lib/types';


export default function VideoRoomsPage() {
  const { firestore, user } = useFirebase();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const roomsCollection = useMemoFirebase(
    () => firestore ? collection(firestore, 'video_chat_rooms') : null,
    [firestore]
  );
  const roomsQuery = useMemoFirebase(
    () => roomsCollection ? query(roomsCollection, orderBy('creationDate', 'desc')) : null,
    [roomsCollection]
  );

  const { data: videoRooms, isLoading } = useCollection<VideoChatRoom>(roomsQuery);

  const handleCreateRoom = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'غير مصرح به',
        description: 'يجب عليك تسجيل الدخول لإنشاء غرفة بث.',
      });
      return;
    }
    setIsCreatingRoom(true);
    
    const newRoom: Omit<VideoChatRoom, 'id'> = {
      name: `بث مباشر مع ${user.displayName || 'مستخدم'}`,
      presenter: user.displayName || 'مقدم غير معروف',
      ownerId: user.uid,
      creationDate: new Date().toISOString(),
      members: { [user.uid]: 'owner' }
    };
    
    try {
      const roomsCollection = collection(firestore, 'video_chat_rooms');
      const docRef = await addDocumentNonBlocking(roomsCollection, newRoom);
      toast({
        title: 'تم إنشاء غرفة البث!',
        description: 'تم إنشاء غرفة البث الجديدة بنجاح.',
      });
      router.push(`/community/video-rooms/${docRef.id}`);
    } catch(e) {
        // Error is handled by the global error handler via non-blocking update
    } finally {
      setIsCreatingRoom(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Video className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          غرف البث المرئي
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          شاهد ورش عمل ولقاءات مباشرة تساهم في تعميق فهمك لرحلة اليقين.
        </p>
      </div>

       <div className="text-center mb-12">
        <Button size="lg" onClick={handleCreateRoom} disabled={!user || isCreatingRoom}>
          {isCreatingRoom ? (
            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
          ) : (
            <Clapperboard className="ml-2 h-5 w-5" />
          )}
          ابدأ بثًا جديدًا
        </Button>
         {!user && <p className="text-sm text-muted-foreground mt-2">يجب عليك تسجيل الدخول لبدء بث مباشر.</p>}
      </div>

      {isLoading && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted"></div>
                    <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                    </CardHeader>
                    <CardContent>
                       <div className="h-10 bg-muted rounded-md"></div>
                    </CardContent>
                </Card>
            ))}
         </div>
      )}
      
      {!isLoading && videoRooms && videoRooms.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
            <Video className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold">لا يوجد بث مباشر حاليًا</h3>
            <p className="mt-2">كن أول من يبدأ بثًا جديدًا ويدعو الآخرين للمشاهدة!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoRooms?.map((room) => (
          <Card key={room.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Link href={`/community/video-rooms/${room.id}`} className="block">
              <div className="aspect-video relative">
                 <Image 
                  src={`https://picsum.photos/seed/${room.id}/600/400`} 
                  alt={room.name} 
                  fill 
                  className="object-cover"
                  data-ai-hint="live stream placeholder"
                  />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-4 right-4 text-white flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{Object.keys(room.members || {}).length}</span>
                 </div>
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{room.name}</CardTitle>
                <CardDescription>تقديم: {room.presenter}</CardDescription>
              </CardHeader>
            </Link>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={`/community/video-rooms/${room.id}`}>
                  <PlayCircle className="ml-2 h-5 w-5" />
                  شاهد الآن
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
    