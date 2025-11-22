'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Mic, Headphones, User, PlusCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import type { VoiceChatRoom } from '@/lib/types';


export default function AudioRoomsPage() {
  const { firestore, user } = useFirebase();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const roomsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'voice_chat_rooms') : null),
    [firestore]
  );
  const roomsQuery = useMemoFirebase(
    () => (roomsCollection ? query(roomsCollection, orderBy('creationDate', 'desc')) : null),
    [roomsCollection]
  );

  const { data: audioRooms, isLoading } = useCollection<VoiceChatRoom>(roomsQuery);

  const handleCreateRoom = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'غير مصرح به',
        description: 'يجب عليك تسجيل الدخول لإنشاء غرفة.',
      });
      return;
    }
    setIsCreatingRoom(true);
    
    const newRoom: Omit<VoiceChatRoom, 'id'> = {
      name: `غرفة ${user.displayName || 'مستخدم'}`,
      description: 'انضم إلى هذه المحادثة الصوتية',
      ownerId: user.uid,
      creationDate: new Date().toISOString(),
      members: { [user.uid]: 'owner' }
    };
    
    try {
      const docRef = await addDocumentNonBlocking(roomsCollection!, newRoom);
      toast({
        title: 'تم إنشاء الغرفة!',
        description: 'تم إنشاء غرفتك الجديدة بنجاح.',
      });
      router.push(`/community/audio-rooms/${docRef.id}`);
    } catch(e) {
        // Error is handled by the global error handler via non-blocking update
    } finally {
      setIsCreatingRoom(false);
    }
  };


  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Radio className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          غرف الدردشة الصوتية
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          انضم إلى محادثات مباشرة، استمع للخبراء، وشارك أفكارك مع المجتمع.
        </p>
      </div>

      <div className="text-center mb-12">
        <Button size="lg" onClick={handleCreateRoom} disabled={!user || isCreatingRoom}>
          {isCreatingRoom ? (
            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
          ) : (
            <PlusCircle className="ml-2 h-5 w-5" />
          )}
          ابدأ غرفة جديدة
        </Button>
         {!user && <p className="text-sm text-muted-foreground mt-2">يجب عليك تسجيل الدخول لإنشاء غرفة.</p>}
      </div>
      
      {isLoading && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                    <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-5 bg-muted rounded w-1/4"></div>
                         <div className="flex space-x-2 space-x-reverse">
                            <div className="h-6 w-16 bg-muted rounded-full"></div>
                            <div className="h-6 w-16 bg-muted rounded-full"></div>
                        </div>
                    </CardContent>
                     <div className="p-6 pt-0">
                        <div className="h-10 bg-muted rounded-md"></div>
                    </div>
                </Card>
            ))}
         </div>
      )}

      {!isLoading && audioRooms && audioRooms.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
            <Radio className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold">لا توجد غرف متاحة حاليًا</h3>
            <p className="mt-2">كن أول من يبدأ غرفة جديدة ويدعو الآخرين للانضمام!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {audioRooms?.map((room) => (
          <Card
            key={room.id}
            className="flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="font-headline text-xl">{room.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-2">
                <User className="h-4 w-4" />
                {/* In a real app, you'd fetch the owner's name */}
                بإدارة: مالك الغرفة
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
               <div className="flex items-center text-muted-foreground">
                <Headphones className="ml-2 h-5 w-5" />
                <span>{Object.keys(room.members || {}).length} مشارك</span>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                {/* Tags can be added in the future */}
                <Badge variant="secondary">نقاش</Badge>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={`/community/audio-rooms/${room.id}`}>انضم الآن</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
