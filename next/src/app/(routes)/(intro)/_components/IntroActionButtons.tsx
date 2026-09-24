'use client';

import { useRouter } from 'next/navigation';
import { FaGooglePlay } from 'react-icons/fa';
import { MdInstallMobile, MdLanguage } from 'react-icons/md';

import { cn } from '@/common/utils/cn';
import { usePwaInstall } from '../_hooks/usePwaInstall';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share';

interface IntroActionButtonsProps {
  tone?: 'light' | 'dark';
  className?: string;
}

const buttonLayoutClass = "inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap px-4 max-[420px]:flex-[1_1_100%]";
const buttonThemeClass = "rounded-theme font-title text-base font-medium leading-none text-theme-text-primary shadow-card border border-theme-accent/30";
const buttonMotionClass = "transition-[transform,background-color] duration-[180ms] active:translate-y-px";
const buttonClass = cn(buttonLayoutClass, buttonThemeClass, buttonMotionClass);
const iconClass = "h-5 w-5 shrink-0";

const IntroActionButtons = ({ tone = 'light', className }: IntroActionButtonsProps) => {
  const router = useRouter();
  const { installPwa } = usePwaInstall();

  const startInWeb = () => {
    router.push('/login');
  };

  return (
    <div className={cn("flex w-full flex-wrap justify-center gap-3", className)}>
      <button
        className={cn(buttonClass, tone === 'dark' ? 'bg-theme-surface/78' : 'bg-theme-bg')}
        type="button"
        onClick={startInWeb}
      >
        <MdLanguage className={cn(iconClass, 'text-theme-accent')} aria-hidden="true" />
        웹에서 실행
      </button>
      <button
        className={cn(buttonClass, tone === 'dark' ? 'bg-theme-surface/78' : 'bg-theme-bg')}
        type="button"
        onClick={installPwa}
      >
        <MdInstallMobile className={cn(iconClass, 'text-theme-accent')} aria-hidden="true" />
        PWA 설치
      </button>
      <button
        className={cn(buttonClass, tone === 'dark' ? 'bg-theme-surface/78' : 'bg-theme-bg')}
        type="button"
        onClick={() => router.push(PLAY_STORE_URL)}
      >
        <FaGooglePlay className={cn(iconClass, 'text-theme-accent')} aria-hidden="true" />
        Play Store
      </button>
    </div>
  );
};

export default IntroActionButtons;
