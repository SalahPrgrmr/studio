'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShieldAlert } from 'lucide-react';

export default function SurveyPage() {
  const [feeling, setFeeling] = useState<string | null>(null);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">استقصاء الشعور الداخلي</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            لنبدأ بفهم ما تشعر به. إجاباتك ستساعدنا في إرشادك.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="w-full max-w-md mx-auto">
            <h3 className="mb-6 text-center text-xl font-semibold">
              هل تشعر بالخوف والقلق؟
            </h3>
            <RadioGroup
              value={feeling || ''}
              onValueChange={setFeeling}
              className="flex justify-center gap-8"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r1" className="text-lg font-medium cursor-pointer">
                  نعم
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="no" id="r2" />
                <Label htmlFor="r2" className="text-lg font-medium cursor-pointer">
                  لا
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button size="lg" disabled>
                متابعة (قريبًا)
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
