'use client';

import Diary from "@/common/components/ui/Diary";
import { EMOTIONS } from "@/common/constants/emotions";
import type { DiaryData } from "@/common/types/diary";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import React from "react";

interface DiaryListProps {
  diaries: DiaryData[];
}

export const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <>
      {diaries?.length > 0 ?
        diaries.map((diary, index) => {
          const currentDiaryDate = format(diary.date, 'yyyy년 M월', { locale: ko });
          const previousDiaryDate = index > 0
            ? format(diaries[index - 1].date, 'yyyy년 M월', { locale: ko })
            : '';

          if (currentDiaryDate !== previousDiaryDate) {
            return (
              <React.Fragment key={`diary-list-${diary.id}`}>
                <span className="my-4 flex w-full items-center justify-start text-3xl font-title font-bold capitalize text-theme-accent max-[479px]:w-[90dvw]">
                  {currentDiaryDate}
                </span>
                <div className="my-2 flex w-full items-center justify-center first:mt-0 last:mb-2">
                  <Diary type="large" diaryData={diary} />
                </div>
              </React.Fragment>
            );
          }

          return (
            <div key={`diary-list-${diary.id}`} className="my-2 flex w-full items-center justify-center first:mt-0 last:mb-2">
              <Diary type="large" diaryData={diary} />
            </div>
          );
        })
        :
        <div className="flex flex-col items-center justify-center gap-8 text-theme-text-primary max-[479px]:pt-[25dvh] max-[479px]:text-lg min-[480px]:max-[1023px]:pt-8 min-[480px]:max-[1023px]:text-lg min-[1024px]:pt-[25dvh] min-[1024px]:text-2xl">
          <Image src={EMOTIONS[1].src} alt={EMOTIONS[1].nameKr} width={128} height={128} />
          <span>작성된 일기가 존재하지 않습니다. :(</span>
        </div>}
    </>
  );
};
