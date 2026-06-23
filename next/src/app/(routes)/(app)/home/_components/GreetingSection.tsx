'use client';

import Image from "next/image";
import Link from "next/link";
import { MdCalendarMonth, MdCheckBox } from 'react-icons/md';

import emotionsImage from '/public/img/emotion/emotions.png';

const GreetingSection = () => {
  return (
    <section className="m-0 flex flex-col gap-5">
      <div className="mx-auto mb-6 mt-12 w-3/4 [&>img]:h-auto [&>img]:w-full [&>img]:object-contain min-[480px]:hidden">
        <Image
          src={emotionsImage}
          alt="emotions"
          width={1200}
          height={900}
          priority
          quality={100}
          unoptimized={false}
        />
      </div>
      <h1 className="font-bmjua text-[32px] capitalize text-grey-title min-[1025px]:text-4xl">TOOK! 오늘도 하나씩 :)</h1>
      <p className="m-0 flex flex-col gap-1 break-words text-justify text-lg font-semibold leading-normal text-gray-600 min-[480px]:text-[21px]">
        <span className="block">완벽한 하루가 아니어도 좋습니다.</span>
        <span className="block">발자국 하나만 남겨도 충분해요.</span>
      </p>
      <div className="flex flex-col gap-2.5 min-[480px]:flex-row min-[480px]:gap-3">
        <Link
          className="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-3 shadow-card transition-all duration-200 ease-in-out hover:-translate-y-px hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          href="/calendar"
        >
          <span className="flex shrink-0 items-center justify-center text-xl text-theme"><MdCalendarMonth /></span>
          <span className="text-sm text-grey-title">일기 작성하러 가기</span>
        </Link>
        <Link
          className="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-3 shadow-card transition-all duration-200 ease-in-out hover:-translate-y-px hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          href="/habit"
        >
          <span className="flex shrink-0 items-center justify-center text-xl text-theme"><MdCheckBox /></span>
          <span className="text-sm text-grey-title">습관 관리하러 가기</span>
        </Link>
      </div>
    </section>
  );
};

export default GreetingSection;
