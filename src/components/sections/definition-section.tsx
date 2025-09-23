import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const definitions = [
  {
    term: "What is Certainty?",
    definition: "Certainty is the state of being completely confident or sure of something. It is a firm conviction that something is the case, or a belief that is free from doubt. In a personal context, it often relates to a deep sense of purpose, security, and understanding of one's place in the world."
  },
  {
    term: "Why is Certainty Important?",
    definition: "Certainty provides a foundation for happiness, security, and prosperity. It reduces anxiety and stress by eliminating the unknown, allowing individuals to make decisions with confidence. Across different cultures and beliefs, the pursuit of certainty is linked to a more fulfilled and meaningful life."
  },
  {
    term: "How Can One Find Certainty?",
    definition: "The path to certainty is a personal journey of self-discovery, reflection, and learning. It involves understanding your beliefs, exploring your background, and aligning your actions with your aspirations. This platform is designed to guide you through that process."
  }
];

export default function DefinitionSection() {
  return (
    <section id="definitions" className="w-full">
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Understanding Certainty
          </h2>
          <p className="text-muted-foreground text-lg">
            Clear, unbiased definitions and explanations on the significance of certainty in life.
          </p>
        </div>
        <div className="md:col-span-3">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {definitions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg mb-2 px-4 shadow-sm">
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
