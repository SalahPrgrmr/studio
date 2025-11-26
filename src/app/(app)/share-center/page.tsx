'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categorizedContent = [
  {
    category: "للمسلمين",
    value: "muslims",
    posts: [
      {
        title: "من الإيمان إلى اليقين",
        content: `هل إيمانك مجرد عادة، أم قناعة راسخة تهز الجبال؟ انتقل من مرحلة التصديق إلى مرحلة اليقين الذي لا يتزعزع.
عمّق إيمانك اليوم: [ضع رابط المنصة هنا]`,
        hashtags: ['#زيادة_الإيمان', '#حق_اليقين', '#الثبات'],
      },
      {
        title: "مسؤوليتك كمسلم",
        content: `"كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ". هل قمت بدورك في تبليغ رسالة التوحيد؟ لا تكن ممن يعلمون ويكتمون.
انضم لجنود اليقين: [ضع رابط المنصة هنا]`,
        hashtags: ['#الدعوة', '#تبليغ_الرسالة', '#كن_داعيا'],
      },
      {
        title: "جدد نيتك، يتجدد عالمك",
        content: `أعظم عمل يمكن أن تفعله هو أن تخلص نيتك لله في كل شيء. العمل الصغير بالنية الصادقة يفوق الجبال من الأعمال بغيرها.
تعلم قوة النية: [ضع رابط المنصة هنا]`,
        hashtags: ['#الإخلاص', '#النية', '#أساس_العمل'],
      },
       {
        title: "هل أنت مستعد؟",
        content: `الموت يأتي بغتة. السؤال ليس متى، بل هل أنت مستعد للقاء الله؟
"عين اليقين" تساعدك على الاستعداد لأهم رحلة.
[ضع رابط المنصة هنا]`,
        hashtags: ['#الاستعداد_للموت', '#التوبة', '#حسن_الخاتمة'],
      },
      {
        title: "سخر نعمتك",
        content: `مالك، علمك، وقتك، منصبك.. كلها نعم ستُسأل عنها. هل سخرتها في سبيل الله؟
"عين اليقين" تدلك على طرق عملية لتسخير نعمك.
[ضع رابط المنصة هنا]`,
        hashtags: ['#تسخير_النعم', '#شكر_النعمة', '#العطاء'],
      },
       {
        title: "لا تنتظر المهدي، كن جنديًا في جيشه",
        content: `التمهيد للمهدي لا يكون بالانتظار، بل بالعمل. ابدأ بإصلاح نفسك، ثم تحرك لإصلاح العالم بالدعوة إلى الحق.
اعرف كيف تكون من الممهدين: [ضع رابط المنصة هنا]`,
        hashtags: ['#المهدي', '#سبيل_المهدي', '#التمهيد'],
      },
    ]
  },
  {
    category: "لأهل الكتاب",
    value: "people-of-book",
    posts: [
      {
        title: "دعوة لأهل الكتاب",
        content: `"قُلْ يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَىٰ كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ".
دعونا نرجع إلى الأصل المشترك: عبادة إله واحد لا شريك له.
[ضع رابط المنصة هنا]`,
        hashtags: ['#أهل_الكتاب', '#كلمة_سواء', '#التوحيد'],
      },
      {
        title: "الجذور المشتركة للإيمان",
        content: `كل الرسالات السماوية جاءت بالتوحيد. دعونا نستكشف هذا الأساس المشترك الذي يجمعنا على عبادة رب إبراهيم وموسى وعيسى ومحمد.
[ضع رابط المنصة هنا]`,
        hashtags: ['#حوار_الأديان', '#التوحيد_أولا', '#إله_واحد'],
      },
       {
        title: "من هو عيسى في الإسلام؟",
        content: `نحن نؤمن بعيسى عليه السلام نبيًا ورسولاً وكلمة من الله، ونبرئ أمه الصديقة مريم. الإسلام جاء مصدقًا لما بين يديه من الحق.
تعرف على مكانة عيسى في القرآن: [ضع رابط المنصة هنا]`,
        hashtags: ['#عيسى_ابن_مريم', '#نبي_الله', '#حوار_بناء'],
      },
    ]
  },
  {
    category: "للملحدين والباحثين",
    value: "atheists-seekers",
    posts: [
      {
        title: "رسالة إلى عقلك",
        content: `لا تقبل إيمانًا لا يقنع عقلك. الإسلام يدعوك إلى البرهان والدليل. "قل هاتوا برهانكم إن كنتم صادقين".
ابدأ رحلتك العقلانية نحو اليقين: [ضع رابط المنصة هنا]`,
        hashtags: ['#العقل', '#البرهان', '#فكر'],
      },
      {
        title: "هل جاء الكون بالصدفة؟",
        content: `من دقة الحمض النووي إلى اتساع المجرات، هل يمكن أن يكون كل هذا النظام نتيجة فوضى عشوائية؟ العقل يدلك على الصانع.
تفكر بالأدلة المنطقية: [ضع رابط المنصة هنا]`,
        hashtags: ['#التصميم_الذكي', '#العلم_والإيمان', '#برهان_النظم'],
      },
      {
        title: "ما وراء الفيزياء",
        content: `العلم يصف "كيف"، لكنه يعجز عن "لماذا". من أين أتت قوانين الفيزياء؟ ما هو مصدر الوعي؟
استكشف الأسئلة التي تتجاوز حدود العلم المادي: [ضع رابط المنصة هنا]`,
        hashtags: ['#ماوراء_الطبيعة', '#الوعي', '#أسئلة_كبرى'],
      },
      {
        title: "سؤال واحد قد يغير حياتك",
        content: `ما هو الشيء الذي لو عرفته اليوم، لتغيرت نظرتك لكل شيء؟ الجواب قد يكون أقرب مما تتصور.
اكتشف بنفسك على منصة عين اليقين: [ضع رابط المنصة هنا]`,
        hashtags: ['#سؤال_وجودي', '#تغيير', '#الحقيقة'],
      },
    ]
  },
  {
    category: "للمشركين",
    value: "polytheists",
    posts: [
      {
        title: "إعلان البراءة من الشرك",
        content: `الله ربي لا أشرك به شيئًا، ولا أشرك به أحدًا.
هذا هو إعلان الحرية الحقيقي. التحرر من عبودية كل شيء سوى الخالق الواحد.
[ضع رابط المنصة هنا]`,
        hashtags: ['#نبذ_الشرك', '#الحرية_الحقيقية', '#الله_ربي'],
      },
      {
        title: "هل تدعو من هو أضعف منك؟",
        content: `كل ما يُعبد من دون الله هو مخلوق مثلك، لا يملك لنفسه نفعًا ولا ضرًا. فلماذا تلجأ إلى ضعيف وتترك القوي العزيز؟
وجه قلبك للخالق مباشرة: [ضع رابط المنصة هنا]`,
        hashtags: ['#التوحيد_الخالص', '#لا_وسطاء', '#الله_فقط'],
      },
      {
        title: "الفطرة تدلك على الخالق الواحد",
        content: `في أعماق كل إنسان صوت ينادي بأن لهذا الكون إلهًا واحدًا. استمع لصوت فطرتك.
عد إلى الأصل: [ضع رابط المنصة هنا]`,
        hashtags: ['#الفطرة', '#التوحيد', '#رب_واحد'],
      },
    ]
  },
  {
    category: "للكافرين",
    value: "disbelievers",
    posts: [
       {
        title: "الإنذار الأخير",
        content: `الزلازل، الفيضانات، الأوبئة. هل هي مجرد ظواهر طبيعية أم رسائل من خالق الكون؟ "وَمَا نُرْسِلُ بِالْآيَاتِ إِلَّا تَخْوِيفًا".
تفكر في الإنذار قبل فوات الأوان: [ضع رابط المنصة هنا]`,
        hashtags: ['#الإنذار', '#آيات_الله', '#ارجعوا_إلى_الله'],
      },
      {
        title: "الهروب إلى أين؟",
        content: `كل شيء في هذا الكون فانٍ، "وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ".
إلى أين المفر إلا إليه؟
[ضع رابط المنصة هنا]`,
        hashtags: ['#الموت', '#الحياة_الآخرة', '#إلى_الله'],
      },
      {
        title: "رسالة دعوة عامة",
        content: `اكتشف رحلة نحو وضوح الفكر وسكينة الروح.
ادخل إلى "عين اليقين"، منصة عالمية محايدة وغير ربحية، مصممة لمساعدتك في العثور على إجابات لأسئلتك الكبرى.
ابدأ رحلتك هنا: [ضع رابط المنصة هنا]`,
        hashtags: ['#عين_اليقين', '#رحلة_اليقين', '#توحيد'],
      },
      {
        title: "لماذا أنت هنا؟",
        content: `هل سألت نفسك عن الغاية من وجودك؟ هل خُلقت عبثًا؟ هناك إجابة تنتظرك.
ابحث عن هدف حياتك: [ضع رابط المنصة هنا]`,
        hashtags: ['#الغاية_من_الخلق', '#لماذا_نحن_هنا', '#معنى_الحياة'],
      },
    ]
  },
];


const ShareableCard = ({ title, content, hashtags, index }: { title: string, content: string, hashtags: string[], index: number }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const fullText = `${content}\n\n${hashtags.join(' ')}`;

  const copyToClipboard = () => {
    const siteUrl = window.location.origin;
    const finalText = fullText.replace(/\[ضع رابط المنصة هنا\]/g, siteUrl);

    navigator.clipboard.writeText(finalText).then(() => {
      toast({
        title: 'تم النسخ بنجاح!',
        description: 'يمكنك الآن لصق الرسالة في أي مكان.',
      });
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
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
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base">
          {content}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Hash className="h-4 w-4 text-muted-foreground" />
          {hashtags.map(tag => (
            <span key={tag} className="text-sm text-primary font-medium">{tag}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={copyToClipboard}>
          {isCopied ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
          {isCopied ? 'تم النسخ' : 'نسخ النص'}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function ShareCenterPage() {
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <Share2 className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          مركز الدعوة الرقمية
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          كن من المنذرين والمبلغين. انسخ هذه الرسائل وانشرها في كل مكان لحشد الزوار ومشاركة النور مع الآخرين.
        </p>
      </div>

      <Tabs defaultValue="muslims" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
          {categorizedContent.map(category => (
            <TabsTrigger key={category.value} value={category.value} className="py-2">{category.category}</TabsTrigger>
          ))}
        </TabsList>
        
        {categorizedContent.map(category => (
            <TabsContent key={category.value} value={category.value}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {category.posts.map((item, index) => (
                    <ShareableCard key={index} {...item} index={index} />
                ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
