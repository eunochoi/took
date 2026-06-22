'use client';

import useIsMobile from '@/common/functions/useIsMobile';
import DesktopIntroView from './_components/DesktopIntroView';
import MobileIntroView from './_components/MobileIntroView';

const IntroView = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-[100dvh] w-[100dvw] overflow-y-auto bg-[#f3f7fc]">
      {isMobile === false ? <DesktopIntroView /> : <MobileIntroView />}
    </div>
  );
};

export default IntroView;
