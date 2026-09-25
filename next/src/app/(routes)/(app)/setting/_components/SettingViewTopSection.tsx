'use client';

import { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { APP_PAGE_TOP_AREA_CLASS } from "@/common/constants/pageStyle";
import Image from "next/image";
import bottomCat from "/public/img/bottom-cat.png";

const SettingViewTopSection = () => {
  return (
    <section className={`${APP_PAGE_TOP_AREA_CLASS} ${APP_PAGE_CONTENT_PADDING_CLASS_NAME}`}>
      <AppPageTitle title="설정" description="나에게 편안한 기록 공간을 만들어요" />
      <Image src={bottomCat} alt="" className="ml-auto mt-auto block w-full tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default SettingViewTopSection;
