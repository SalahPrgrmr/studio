import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpenText } from 'lucide-react';

const definitions = [
  {
    term: "ما هو اليقين؟",
    definition: "اليقين هو حالة من الثقة الكاملة أو القناعة بشيء ما. إنه إيمان راسخ خالٍ من الشك. في السياق الشخصي، غالبًا ما يتعلق الأمر بوجود شعور عميق بالهدف والأمان وفهم مكانة المرء في العالم."
  },
  {
    term: "لماذا اليقين مهم؟",
    definition: "يوفر اليقين أساسًا للسعادة والأمان والرفاهية. فهو يقلل من القلق والتوتر عن طريق إزالة المجهول، مما يسمح للأفراد باتخاذ القرارات بثقة. عبر الثقافات والمعتقدات، يرتبط السعي إلى اليقين بحياة أكثر إشباعًا وذات مغزى."
  },
  {
    term: "كيف يمكن للمرء أن يجد اليقين؟",
    definition: "الطريق إلى اليقين هو رحلة شخصية تبدأ باستكشاف 'خارطة طريق رحلة اليقين'. تتضمن هذه الرحلة استخدام أدوات مثل 'مسارك الشخصي' المدعوم بالذكاء الاصطناعي، والمشاركة في 'الأنشطة العملية'، والتواصل مع 'المجتمع' لتحويل المعرفة إلى عمل."
  }
];

export default function DefinitionSection() {
  return (
    <section id="definitions" className="w-full">
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
             <BookOpenText className="h-8 w-8" /> فهم اليقين
          </h2>
          <p className="text-muted-foreground text-lg">
            تعريفات وتوضيحات واضحة ومحايدة حول أهمية اليقين في الحياة.
          </p>
        </div>
        <div className="md:col-span-3">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {definitions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg mb-2 px-4 shadow-sm hover:bg-muted/50 transition-colors">
                <AccordionTrigger className="font-headline text-lg hover:no-underline text-right">
                  {item.term}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {item.definition}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
