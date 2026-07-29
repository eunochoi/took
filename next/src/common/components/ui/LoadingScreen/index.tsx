'use client';

import Logo from '@/common/components/ui/Logo';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen = ({ message, showLogo = true }: LoadingScreenProps) => (
  <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-6 bg-theme-bg">
    {showLogo && (
      <div className="flex flex-col items-center gap-6">
        <Logo size={48} />
        <div className="flex gap-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-theme-accent" />
          <div className="h-4 w-4 animate-pulse rounded-full bg-theme-accent [animation-delay:0.2s]" />
          <div className="h-4 w-4 animate-pulse rounded-full bg-theme-accent [animation-delay:0.4s]" />
        </div>
      </div>
    )}
    {message && <span className="text-base text-theme-text-primary">{message}</span>}
  </div>
);

export default LoadingScreen;
