'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const shareableContent = [
  {
    title: 'رسالة دعوة عامة',
    content: `اكتشف رحلة نحو وضوح الفكر وسكينة الروح. 
ادخل إلى "عين اليقين"، منصة عالمية محايدة وغير ربحية، مصممة لمساعدتك في العثور على إجابات لأسئلتك الكبرى.
ابدأ رحلتك هنا: [ضع رابط المنصة هنا]`,
    hashtags: ['#عين_اليقين', '#رحلة_اليقين', '#توحيد'],
  },
  {
    title: 'دعوة للتفكر في الخلق',
    content: `هل تأملت يومًا في دقة هذا الكون؟ 
من أصغر ذرة إلى أكبر مجرة، كل شيء يسبح بحمد خالقه. 
ادعوك لزيارة منصة "عين اليقين" والتفكر في آيات الله التي تحيط بنا.
[ضع رابط المنصة هنا]`,
    hashtags: ['#تفكر', '#آيات_كونية', '#عظمة_الخالق'],
  },
  {
    title: 'رسالة للباحث عن الحقيقة',
    content: `إذا كنت تبحث عن إجابات منطقية وعقلانية لأسئلة الحياة الكبرى، فهذا المكان لك.
"عين اليقين" تقدم لك الأدوات اللازمة لبناء قناعات راسخة على أساس من العلم والبرهان، وليس التقليد.
ابدأ بحثك عن الحقيقة: [ضع رابط المنصة هنا]`,
    hashtags: ['#الباحث_عن_الحقيقة', '#المنطق', '#الإيمان_عن_قناعة'],
  },
    {
    title: 'رسالة للمحتاج والمضطر',
    content: `هل تشعر بالضيق أو القلق؟ هل تضيق بك السبل؟
تذكر أن الله يقول: "أَمَّن يُجِيبُ الْمُضْطَرَّ إِذَا دَعَاهُ وَيَكْشِفُ السُّوءَ".
ادخل إلى "عين اليقين" لتجد طريقك المباشر إلى الله في أوقات الشدة.
[ضع رابط المنصة هنا]`,
    hashtags: ['#الدعاء', '#الفرج_قريب', '#لا_تقنطوا_من_رحمة_الله'],
  }
];

export default function ShareCenterPage() {
  const { toast } = useToast();
  const [copiedStates, setCopiedStates] = useState<{[key: number]: boolean}>({});

  const copyToClipboard = (text: string, index: number) => {
    // Replace placeholder with actual URL
    const siteUrl = window.location.origin;
    const finalText = text.replace(/\[ضع رابط المنصة هنا\]/g, siteUrl);

    navigator.clipboard.writeText(finalText).then(() => {
      toast({
        title: 'تم النسخ بنجاح!',
        description: 'يمكنك الآن لصق الرسالة في أي مكان.',
      });
      setCopiedStates(prev => ({...prev, [index]: true}));
      setTimeout(() => {
        setCopiedStates(prev => ({...prev, [index]: false}));
      }, 2000);
    }, (err) => {
      toast({
        variant: 'destructive',
        title: 'فشل النسخ',
        description: 'لم نتمكن من نسخ النص. يرجى المحاولة يدويًا.',
      });
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Share2 className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مركز الدعوة الرقمية
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          كن من المنذرين والمبلغين. انسخ هذه الرسائل وانشرها في كل مكان لحشد الزوار ومشاركة النور مع الآخرين.
        </p>
      </div>

      <div className="space-y-8">
        {shareableContent.map((item, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base">
                {item.content}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  {item.hashtags.map(tag => (
                      <span key={tag} className="text-sm text-primary font-medium">{tag}</span>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => copyToClipboard(item.content, index)}>
                {copiedStates[index] ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
                {copiedStates[index] ? 'تم النسخ' : 'نسخ النص'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
