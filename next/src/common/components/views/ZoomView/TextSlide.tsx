'use client';

import { diaryData } from "@/app/(routes)/(app)/list/_types/diaryData";
import { EMOTIONS } from "@/common/constants/emotions";
import Image from "next/image";

interface TextSlideProps {
  diaryData: diaryData;
}

export const TextSlide = ({ diaryData }: TextSlideProps) => {
  const text = diaryData?.text;
  const emotion = EMOTIONS[diaryData?.emotion];

  return (
    <div className="slideChild flex h-full w-full shrink-0 flex-col justify-center gap-8 p-6 min-[480px]:max-[1023px]:gap-3 min-[480px]:max-[1023px]:px-[4dvw] min-[480px]:max-[1023px]:py-3">
      <div className="flex justify-center min-[480px]:max-[1023px]:[&>img]:h-12 min-[480px]:max-[1023px]:[&>img]:w-12">
        <Image
          width={64}
          height={64}
          src={emotion?.src}
          alt={emotion?.nameKr || '감정'} />
      </div>
      {diaryData?.Habits.length > 0 &&
        <div className="flex flex-wrap [&>span]:mr-2 [&>span]:shrink-0 [&>span]:whitespace-nowrap [&>span]:text-app [&>span]:text-theme">
          {diaryData?.Habits?.map((e: { name: string }) => <span key={e.name}>#{e.name}</span>)}
        </div>}
      <div className="h-full w-full overflow-y-scroll whitespace-pre-wrap break-words text-app leading-[1.8] text-grey-title">{text}</div>
    </div>
  );
};
