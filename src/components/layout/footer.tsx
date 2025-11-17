import { Globe } from "lucide-react";
import Logo from "../logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Logo className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline">عين اليقين</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">شروط الخدمة</Link>
             <span>&copy; {new Date().getFullYear()} عين اليقين. جميع الحقوق محفوظة.</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>نحترم جميع الأديان والجنسيات.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
