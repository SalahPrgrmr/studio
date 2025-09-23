import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smile, ShieldCheck, Leaf } from 'lucide-react';

const benefits = [
  {
    icon: <Smile className="h-10 w-10 text-primary" />,
    title: "زيادة السعادة",
    description: "يعزز اليقين شعوراً بالسلام والرضا، مما يقلل من القلق ويسمح بمزيد من البهجة في الحياة اليومية."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "تعزيز الأمان",
    description: "بفهم راسخ لمسارك، يمكنك مواجهة تحديات الحياة بثقة وشعور قوي بالاستقرار."
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: "الرفاهية الشاملة",
    description: "يساهم وجود هدف واتجاه واضحين في تحسين الصحة العقلية والعاطفية والروحية، مما يؤدي إلى حياة أكثر ازدهارًا."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="w-full">
      <div className="text-center space-y-4 mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          ثمار اليقين
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          يمكن أن يفتح تبني اليقين فوائد عميقة لحياتك ورفاهيتك.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="text-center p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader className="items-center p-2">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                {benefit.icon}
              </div>
              <CardTitle className="font-headline text-2xl">{benefit.title}</CardTitle>
            </CardHeader>
            <CardDescription className="text-base">
              {benefit.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
