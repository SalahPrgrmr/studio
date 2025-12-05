
import * as React from 'react';
import { cn } from "@/lib/utils";
import Logo from './logo';

interface InvitationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: 'ar' | 'en';
}

const InvitationCard = React.forwardRef<HTMLDivElement, InvitationCardProps>(
  ({ className, lang, ...props }, ref) => {
    
    const content = {
      ar: {
        title: "قل لا إله إلا الله",
        subtitle: "The Key to Peace and Certainty",
        direction: "rtl",
        titleFont: "font-headline",
        subtitleFont: "font-body",
      },
      en: {
        title: "There is no god but Allah",
        subtitle: "مفتاح السكينة واليقين",
        direction: "ltr",
        titleFont: "font-headline",
        subtitleFont: "font-body",
      }
    };

    const { title, subtitle, direction, titleFont, subtitleFont } = content[lang];

    return (
      <div
        ref={ref}
        dir={direction}
        className={cn(
            "aspect-video w-full rounded-lg shadow-xl p-8 flex flex-col justify-between",
            "bg-gradient-to-br from-background to-card border border-primary/20",
            className
        )}
        {...props}
      >
        <div className="flex justify-start">
            <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg">
                <Logo className="h-8 w-8 text-primary" />
                <span className="font-bold font-headline text-lg text-foreground">
                    {lang === 'ar' ? 'عين اليقين' : 'Eye of Certainty'}
                </span>
            </div>
        </div>

        <div className="text-center">
            <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary drop-shadow-lg", titleFont)}>
                {title}
            </h1>
            <p className={cn("text-lg md:text-xl text-muted-foreground mt-4", subtitleFont)}>
                {subtitle}
            </p>
        </div>

        <div className="text-center text-xs text-muted-foreground/80 font-mono">
            {lang === 'ar' ? 'ain-al-yaqin.com' : 'ain-al-yaqin.com'}
        </div>
      </div>
    );
  }
);

InvitationCard.displayName = "InvitationCard";

export default InvitationCard;
