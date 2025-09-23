import { Globe } from "lucide-react";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Logo className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline">Certainty Path</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Certainty Path. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Respecting all religions and nationalities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
