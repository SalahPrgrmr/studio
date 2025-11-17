'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShieldAlert, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SurveyPage() {
  const [feeling, setFeeling] = useState<string | null>(null);

  const getNextStepLink = () => {
    if (feeling === 'yes') {
      return '/journey-of-certainty/for-the-needy';
    }
    if (feeling === 'no') {
        return '/journey-of-certainty';
    }
    return '#';
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">استقصاء الشعور الداخلي</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            لنبدأ بفهم ما تشعر به. إجاباتك ستساعدنا في إرشادك إلى نقطة البداية الأنسب لك.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="w-full max-w-md mx-auto">
            <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
              هل تشعر بالخوف، أو القلق، أو الضيق، أو أنك مضطر؟
            </h3>
            <RadioGroup
              value={feeling || ''}
              onValueChange={setFeeling}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {(['yes', 'no'] as const).map((value) => (
                <Label
                  key={value}
                  htmlFor={`r-${value}`}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all duration-300 transform hover:scale-105',
                    feeling === value
                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                      : 'border-muted bg-transparent hover:border-primary/50',
                    'space-y-3'
                  )}
                >
                  <RadioGroupItem value={value} id={`r-${value}`} className="sr-only" />
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-colors", feeling === value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    {value === 'yes' ? <Check className="h-7 w-7" /> : <X className="h-7 w-7" />}
                  </div>
                  <span className="text-xl font-bold">
                    {value === 'yes' ? 'نعم' : 'لا'}
                  </span>
                  <span className="text-muted-foreground text-center text-sm">
                    {value === 'yes'
                      ? 'أشعر ببعض هذه المشاعر'
                      : 'أنا في حالة جيدة حاليًا'}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button size="lg" asChild disabled={!feeling}>
                <Link href={getNextStepLink()}>
                  متابعة
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
