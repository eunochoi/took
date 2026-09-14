'use client';

import Image from "next/image";

import TodayRecordSection from "./TodayRecordSection";

import emotionsImage from '/public/img/emotion/emotions.png';

const GreetingSection = ({ initialDate }: { initialDate: string }) => {
  return (
    <section className="m-0 flex min-w-0 flex-col gap-5 desktop:items-end desktop:text-right">
      <div className="mx-auto mb-6 mt-12 w-3/4 tablet:hidden">
        <Image
          className="h-auto w-full object-contain"
          src={emotionsImage}
          alt="emotions"
          width={1200}
          height={900}
          priority
          quality={100}
          unoptimized={false}
        />
      </div>
      <span className="text-3xl font-title font-bold capitalize text-theme-accent">툭! 오늘도 하나씩 :)</span>
      <p className="m-0 flex flex-col gap-1 break-words text-justify desktop:text-right text-lg leading-normal text-theme-text-primary">
        <span className="block">완벽한 하루가 아니어도 좋습니다.</span>
        <span className="block">습관 발자국 하나만 남겨도 충분해요.</span>
      </p>
      <TodayRecordSection initialDate={initialDate} />
    </section>
  );
};

export default GreetingSection;
