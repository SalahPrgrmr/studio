'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  Star,
  PenSquare,
  MessageSquare,
  Users,
  Loader2,
} from 'lucide-react';
import { useUser, useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { useEffect } from 'react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const badges = [
    { id: 'new_participant', name: 'مشارك جديد', icon: <Star className="h-6 w-6" />, description: 'أول مشاركة في المنتدى' },
    { id: 'story_writer', name: 'كاتب قصة', icon: <PenSquare className="h-6 w-6" />, description: 'شاركت قصة نجاح ملهمة' },
    { id: 'active_member', name: 'عضو فعال', icon: <MessageSquare className="h-6 w-6" />, description: 'تفاعلت في 10 نقاشات' },
];

const titles = [
    { name: 'مستكشف', points: 0 },
    { name: 'باحث عن الحقيقة', points: 1000 },
    { name: 'صاحب بصيرة', points: 2500 },
    { name: 'منارة يقين', points: 5000 },
];

const getTitleByPoints = (points: number) => {
    let currentTitle = titles[0].name;
    for (const title of titles) {
        if (points >= title.points) {
            currentTitle = title.name;
        } else {
            break;
        }
    }
    return currentTitle;
};


export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const profileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(profileRef);

  useEffect(() => {
    // Create a profile document if it doesn't exist for a logged-in user
    if (user && !isUserLoading && !userProfile && !isProfileLoading) {
      const newProfile: UserProfile = {
        id: user.uid,
        displayName: user.displayName || 'مستخدم جديد',
        photoURL: user.photoURL || '',
        role: 'user', // Default role
        points: 0,
        title: 'مستكشف',
        badges: [],
        stats: {
          storiesPublished: 0,
          forumPosts: 0,
          audioContributions: 0,
        },
      };
      // Non-blocking write to create the profile
      setDocumentNonBlocking(profileRef!, newProfile, { merge: false });
    }
  }, [user, isUserLoading, userProfile, isProfileLoading, profileRef]);
  
  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl text-center py-20 animate-in fade-in duration-500">
        <Card>
          <CardHeader>
            <CardTitle>يجب عليك تسجيل الدخول</CardTitle>
            <CardDescription>
              لعرض ملفك الشخصي، يرجى تسجيل الدخول أولاً.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">الذهاب إلى صفحة تسجيل الدخول</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!userProfile) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="ml-4">جاري إعداد ملفك الشخصي...</p>
        </div>
    );
  }

  const currentPoints = userProfile.points;
  const currentTitleName = getTitleByPoints(currentPoints);
  const currentTitleInfo = titles.find(t => t.name === currentTitleName);
  const currentTitleIndex = titles.findIndex(t => t.name === currentTitleName);
  const nextTitleInfo = titles[currentTitleIndex + 1];

  const progressToNextTitle = nextTitleInfo && currentTitleInfo ?
    ((currentPoints - currentTitleInfo.points) / (nextTitleInfo.points - currentTitleInfo.points)) * 100
    : 100;
  
  const earnedBadges = badges.filter(b => userProfile.badges?.includes(b.id));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
          <AvatarImage src={userProfile.photoURL || user.photoURL || ''} alt={userProfile.displayName || 'User'} />
          <AvatarFallback className="text-4xl">
            {userProfile.displayName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-right">
          <h1 className="font-headline text-4xl font-bold">{userProfile.displayName}</h1>
          <p className="text-xl text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            {userProfile.title}
          </p>
        </div>
        {userProfile.role === 'admin' && (
            <Button asChild className="ml-auto">
                <Link href="/admin">لوحة التحكم</Link>
            </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                مقياس تقدمك
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-primary">{currentTitleInfo?.name}</span>
                  <span className="text-muted-foreground">{nextTitleInfo?.name || 'أعلى لقب'}</span>
                </div>
                <Progress value={progressToNextTitle} className="h-4" />
                <div className="text-center text-muted-foreground">
                    <p>
                        {nextTitleInfo ? 
                        `${nextTitleInfo.points - currentPoints} نقطة متبقية للوصول إلى لقب "${nextTitleInfo.name}"` :
                        "لقد وصلت إلى أعلى لقب! تهانينا!"}
                    </p>
                    <p className="font-bold text-lg text-foreground">{currentPoints} نقطة مكتسبة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
           <Card className="shadow-md">
                <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    شاراتك المكتسبة
                </CardTitle>
                 <CardDescription>
                    كل شارة تمثل إنجازًا ومساهمة قيمة في مجتمع اليقين.
                 </CardDescription>
                </CardHeader>
                <CardContent>
                    {earnedBadges.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            <TooltipProvider>
                                {earnedBadges.map(badge => (
                                    <Tooltip key={badge.id}>
                                        <TooltipTrigger asChild>
                                             <div className="flex flex-col items-center text-center gap-2 cursor-pointer transition-transform hover:scale-110">
                                                <div className="p-4 bg-primary/10 text-primary rounded-full">
                                                    {badge.icon}
                                                </div>
                                                <span className="text-sm font-medium">{badge.name}</span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{badge.description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                             </TooltipProvider>
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-4">لم تكتسب أي شارات بعد. ابدأ بالمشاركة!</p>
                    )}
                </CardContent>
           </Card>
        </div>

        <aside className="space-y-8">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-primary" />
                        ملخص المساهمات
                    </CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">القصص المنشورة</span>
                        <span className="font-bold">{userProfile.stats?.storiesPublished || 0}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">المشاركات في المنتدى</span>
                        <span className="font-bold">{userProfile.stats?.forumPosts || 0}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">مشاركات صوتية</span>
                        <span className="font-bold">{userProfile.stats?.audioContributions || 0}</span>
                    </div>
                 </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
