'use client';

import { EMOTIONS } from "@/common/constants/emotions";
import type { DiaryData } from "@/common/types/diary";
import Image from "next/image";

interface TextSlideProps {
  diaryData: DiaryData;
  showEmotion?: boolean;
}

export const TextSlide = ({ diaryData, showEmotion = true }: TextSlideProps) => {
  const text = diaryData?.text;
  const emotion = EMOTIONS[diaryData?.emotion];

  return (
    <div className="slideChild overflow-y-scroll flex h-full w-full shrink-0 flex-col justify-start gap-8 p-6">
      {showEmotion && (
        <div className="flex justify-center">
          <Image
            className="h-16 w-16"
            width={64}
            height={64}
            src={emotion?.src}
            alt={emotion?.nameKr || '감정'} />
        </div>
      )}
      {diaryData?.Habits.length > 0 &&
        <div className="flex flex-wrap gap-x-2">
          {diaryData?.Habits?.map((e: { name: string }) => (
            <span className="shrink-0 whitespace-nowrap text-base text-theme-accent" key={e.name}>
              #{e.name}
            </span>
          ))}
        </div>}
      <div className="h-auto w-full whitespace-pre-wrap break-words text-base leading-[1.8] text-theme-text-primary">{text}</div>
    </div>
  );
};
