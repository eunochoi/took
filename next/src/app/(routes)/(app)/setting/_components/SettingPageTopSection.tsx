'use client';

import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { TopSectionCatClass, TopSectionCatSize } from "@/common/constants/TopSectionCat";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import hidingCat from "/public/img/hiding-cat-tail.png";

const SettingPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="앱 설정" description="나에게 편안한 기록 공간을 만들어요" />
      <Image priority src={hidingCat} alt="" sizes={TopSectionCatSize} className={twMerge(TopSectionCatClass, "w-3/5")} />
    </section>
  );
};

export default SettingPageTopSection;
