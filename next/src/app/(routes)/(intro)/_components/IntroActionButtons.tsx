'use client';

import { useRouter } from 'next/navigation';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { MdInstallMobile, MdLanguage, MdOpenInNew } from 'react-icons/md';

import { SnackBarAction } from '@/common/providers/snackbar/SnackBarAction';
import { cn } from '@/common/utils/cn';
import { usePwaInstall } from '../_hooks/usePwaInstall';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share';

interface IntroActionButtonsProps {
  tone?: 'light' | 'dark';
  className?: string;
}

const buttonLayoutClass = "inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap px-4 max-[420px]:flex-[1_1_100%]";
const buttonThemeClass = "rounded-theme border border-theme-accent/25 text-base font-medium leading-none text-theme-text-primary shadow-card";
const buttonMotionClass = "transition-[transform,border-color,background-color] duration-[180ms] active:translate-y-px";
const buttonClass = cn(buttonLayoutClass, buttonThemeClass, buttonMotionClass);
const iconClass = "h-5 w-5 shrink-0";

const IntroActionButtons = ({ tone = 'light', className }: IntroActionButtonsProps) => {
  const router = useRouter();
  const { installPwa } = usePwaInstall();

  const startInWeb = () => {
    const action = () => (
      <SnackBarAction
        yesAction={() => {
          closeSnackbar('startInWeb');
          router.push('/login');
        }}
        noAction={() => closeSnackbar('startInWeb')}
      />
    );

    enqueueSnackbar(
      <div>
        <p>웹에서 계속 진행하시겠습니까?</p>
        <p className="mt-2 text-base text-theme-danger">실행 환경에 따라 레이아웃이 어긋날 수 있습니다.</p>
        <p className="text-base text-theme-danger">원활한 이용을 위해 앱 설치를 권장합니다.</p>
      </div>,
      { key: 'startInWeb', persist: false, action, autoHideDuration: 3000 }
    );
  };

  return (
    <div className={cn("flex w-full flex-wrap justify-center gap-3", className)}>
      <button
        className={cn(buttonClass, tone === 'dark' ? 'bg-theme-surface/78' : 'bg-theme-bg')}
        type="button"
        onClick={startInWeb}
      >
        <MdLanguage className={cn(iconClass, 'text-theme-accent')} />
        웹에서 실행
      </button>
      <button
        className={cn(buttonClass, tone === 'dark' ? 'bg-theme-surface/78' : 'bg-theme-bg')}
        type="button"
        onClick={installPwa}
      >
        <MdInstallMobile className={cn(iconClass, 'text-theme-accent')} />
        PWA 설치
      </button>
      <button
        className={cn(buttonClass, tone === 'dark' ? 'bg-theme-surface/78' : 'bg-theme-bg')}
        type="button"
        onClick={() => router.push(PLAY_STORE_URL)}
      >
        <MdOpenInNew className={cn(iconClass, 'text-theme-accent')} />
        Play Store
      </button>
    </div>
  );
};

export default IntroActionButtons;
