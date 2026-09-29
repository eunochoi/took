'use client';

import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { TopSectionCatClass, TopSectionCatSize } from "@/common/constants/TopSectionCat";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import hidingCat from "/public/img/hiding-cat/hiding-cat.png";

const SettingPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="앱 설정" description="나에게 편안한 기록 공간을 만들어요" />
      <div>
        <Image priority src={hidingCat} alt="" sizes={TopSectionCatSize} className={twMerge(TopSectionCatClass)} />
      </div>
    </section>
  );
};

export default SettingPageTopSection;
