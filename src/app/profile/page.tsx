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
  User,
  ShieldCheck,
  Award,
  TrendingUp,
  Star,
  PenSquare,
  MessageSquare,
  Users,
  Loader2,
} from 'lucide-react';
import { useUser } from '@/firebase';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

// Mock data - this would come from Firestore in a real app
const userProfile = {
  points: 1250,
  currentTitle: 'باحث عن الحقيقة',
  badges: [
    { id: 'b1', name: 'مشارك جديد', icon: <Star className="h-6 w-6" />, description: 'أول مشاركة في المنتدى' },
    { id: 'b2', name: 'كاتب قصة', icon: <PenSquare className="h-6 w-6" />, description: 'شاركت قصة نجاح ملهمة' },
    { id: 'b3', name: 'عضو فعال', icon: <MessageSquare className="h-6 w-6" />, description: 'تفاعلت في 10 نقاشات' },
  ],
};

const titles = [
    { name: 'مستكشف', points: 500 },
    { name: 'باحث عن الحقيقة', points: 1000 },
    { name: 'صاحب بصيرة', points: 2500 },
    { name: 'منارة يقين', points: 5000 },
];

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl text-center py-20">
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
  
  const currentTitleInfo = titles.find(t => t.name === userProfile.currentTitle);
  const nextTitleInfo = titles.find(t => t.points > userProfile.points);
  const progressToNextTitle = nextTitleInfo && currentTitleInfo ?
    ((userProfile.points - currentTitleInfo.points) / (nextTitleInfo.points - currentTitleInfo.points)) * 100
    : 100;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
          <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
          <AvatarFallback className="text-4xl">
            {user.displayName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-right">
          <h1 className="font-headline text-4xl font-bold">{user.displayName}</h1>
          <p className="text-xl text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            {userProfile.currentTitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Card */}
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
                        `${nextTitleInfo.points - userProfile.points} نقطة متبقية للوصول إلى لقب "${nextTitleInfo.name}"` :
                        "لقد وصلت إلى أعلى لقب!"}
                    </p>
                    <p className="font-bold text-lg text-foreground">{userProfile.points} نقطة مكتسبة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
           {/* Badges Card */}
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
                    {userProfile.badges.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            <TooltipProvider>
                                {userProfile.badges.map(badge => (
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

        {/* Sidebar with Stats */}
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
                        <span className="font-bold">1</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">المشاركات في المنتدى</span>
                        <span className="font-bold">12</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">مشاركات صوتية</span>
                        <span className="font-bold">0</span>
                    </div>
                 </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}

    