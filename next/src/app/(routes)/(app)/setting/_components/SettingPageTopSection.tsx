'use client';

import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { TopSectionCatSize, TopSectionIconCatClass } from "@/common/constants/TopSectionCat";
import Image from "next/image";
import cat from '/public/img/hiding-cat/hiding-cat-icon.png';


const SettingPageTopSection = () => {
  return (
    <>
      <section className="px-[5dvw] pt-[5dvw] tablet:px-9 tablet:pt-6 desktop:px-14">
        <AppPageTitle title="앱 설정" description="나에게 편안한 기록 공간을 만들어요" />
      </section>
      <Image priority src={cat} alt="hiding-cat" sizes={TopSectionCatSize} className={TopSectionIconCatClass} />
    </>
  );
};

export default SettingPageTopSection;
