import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpenText } from 'lucide-react';

const definitions = [
  {
    term: "What is Certainty?",
    definition: "Certainty is a state of complete confidence or conviction about something. It is a firm belief that is free from doubt. In a personal context, it often relates to having a deep sense of purpose, security, and understanding of one's place in the world."
  },
  {
    term: "Why is Certainty Important?",
    definition: "Certainty provides a foundation for happiness, security, and well-being. It reduces anxiety and stress by removing the unknown, allowing individuals to make decisions with confidence. Across cultures and beliefs, the pursuit of certainty is linked to a more fulfilling and meaningful life."
  },
  {
    term: "How Can One Find Certainty?",
    definition: "The path to certainty is a personal journey that begins with exploring the 'Journey of Certainty Roadmap'. This journey involves using tools like the AI-powered 'Your Personal Path', engaging in 'Practical Activities', and connecting with the 'Community' to turn knowledge into action."
  }
];

export default function DefinitionSection() {
  return (
    <section id="definitions" className="w-full">
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
             <BookOpenText className="h-8 w-8" /> Understanding Certainty
          </h2>
          <p className="text-muted-foreground text-lg">
            Clear and neutral definitions and clarifications on the importance of certainty in life.
          </p>
        </div>
        <div className="md:col-span-3">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {definitions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg mb-2 px-4 shadow-sm hover:bg-muted/50 transition-colors">
                <AccordionTrigger className="font-headline text-lg hover:no-underline">
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
