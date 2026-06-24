'use client';

import { useRouter } from 'next/navigation';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { MdInstallMobile, MdLanguage, MdOpenInNew } from 'react-icons/md';

import { SnackBarAction } from '@/common/providers/snackbar/SnackBarAction';
import { cn } from '@/common/utils/cn';
import { usePwaInstall } from '../_hooks/usePwaInstall';
import { INTRO_CARD_SHADOW, INTRO_THEME_BG, INTRO_THEME_COLOR } from '../_constants/theme';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share';

interface IntroCtaButtonsProps {
  tone?: 'light' | 'dark';
  className?: string;
}

const buttonLayoutClass = "inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap px-4 max-[420px]:flex-[1_1_100%]";
const buttonThemeClass = "rounded-2xl border border-[rgba(140,173,226,0.26)] text-base font-medium leading-none text-grey-title";
const buttonMotionClass = "transition-[transform,border-color,background-color] duration-[180ms] active:translate-y-px";
const buttonClass = cn(buttonLayoutClass, buttonThemeClass, buttonMotionClass);
const iconClass = "h-5 w-5 shrink-0";

const IntroCtaButtons = ({ tone = 'light', className }: IntroCtaButtonsProps) => {
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
        <p className="mt-2 text-base text-[#DC7889]">실행 환경에 따라 레이아웃이 어긋날 수 있습니다.</p>
        <p className="text-base text-[#DC7889]">원활한 이용을 위해 앱 설치를 권장합니다.</p>
      </div>,
      { key: 'startInWeb', persist: false, action, autoHideDuration: 3000 }
    );
  };

  const buttonStyle = {
    backgroundColor: tone === 'dark' ? 'rgba(255, 255, 255, 0.78)' : INTRO_THEME_BG,
    boxShadow: INTRO_CARD_SHADOW,
  };

  const iconStyle = { color: INTRO_THEME_COLOR };

  return (
    <div className={cn("flex w-full flex-wrap justify-center gap-3", className)}>
      <button
        className={buttonClass}
        type="button"
        onClick={startInWeb}
        style={buttonStyle}
      >
        <MdLanguage className={iconClass} style={iconStyle} />
        웹에서 실행
      </button>
      <button
        className={buttonClass}
        type="button"
        onClick={installPwa}
        style={buttonStyle}
      >
        <MdInstallMobile className={iconClass} style={iconStyle} />
        PWA 설치
      </button>
      <button
        className={buttonClass}
        type="button"
        onClick={() => router.push(PLAY_STORE_URL)}
        style={buttonStyle}
      >
        <MdOpenInNew className={iconClass} style={iconStyle} />
        Play Store
      </button>
    </div>
  );
};

export default IntroCtaButtons;
