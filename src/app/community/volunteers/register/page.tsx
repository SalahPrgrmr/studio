'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Send, ArrowLeft, UserPlus } from 'lucide-react';
import { useFirebase, setDocumentNonBlocking, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { volunteerSchema, type Volunteer, type VolunteerFormValues } from '@/lib/types';
import { useUser } from '@/firebase';

const skillOptions = [
    { id: 'content_creation', label: 'صناعة المحتوى (كتابة، تصميم)' },
    { id: 'media_production', label: 'إنتاج الميديا (مونتاج، صوت)' },
    { id: 'marketing', label: 'التسويق والعلاقات العامة' },
    { id: 'community_management', label: 'إدارة المجتمعات' },
    { id: 'translation', label: 'الترجمة' },
    { id: 'tech_development', label: 'التطوير التقني والبرمجة' },
    { id: 'public_speaking', label: 'الخطابة والدعوة المباشرة' },
    { id: 'project_management', label: 'إدارة المشاريع' },
];

const interestOptions = [
    { id: 'dawah', label: 'التبليغ والإنذار' },
    { id: 'education', label: 'التعليم والتأصيل الشرعي' },
    { id: 'community', label: 'بناء المجتمع والتواصل' },
    { id: 'media', label: 'الإنتاج الإعلامي' },
    { id: 'tech', label: 'المساهمة التقنية' },
];

export default function VolunteerRegistrationPage() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const volunteerRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'volunteers', user.uid) : null),
    [firestore, user]
  );
  const { data: existingVolunteer, isLoading: isDocLoading } = useDoc<Volunteer>(volunteerRef);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      country: '',
      skills: [],
      interests: [],
      notes: '',
    },
  });
  
  useEffect(() => {
    if (user && !isUserLoading) {
      form.setValue('email', user.email || '');
      if (user.displayName) {
        const nameParts = user.displayName.split(' ');
        form.setValue('firstName', nameParts[0] || '');
        form.setValue('lastName', nameParts.slice(1).join(' ') || '');
      }
    }
    if (existingVolunteer) {
        form.reset(existingVolunteer);
    }
  }, [user, isUserLoading, existingVolunteer, form]);


  async function onSubmit(values: VolunteerFormValues) {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'غير مصرح به', description: 'يجب عليك تسجيل الدخول للتطوع.' });
      return;
    }
    setIsSubmitting(true);

    setDocumentNonBlocking(volunteerRef!, { ...values, id: user.uid }, { merge: true });

    toast({
      title: 'تم تحديث بياناتك!',
      description: 'شكرًا لك على تسجيلك كمتطوع. سنقوم بمراجعة بياناتك وتوظيفها في المكان المناسب.',
    });
    
    // Non-blocking, so we can navigate away immediately.
    router.push('/community/volunteers');
  }

  if (isUserLoading || isDocLoading) {
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
            <CardDescription>للتسجيل كمتطوع، يرجى تسجيل الدخول أولاً.</CardDescription>
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

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/community/volunteers" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            العودة إلى صفحة المتطوعين
          </Link>
        </Button>
      </div>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-3xl">
                <UserPlus className="h-8 w-8 text-primary" />
                نموذج تسجيل المتطوعين
              </CardTitle>
              <CardDescription>
                املأ النموذج للانضمام إلى فريقنا. سيتم استخدام هذه المعلومات لتوجيهك للمهام التي تناسب مهاراتك واهتماماتك.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأول</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأخير</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField name="phoneNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف (اختياري)</FormLabel>
                    <FormControl><Input type="tel" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
                <FormField name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدولة</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              
                <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ما هو مدى توفرك للمساهمة؟</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="اختر مدى توفرك" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="few_hours_week">ساعات قليلة أسبوعيًا</SelectItem>
                        <SelectItem value="part_time">دوام جزئي</SelectItem>
                        <SelectItem value="full_time">دوام كامل</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel>ما هي المهارات التي يمكنك المساهمة بها؟</FormLabel>
                     <FormDescription>اختر كل ما ينطبق.</FormDescription>
                    {skillOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <FormLabel>ما هي مجالات العمل التي تهمك أكثر؟</FormLabel>
                     <FormDescription>اختر كل ما ينطبق.</FormDescription>
                    {interestOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات إضافية</FormLabel>
                  <FormControl>
                    <Textarea placeholder="هل هناك أي شيء آخر تود إخبارنا به؟" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting || !form.formState.isDirty} size="lg">
                {isSubmitting ? (
                  <><Loader2 className="ml-2 h-5 w-5 animate-spin" /> جاري الحفظ...</>
                ) : (
                  <><Send className="ml-2 h-5 w-5" /> {existingVolunteer ? 'تحديث بياناتي' : 'إرسال التسجيل'}</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
