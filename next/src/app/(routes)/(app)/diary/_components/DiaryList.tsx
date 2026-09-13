'use client';

import DiaryCard from './DiaryCard';
import { EMOTIONS } from "@/common/constants/emotions";
import type { DiaryData } from "@/common/types/diary";
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface DiaryListProps {
  diaries: DiaryData[];
}

export const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <>
      {diaries.length > 0 ?
        diaries.map((diary, index) => {
          const startsMonth = index === 0 || diary.date.slice(0, 7) !== diaries[index - 1].date.slice(0, 7);

          return (
            <React.Fragment key={diary.id}>
              {startsMonth && (
                <span className="my-4 flex w-full items-center justify-start text-3xl font-title font-bold capitalize text-theme-accent max-tablet:w-[90dvw]">
                  {format(parseLocalDate(diary.date), 'yyyy년 M월')}
                </span>
              )}
              <div className="my-2 flex w-full items-center justify-center first:mt-0 last:mb-2">
                <DiaryCard diaryData={diary} />
              </div>
            </React.Fragment>
          );
        })
        :
        <div className="flex flex-col items-center justify-center gap-8 text-theme-text-primary max-tablet:pt-[25dvh] max-tablet:text-lg tablet:max-desktop:pt-8 tablet:max-desktop:text-lg desktop:pt-[25dvh] desktop:text-2xl">
          <Image src={EMOTIONS[1].src} alt={EMOTIONS[1].nameKr} width={128} height={128} />
          <span>작성된 일기가 존재하지 않습니다. :(</span>
        </div>}
    </>
  );
};
