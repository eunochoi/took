'use client';

import Image from "next/image";
import Link from "next/link";
import { MdCalendarMonth, MdCheckBox } from 'react-icons/md';

import emotionsImage from '/public/img/emotion/emotions.png';

const actionLinkClass = "flex items-center gap-2 rounded-xl bg-theme-surface px-4 py-3 shadow-card transition-all duration-200 ease-in-out hover:-translate-y-px hover:bg-theme-surface-elevated hover:shadow-[0_2px_8px_rgb(var(--theme-shadow-color)/0.08)]";
const actionIconClass = "flex shrink-0 items-center justify-center text-xl text-theme-accent";

const GreetingSection = () => {
  return (
    <section className="m-0 flex flex-col gap-5">
      <div className="mx-auto mb-6 mt-12 w-3/4 min-[480px]:hidden">
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
      <p className="m-0 flex flex-col gap-1 break-words text-justify text-base leading-normal text-theme-text-primary">
        <span className="block">완벽한 하루가 아니어도 좋습니다.</span>
        <span className="block">습관 발자국 하나만 남겨도 충분해요.</span>
      </p>
      <div className="flex flex-col gap-2.5 min-[480px]:flex-row min-[480px]:gap-3">
        <Link
          className={actionLinkClass}
          href="/calendar"
        >
          <span className={actionIconClass}><MdCalendarMonth /></span>
          <span className="text-sm text-theme-text-primary">일기 작성하러 가기</span>
        </Link>
        <Link
          className={actionLinkClass}
          href="/habit"
        >
          <span className={actionIconClass}><MdCheckBox /></span>
          <span className="text-sm text-theme-text-primary">습관 관리하러 가기</span>
        </Link>
      </div>
    </section>
  );
};

export default GreetingSection;
