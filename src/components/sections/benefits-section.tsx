import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smile, ShieldCheck, Leaf } from 'lucide-react';

const benefits = [
  {
    icon: <Smile className="h-10 w-10 text-primary" />,
    title: "Increased Happiness",
    description: "Certainty fosters a sense of peace and contentment, reducing anxiety and allowing for greater joy in daily life."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Enhanced Security",
    description: "With a firm understanding of your path, you can navigate life's challenges with confidence and a strong sense of stability."
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: "Overall Well-being",
    description: "A clear purpose and direction contribute to improved mental, emotional, and spiritual health, leading to a more prosperous life."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="w-full">
      <div className="text-center space-y-4 mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          The Fruits of Certainty
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Embracing certainty can unlock profound benefits for your life and well-being.
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
