import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    {/* Heart shape */}
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    
    {/* Eye shape inside the heart */}
    <path
      d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      fill="var(--background)" 
    />
    <circle 
      cx="12" 
      cy="9" 
      r="1.75" 
      fill="currentColor"
    />
  </svg>
);
export default Logo;
