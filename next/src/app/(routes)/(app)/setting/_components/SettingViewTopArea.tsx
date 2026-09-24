'use client';

import AppPageTitle from "@/common/components/layout/AppPageTitle";
import Wordmark from "@/common/components/ui/Wordmark";

const SettingViewTopArea = () => {
  return (
    <>
      <div className="mb-8 tablet:hidden"><Wordmark className="text-[48px]" /></div>
      <AppPageTitle title="설정" description="나에게 편안한 기록 공간을 만들어요" />
    </>
  );
};

export default SettingViewTopArea;
