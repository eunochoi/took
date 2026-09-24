'use client';

import { cn } from '@/common/utils/cn';
import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from '@/common/constants/emotions';

interface LogoProps {
  withText?: boolean;
  rootClassName?: string;
  logoClassName?: string;
  textClassName?: string;
}

const Logo = ({ withText = false, rootClassName, logoClassName, textClassName }: LogoProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", rootClassName)}>
      <div className="flex items-center justify-center">
        <EmotionImage emotion={EMOTIONS[6]} className={logoClassName} alt="TOOK Logo" priority />
      </div>
      {withText && <span
        className={cn('uppercase font-title leading-[1.2] text-theme-text-primary', textClassName)}
      >
        TOOK
      </span>}
    </div>
  );
};

export default Logo;
