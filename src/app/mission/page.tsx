import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Globe, BookOpen, Users, Heart } from "lucide-react";
import Link from 'next/link';

const principles = [
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "Neutrality and Respect",
        description: "We are a neutral platform that respects all religions, cultures, and nationalities. Our goal is to build bridges and promote mutual understanding.",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "Reliable Knowledge",
        description: "We strive to provide content based on reliable knowledge and logical thinking, simplifying deep concepts to make them accessible to everyone.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "The Power of Community",
        description: "We believe the journey of certainty is deeper and more stable within a supportive community through forums, interactive rooms, and volunteer opportunities.",
    },
    {
        icon: <Heart className="h-8 w-8 text-primary" />,
        title: "Non-Profit Project",
        description: "Eye of Certainty is a non-profit initiative, relying on the efforts of volunteers and community support to continue delivering its message for free.",
    }
]

export default function MissionPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <Target className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Our Mission and Goal
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          To introduce God and the message of "La ilaha illa Allah" (There is no god but Allah) to all people.
        </p>
      </div>
      
      <Card className="mb-16 shadow-lg bg-primary/5 border-primary/20">
        <CardHeader>
            <CardTitle className="font-headline text-3xl text-center text-primary">What is Eye of Certainty?</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-foreground">
                "Eye of Certainty" is a global, neutral, non-profit dawah platform. Its primary mission is to introduce God and the concept of Tawhid—"La ilaha illa Allah" (There is no god but Allah), He alone, with no partner—and to strive to reach the level of "Ayn al-Yaqin" (the Eye of Certainty) in this understanding. It then aims to deliver this pure message to all people, in their diverse languages and cultures. We provide the knowledge tools, reliable content, and supportive community to help every truth-seeker build firm convictions that illuminate their path in life.
            </p>
        </CardContent>
      </Card>


      <div className="mb-20">
        <h2 className="font-headline text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          Our Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {principles.map((principle) => (
            <Card key={principle.title} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center p-6">
                <div className="p-3 bg-primary/10 rounded-full mb-4">{principle.icon}</div>
                <CardTitle className="font-headline text-xl">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

       <div className="text-center mt-16 pt-8 border-t">
          <h2 className="font-headline text-2xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Explore the Journey of Certainty Roadmap and take your first step toward a more secure and stable life.</p>
          <Button asChild size="lg">
            <Link href="/journey-of-certainty">Discover the Roadmap</Link>
          </Button>
        </div>

    </div>
  );
}
