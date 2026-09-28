'use client';

import { BottomSafe } from '../BottomSafe';
import Wordmark from '../Wordmark';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen = ({ message, showLogo = true }: LoadingScreenProps) => {
  return (
    <div
      className="relative flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-6"
      style={{ backgroundColor: 'var(--loading-background)', fontFamily: 'TmoneyRoundWind' }}
    >
      {showLogo && (
        <div className="flex flex-col items-center gap-12">
          <Wordmark accentColor="var(--loading-indicator)" className="text-[48px]" />
          <BottomSafe animation={false} className='!m-0' />
          <div className="flex gap-3">
            <div className="h-4 w-4 animate-pulse rounded-full" style={{ backgroundColor: 'var(--loading-indicator)' }} />
            <div className="h-4 w-4 animate-pulse rounded-full [animation-delay:0.2s]" style={{ backgroundColor: 'var(--loading-indicator)' }} />
            <div className="h-4 w-4 animate-pulse rounded-full [animation-delay:0.4s]" style={{ backgroundColor: 'var(--loading-indicator)' }} />
          </div>
        </div>
      )}
      {message && <span className="text-base text-theme-text-primary">{message}</span>}
    </div>
  );
};

export default LoadingScreen;
