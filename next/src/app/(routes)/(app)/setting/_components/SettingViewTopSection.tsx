'use client';

import AppPageTitle from "@/common/components/layout/AppPageTitle";
import Image from "next/image";
import bottomCat from "/public/img/bottom-cat.png";

const SettingViewTopSection = () => {
  return (
    <section>
      <AppPageTitle title="앱 설정" description="나에게 편안한 기록 공간을 만들어요" />
      <Image src={bottomCat} alt="" className="ml-auto mt-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default SettingViewTopSection;
