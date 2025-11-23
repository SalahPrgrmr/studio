import BenefitsSection from '@/components/sections/benefits-section';
import DefinitionSection from '@/components/sections/definition-section';
import HeroSection from '@/components/sections/hero-section';
import PersonalPathForm from '@/components/sections/personal-path-form';
import FaqSection from '@/components/sections/faq-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <HeroSection />
      <main
        id="main-content"
        className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="space-y-16 sm:space-y-24">
          <DefinitionSection />
          <Separator className="my-8" />
          <BenefitsSection />
          <Separator className="my-8" />
          <PersonalPathForm />
           <Separator className="my-8" />
          <FaqSection />
        </div>
      </main>
    </div>
  );
}
