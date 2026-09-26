'use client';

import Wordmark from '@/common/components/ui/Wordmark';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen = ({ message, showLogo = true }: LoadingScreenProps) => {
  return (
    <div
      className="relative flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-6"
      style={{ backgroundColor: 'var(--loading-background)' }}
    >
      {showLogo && (
        <div className="flex flex-col items-center gap-6">
          <Wordmark accentColor="var(--loading-indicator)" className="text-[48px]" />
          <div className="flex gap-2">
            <div className="h-4 w-4 animate-pulse rounded-full" style={{ backgroundColor: 'var(--loading-indicator)' }} />
            <div className="h-4 w-4 animate-pulse rounded-full [animation-delay:0.2s]" style={{ backgroundColor: 'var(--loading-indicator)' }} />
            <div className="h-4 w-4 animate-pulse rounded-full [animation-delay:0.4s]" style={{ backgroundColor: 'var(--loading-indicator)' }} />
          </div>
        </div>
      )}
      {message && <span className="text-base text-theme-text-primary">{message}</span>}
      <Image priority src={bottomCat} alt="bottom-cat" sizes="(min-width: 1024px) 50vw, (min-width: 480px) 70vw, 75vw" className='absolute bottom-0 right-0 w-3/4 tablet:w-[70dvw] desktop:w-[50dvw]' />
    </div>
  );
};

export default LoadingScreen;
