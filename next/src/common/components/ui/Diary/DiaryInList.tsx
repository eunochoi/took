'use client';

import type { DiaryData } from '@/common/types/diary';
import Image from "next/image";
import { cn } from "@/common/utils/cn";
import Carousel from "../Carousel";
import DiaryCardShell from "./DiaryCardShell";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryHabits from "./DiaryHabits";
import useDiaryNavigation from "./hooks/useDiaryNavigation";

interface Props {
  diaryData: DiaryData;
}

const DiaryInList = ({ diaryData }: Props) => {
  const { Images: images } = diaryData;
  const hasImages = images.length >= 1;
  const { navigateToZoom } = useDiaryNavigation(diaryData.id);

  return (
    <DiaryCardShell $type="large">
      <DiaryDateHeader diaryData={diaryData} />
      <div className="my-4 flex h-full w-full flex-col justify-center gap-4" onClick={navigateToZoom}>
        {hasImages && (
          <div className="h-[300px] w-full min-[1024px]:h-[400px]">
            <Carousel>
              {images.map((img) => (
                <Image
                  className="h-full w-full object-cover"
                  key={img.id}
                  src={img.src}
                  width={400}
                  height={400}
                  alt="diary image"
                />
              ))}
            </Carousel>
          </div>
        )}
        <div
          className={cn(
            "shrink-0 overflow-hidden whitespace-pre-wrap break-words px-4 text-app leading-[1.8] text-grey-title [display:-webkit-box] [-webkit-box-orient:vertical]",
            hasImages ? "[-webkit-line-clamp:4]" : "[-webkit-line-clamp:6]",
            "max-[479px]:[-webkit-line-clamp:3]",
          )}
        >
          {diaryData.text}
        </div>
      </div>
      <DiaryHabits habits={diaryData.Habits} />
    </DiaryCardShell>
  );
};

export default DiaryInList;
