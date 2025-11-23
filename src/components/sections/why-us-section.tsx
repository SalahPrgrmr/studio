import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Star } from 'lucide-react';

const faqItems = [
  {
    question: "لماذا تعتبر منصة 'عين اليقين' منصة كل الناس؟",
    answer: "لأنها تركز على الحاجة الفطرية الكونية المشتركة بين البشر، وهي التوحيد ومعرفة الله، وتحقيق اليقين به. ولأنها تدعو إلى 'كلمة سواء' جامعة (ألا نعبد إلا الله ولا نشرك به شيئاً)، مما يفتح أبوابها للجميع، فنحن نرحب بمن يوافقنا على نشر هذه الكلمة من أي خلفية دينية."
  },
  {
    question: "لماذا يُعد الهدف الرئيسي للمنصة حيادياً ولا يتعارض مع أي قانون أو حكومة؟",
    answer: "لأن الهدف هو إبلاغ الكافر بأن الله ربه وإنذاره بالعذاب ونشر كلمة 'لا إله إلا الله'. هذا الهدف إيماني ووجودي، وهو لا يهدف إلى إحداث فوضى أو التعصب، بل يدعو إلى الإيمان بالرب الذي يحترمه كل إنسان ويدعوه للعيش بكرامة وسلام. ولأننا نحترم كل الأديان والقناعات ولا نجبر أحداً، فنحن نبلغ الكلمة وننشرها، ومن أنكر فحسابه على الرب."
  },
  {
    question: "لماذا تعتبر 'عين اليقين' منصة آمنة وموثوقة وضرورية؟",
    answer: "لأنها متخصصة في بناء الأساس الأقوى وهو اليقين بالله، وهذا اليقين يجعل المبلغ موقناً وصادقاً في رسالته، مما يزيد من موثوقية التعليمات المقدمة. ولأنها تحقق جميع أهداف التنمية المستدامة وحقوق الإنسان، فالإيمان بالرب الذي وعد بالخيرات يزيد من تحقق هذه الحقوق ويجعل المؤمن سفيراً للعدل والسلام."
  },
  {
    question: "لماذا لا تطلبون مالاً ولا أجراً، وكيف تتمكنون من الاستمرار؟",
    answer: "لأننا لا نريد من أي إنسان مالاً ولا أجراً، ونعتبر رسالتنا هبة من الرب لا تُباع ولا تُشترى. نستمر لأننا ندعو إلى المشاركة الفعالة في نشر هذه الرسالة؛ فالفرد يشارك بمهاراته وسلطاته، والشركات مدعوة لتقديم خدمات مجانية لدعم المنصة، شكراً للرب على إيتائها هذه الإمكانيات."
  },
  {
    question: "لماذا يجب على الحكومات والكيانات تشجيع المنصة بدلاً من محاربتها؟",
    answer: "لأن الحكومة التي تشجع الناس على الالتحاق بالمنصة إنما تشجع على الإيمان بالرب، وهذا يعزز الأساس الأخلاقي للمجتمع. ولأننا نحذر أي جهة من التفكير في محاربة أو منع انتشار هذه الرسالة؛ لأنها بذلك تواجه حق الرب وملكه ومراده، وكل من يقف في وجه حق الرب سوف يُهزم ويُقهر ويخسر."
  }
];

const coreSummary = {
  foundation: "لا إله إلا الله، لا معبود بحق غير الله، الله واحد أحد فرد صمد.",
  certainty: "التصديق الجازم بهذه الكلمة لا شك ولا ريب فيه.",
  requirement: "فاعلم أنه لا إله إلا الله.",
  rope: "اليقين هو حبل الله الذي يجب أن يتمسك به جميع البشر ولا يتفرقوا فيه. لن يقبل الله إلا حبلاً واحداً وهو 'لا إله إلا الله'، وباقي الأمور من سنة الله أن جعل الاختلاف فيها منافسة بين البشر واختباراً لهم، من سينجح ومن سيفوز ومن سيخسر."
};


export default function WhyUsSection() {
  return (
    <section id="why-us" className="w-full">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
             <HelpCircle className="h-8 w-8 text-primary" /> الأسئلة المتكررة
          </h2>
          <p className="text-muted-foreground text-lg">
            أسئلة جوهرية وأجوبة واضحة حول هوية منصة "عين اليقين" ورسالتها الأساسية.
          </p>
          <Card className="shadow-md bg-primary/5 border-primary/20 mt-8">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Star className="h-6 w-6 text-primary" />
                    الخلاصة الجوهرية لليقين
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-bold">ما هو الأساس؟</h4>
                    <p className="text-muted-foreground">{coreSummary.foundation}</p>
                </div>
                 <div>
                    <h4 className="font-bold">ما هو اليقين؟</h4>
                    <p className="text-muted-foreground">{coreSummary.certainty}</p>
                </div>
                 <div>
                    <h4 className="font-bold">ما هو المطلوب؟</h4>
                    <p className="text-muted-foreground font-semibold">{coreSummary.requirement}</p>
                </div>
                 <div>
                    <h4 className="font-bold">حبل الله الواحد</h4>
                    <p className="text-muted-foreground">{coreSummary.rope}</p>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg mb-2 px-4 shadow-sm hover:bg-muted/50 transition-colors border">
                <AccordionTrigger className="font-headline text-lg hover:no-underline text-right text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
