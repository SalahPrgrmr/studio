'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, Bot, User, Loader2, PenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createPersonalizedPath } from '@/app/actions';
import { personalPathSchema, type PersonalPathFormValues } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export default function PersonalPathForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PersonalPathFormValues>({
    resolver: zodResolver(personalPathSchema),
    defaultValues: {
      beliefs: '',
      background: '',
      aspirations: '',
    },
  });

  async function onSubmit(values: PersonalPathFormValues) {
    setIsLoading(true);
    setResult(null);

    const actionResult = await createPersonalizedPath(values);

    setIsLoading(false);
    if (actionResult.error) {
      toast({
        variant: 'destructive',
        title: 'Error creating path',
        description: actionResult.error,
      });
    } else if (actionResult.data) {
      setResult(actionResult.data.personalizedPath);
      // Scroll to the result card
      setTimeout(() => {
        document.getElementById('ai-result-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  return (
    <section id="personal-path" className="w-full">
      <div className="text-center space-y-4 mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Create <span className="text-primary">Your Personal Path</span>
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
          Answer a few questions and our AI will generate a custom set of actionable steps to guide your journey toward certainty.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <User className="h-6 w-6" /> Tell Us About Yourself
              </CardTitle>
              <CardDescription>
                The more you share, the more personalized your path will be. All information is private.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="beliefs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base">
                      <PenLine className="h-4 w-4" /> Your Current Beliefs
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., your spiritual, philosophical, or personal views on life and the world..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base">
                      <PenLine className="h-4 w-4" /> Your Background & Experiences
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., your cultural upbringing, significant life events, or career path..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aspirations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base">
                      <PenLine className="h-4 w-4" /> Your Aspirations & Goals
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., what you hope to achieve, the person you want to become, or the impact you want to make..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-2 h-5 w-5" />
                    Generate Path
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {isLoading && (
        <Card className="max-w-4xl mx-auto mt-8 shadow-lg animate-pulse" id="ai-result-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Bot className="h-6 w-6" /> Your Personal Path
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardContent>
        </Card>
      )}

      {result && !isLoading && (
        <Card id="ai-result-card" className="max-w-4xl mx-auto mt-8 shadow-lg animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Bot className="h-6 w-6 text-primary" /> Your Personal Path
            </CardTitle>
            <CardDescription>Here are some AI-generated steps tailored for your journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-blue max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />
          </CardContent>
        </Card>
      )}
    </section>
  );
}
