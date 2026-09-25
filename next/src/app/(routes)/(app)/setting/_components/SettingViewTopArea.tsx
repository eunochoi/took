'use client';

import { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import AppPageTitle from "@/common/components/layout/AppPageTitle";
import Wordmark from "@/common/components/ui/Wordmark";
import Image from "next/image";
import bottomCat from "/public/img/bottom-cat.png";

const SettingViewTopArea = () => {
  return (
    <div className={`bg-theme-accent-light ${APP_PAGE_CONTENT_PADDING_CLASS_NAME}`}>
      <div className="mb-8 tablet:hidden"><Wordmark className="text-[48px]" /></div>
      <AppPageTitle title="설정" description="나에게 편안한 기록 공간을 만들어요" />
      <Image src={bottomCat} alt="" className="ml-auto mt-auto block w-full tablet:w-1/2 desktop:w-1/2" />
    </div>
  );
};

export default SettingViewTopArea;
