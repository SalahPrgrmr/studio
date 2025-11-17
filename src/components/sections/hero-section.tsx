'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToMain = () => {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 bg-card border-b">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Begin Your Journey to <span className="text-primary">Certainty</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Discover a personal journey toward clarity, security, and well-being. Our platform offers guidance, insights, and a supportive community to help you find the answers you seek.
          </p>
          <div className="flex justify-center">
            <Button size="lg" onClick={scrollToMain}>
              Start Your Journey
              <ArrowDown className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
