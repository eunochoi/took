'use client';

import AppPageTitle from "@/common/components/layout/AppPageTitle";
import Image from "next/image";
import hidingCat from "/public/img/hiding-cat-tail.png";

const SettingPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="앱 설정" description="나에게 편안한 기록 공간을 만들어요" />
      <Image priority src={hidingCat} alt="" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="ml-auto mt-auto block w-3/5 tablet:w-1/3 desktop:w-1/3" />
    </section>
  );
};

export default SettingPageTopSection;
