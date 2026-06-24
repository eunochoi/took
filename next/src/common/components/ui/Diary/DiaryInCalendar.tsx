'use client';

import type { DiaryData } from '@/common/types/diary';
import Image from "next/image";
import Carousel from "../Carousel";
import DiaryCardShell from "./DiaryCardShell";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryHabits from "./DiaryHabits";
import useDiaryNavigation from "./hooks/useDiaryNavigation";

interface Props {
  diaryData: DiaryData;
}

const DiaryInCalendar = ({ diaryData }: Props) => {
  const images = diaryData.Images ?? [];
  const { navigateToZoom } = useDiaryNavigation(diaryData.id);

  return (
    <DiaryCardShell $type="small">
      <Carousel resetOnChange showIndicator={false}>
        <div className="box-border flex h-full w-full shrink-0 flex-col justify-between">
          <DiaryDateHeader diaryData={diaryData} />
          <div className="flex flex-col justify-center px-3.5" onClick={navigateToZoom}>
            <div className="[display:-webkit-box] overflow-hidden whitespace-pre-wrap break-words text-app leading-[1.35] text-gray-500 [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {diaryData.text}
            </div>
            {/* {images.length > 0 && (
              <button className="self-end text-right text-base text-theme" type="button">
                {images.length} images ➝
              </button>
            )} */}
          </div>
          <DiaryHabits habits={diaryData.Habits} />
        </div>
        {images.map((img) => (
          <Image
            className="h-full w-full cursor-pointer object-cover"
            onClick={navigateToZoom}
            key={img.id}
            src={img.src}
            alt="diary image"
            width={300}
            height={300}
            blurDataURL={img.src}
            placeholder="blur"
          />
        ))}
      </Carousel>
    </DiaryCardShell>
  );
};

export default DiaryInCalendar;
