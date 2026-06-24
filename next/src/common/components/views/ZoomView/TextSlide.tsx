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
    <div className="slideChild flex h-full w-full shrink-0 flex-col justify-center gap-8 p-6">
      <div className="flex justify-center">
        <Image
          className="h-16 w-16"
          width={64}
          height={64}
          src={emotion?.src}
          alt={emotion?.nameKr || '감정'} />
      </div>
      {diaryData?.Habits.length > 0 &&
        <div className="flex flex-wrap gap-x-2">
          {diaryData?.Habits?.map((e: { name: string }) => (
            <span className="shrink-0 whitespace-nowrap text-app text-theme" key={e.name}>
              #{e.name}
            </span>
          ))}
        </div>}
      <div className="h-full w-full overflow-y-scroll whitespace-pre-wrap break-words text-app leading-[1.8] text-grey-title">{text}</div>
    </div>
  );
};
