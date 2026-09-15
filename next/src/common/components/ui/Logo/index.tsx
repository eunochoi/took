'use client';

import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import logoImage from '/public/img/emotion/sad.png';

interface LogoProps {
  withText?: boolean;
  wrapperClassName?: string;
  logoClassName?: string;
  textClassName?: string;
}

const Logo = ({ withText = false, wrapperClassName, logoClassName, textClassName }: LogoProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", wrapperClassName)}>
      <div className="flex items-center justify-center">
        <Image src={logoImage} className={logoClassName} alt="TOOK Logo" priority />
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
