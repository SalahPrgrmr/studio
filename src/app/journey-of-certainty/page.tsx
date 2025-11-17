import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Telescope, Heart, CheckCircle, TrendingUp, Search, BookOpen, UserCheck, Anchor, UserPlus, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CertaintyChart from '@/components/sections/certainty-chart';

const journeySteps = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Step 1: Knowledge and Learning',
    description: 'Every journey begins with knowledge. The first divine command is "Know." This is the stage of building a solid foundation by learning about God, His oneness, and the truth of His words.',
    link: '/god-certainty',
    linkLabel: 'Start with Knowledge'
  },
  {
    icon: <Telescope className="h-10 w-10 text-primary" />,
    title: 'Step 2: Belief through Contemplation',
    description: 'Contemplating the signs of the universe, from the "Clarion Call" to "Blessings and Signs," transforms theoretical knowledge into an initial heartfelt belief in the Great Creator.',
    link: '/blessings-and-signs',
    linkLabel: 'Contemplate the Signs'
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'Step 3: Faith and Action',
    description: 'Faith grows with good deeds. Be inspired by "Success Stories," join the "Community," and apply "Practical Activities" to turn your faith into a tangible reality.',
    link: '/stories',
    linkLabel: 'Get Inspired & Apply'
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: 'Step 4: Reaching Certainty',
    description: 'When knowledge, belief, and action come together, the heart reaches the stage of certainty. Use "Your Personal Path" and "Self-Guidance" to solidify this feeling.',
    link: '/self-guidance',
    linkLabel: 'Strengthen Your Certainty'
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Step 5: Continuous Feedback',
    description: 'Certainty increases and decreases. Maintain a high level of certainty by constantly reviewing these steps, contemplating, and performing good deeds to keep the flame of faith alive.',
    link: '/journey-of-certainty',
    linkLabel: 'Review Your Journey'
  },
];

const specializedPaths = [
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: 'Journey for Non-Believers',
        description: 'A path based on rational, logical, and cosmic evidence to explore the great questions and build certainty from scratch.',
        link: '/journey-of-certainty/for-non-believers'
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: 'Journey for People of the Book',
        description: 'A constructive dialogue to explore common ground and the roots of certainty in God through the sacred texts.',
        link: '/journey-of-certainty/for-people-of-the-book'
    },
    {
        icon: <UserCheck className="h-8 w-8 text-primary" />,
        title: 'Journey for Believers',
        description: 'A path to deepen certainty, move from intellectual to experiential conviction, and face modern doubts with confidence.',
        link: '/journey-of-certainty/for-believers'
    },
    {
        icon: <Anchor className="h-8 w-8 text-primary" />,
        title: 'Journey for the Needy & Distressed',
        description: 'A direct and rapid path to connect with God and attain certainty through prayer and humility in times of hardship.',
        link: '/journey-of-certainty/for-the-needy'
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: 'Specialized Contribution Method',
        description: 'A path for skilled individuals who want to use their abilities to support and advance the message of certainty through practical activities.',
        link: '/practical-activities'
    }
];

export default function JourneyOfCertaintyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Map className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          The Journey of Certainty Roadmap
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Certainty is not a destination, but a continuous and sustainable journey to charge the heart, because it increases and decreases. This journey only ends with death, and it is the fuel for happiness and tranquility in this life, and success in the hereafter. "Through patience and certainty, leadership in faith is attained," and this is the strategic goal of the platform.
        </p>
      </div>

      <div className="relative">
        {/* The connecting line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>

        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center md:gap-12">
              {/* Icon and Connector for alternating sides */}
              <div className={`flex-shrink-0 w-full md:w-1/2 flex items-center justify-center md:justify-start ${index % 2 === 1 ? 'md:justify-end md:order-3' : ''}`}>
                 <div className="relative w-full max-w-sm">
                    <div className="p-5 bg-primary/10 rounded-full inline-block mb-4 shadow-sm">
                        {step.icon}
                    </div>
                 </div>
              </div>

              {/* Card Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 w-full">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>
                    <Button asChild variant="outline">
                      <Link href={step.link}>{step.linkLabel}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
          <div className="text-center mb-12">
              <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Custom Paths for Your Journey</h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Everyone starts from a different point. Choose the path that suits you now.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specializedPaths.map((path) => (
                  <Link href={path.link} key={path.title} className="block group">
                      <Card className="h-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                          <CardHeader className="flex-row items-start gap-4">
                              <div className="p-3 bg-primary/10 rounded-full">{path.icon}</div>
                              <div className="flex-1">
                                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{path.title}</CardTitle>
                              </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                              <p className="text-muted-foreground">
                                  {path.description}
                              </p>
                          </CardContent>
                      </Card>
                  </Link>
              ))}
          </div>
      </div>
      
      <Card className="mt-20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline text-3xl">
            <TrendingUp className="h-8 w-8 text-primary" />
            Growth of Certainty and its Benefits
          </CardTitle>
          <p className="text-muted-foreground text-base pt-2">
            This chart illustrates how the level of certainty grows over time and with practice, although it may face fluctuations. The greater the certainty, the greater the happiness and tranquility.
          </p>
        </CardHeader>
        <CardContent>
          <CertaintyChart />
        </CardContent>
      </Card>
    </div>
  );
}
