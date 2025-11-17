'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, Mail, Phone, Bot } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
  subject: z.string().min(5, { message: 'الموضوع يجب أن يكون 5 أحرف على الأقل.' }),
  message: z.string().min(20, { message: 'الرسالة يجب أن تكون 20 حرفًا على الأقل.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: 'تم إرسال رسالتك!',
      description: 'شكرًا لتواصلك معنا. سنقوم بالرد في أقرب وقت ممكن.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          تواصل معنا
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          نحن هنا للاستماع إليك. سواء كان لديك سؤال، اقتراح، أو ترغب في التعاون، لا تتردد في التواصل.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">أرسل رسالتك</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl><Input placeholder="اسمك..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl><Input type="email" placeholder="example@domain.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel>الموضوع</FormLabel>
                      <FormControl><Input placeholder="موضوع رسالتك..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرسالة</FormLabel>
                      <FormControl><Textarea placeholder="اكتب رسالتك هنا بالتفصيل..." rows={6} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} size="lg">
                    {isSubmitting ? (
                      <><Loader2 className="ml-2 h-5 w-5 animate-spin" /> جاري الإرسال...</>
                    ) : (
                      <><Send className="ml-2 h-5 w-5" /> إرسال الرسالة</>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="space-y-8">
            <Card className="shadow-sm bg-muted/50">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">معلومات التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 mt-1 text-primary"/>
                        <div>
                            <h4 className="font-semibold text-foreground">البريد الإلكتروني</h4>
                            <a href="mailto:info@ain-al-yaqin.com" className="hover:text-primary">info@ain-al-yaqin.com</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 mt-1 text-primary"/>
                         <div>
                            <h4 className="font-semibold text-foreground">الهاتف (قريبًا)</h4>
                            <p>+1 (000) 000-0000</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="shadow-sm bg-muted/50">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">هل لديك سؤال سريع؟</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                       قد تجد إجابتك بشكل أسرع عبر استخدام مرشد اليقين الذكي.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/#chat-assistant">
                            <Bot className="ml-2 h-5 w-5"/>
                            اسأل مرشد اليقين
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}