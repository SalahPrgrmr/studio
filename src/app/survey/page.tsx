'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SurveyPage() {
  const [feeling, setFeeling] = useState<string | null>(null);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">استقصاء الشعور الداخلي</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            لنبدأ بفهم ما تشعر به. إجاباتك ستساعدنا في إرشادك.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="w-full max-w-md mx-auto">
            <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
              هل تشعر بالخوف والقلق؟
            </h3>
            <RadioGroup
              value={feeling || ''}
              onValueChange={setFeeling}
              className="grid grid-cols-2 gap-4"
            >
              {(['yes', 'no'] as const).map((value) => (
                <Label
                  key={value}
                  htmlFor={`r-${value}`}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-colors duration-300',
                    feeling === value
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-muted bg-transparent hover:border-primary/50',
                    'space-y-2'
                  )}
                >
                  <RadioGroupItem value={value} id={`r-${value}`} className="sr-only" />
                  <span className="text-2xl font-bold">
                    {value === 'yes' ? 'نعم' : 'لا'}
                  </span>
                  <span className="text-muted-foreground">
                    {value === 'yes'
                      ? 'أشعر ببعض القلق'
                      : 'لا أشعر بالقلق حاليًا'}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button size="lg" disabled className="w-full max-w-xs">
                متابعة (قريبًا)
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
