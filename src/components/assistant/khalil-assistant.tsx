'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getKhalilResponse } from '@/app/actions';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialMessage: Message = {
    role: 'model',
    content: 'أهلاً بك يا صديقي، أنا خليل، مرشدك في رحلة البحث عن سكينة الروح. أنا هنا لأسمعك بقلبي وأشاركك نور الحكمة. كيف حال قلبك اليوم؟'
};

export default function KhalilAssistant() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await getKhalilResponse({ query: input, history: messages });
      if (res.data) {
        const modelMessage: Message = { role: 'model', content: res.data.answer };
        setMessages(prev => [...prev, modelMessage]);
      } else {
        const errorMessage: Message = {
          role: 'model',
          content: res.error || 'عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'model',
        content: 'عذرًا، لم نتمكن من معالجة طلبك.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20 mt-16" id="khalil-assistant">
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary/30 p-1">
            <AvatarFallback className="bg-primary/10 text-primary">
                <Bot className="h-10 w-10" />
            </AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-3xl">خليل يرشدك</CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-2">
            مساحة آمنة لاستكشاف آلامك النفسية، وإيجاد طرق علاجها، والمساعدة في التغيير للأفضل.
            <br />
            دون التعرف على خصوصيتك ومعلوماتك الشخصية، فضفض بأمان وأخرج ما يتعبك.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[40vh] border rounded-lg flex flex-col bg-muted/30">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-end gap-3 text-sm md:text-base',
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.role === 'model' && (
                      <Avatar className="w-8 h-8 border-2 border-primary/50">
                        <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2 max-w-[85%] shadow-sm',
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-background rounded-bl-none'
                      )}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                     {msg.role === 'user' && (
                      <Avatar className="w-8 h-8">
                         <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-3 justify-start">
                    <Avatar className="w-8 h-8 border-2 border-primary/50">
                        <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 bg-background flex items-center shadow-sm">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
             <div className="border-t p-4">
                <div className="flex w-full items-center space-x-2 space-x-reverse">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="اكتب ما في قلبك هنا..."
                    disabled={isLoading}
                    className="h-12 text-base"
                />
                <Button onClick={handleSend} disabled={isLoading} size="icon" className="h-12 w-12 shrink-0">
                    <Send className="h-6 w-6" />
                </Button>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
