'use client';

import Diary from "@/common/components/ui/Diary";
import { EMOTIONS } from "@/common/constants/emotions";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import React from "react";
import { diaryData } from "../_types/diaryData";

interface DiariesProps {
  diaries: diaryData[];
}

export const Diaries = ({ diaries }: DiariesProps) => {
  return (
    <>
      {diaries?.length > 0 ?
        diaries?.map((data: diaryData, i: number) => {
          const currentDiaryDate = format(data.date, 'yyyy년 M월', { locale: ko });
          const previousDiaryDate = i > 0 ? format(diaries[i - 1].date, 'yyyy년 M월', { locale: ko }) : '';

          if (currentDiaryDate !== previousDiaryDate) {
            return (
              <React.Fragment key={'listNote' + i}>
                <span className="my-4 flex w-full items-center justify-start font-bmjua text-[32px] capitalize text-grey-title max-[479px]:w-[90dvw] min-[1025px]:my-7 min-[1025px]:text-4xl">
                  {currentDiaryDate}
                </span>
                <div className="my-2 flex w-full items-center justify-center first:mt-0 last:mb-2">
                  <Diary type="large" diaryData={data} />
                </div>
              </React.Fragment>
            );
          }
          return (
            <div key={'listNote' + i} className="my-2 flex w-full items-center justify-center first:mt-0 last:mb-2">
              <Diary type="large" diaryData={data} />
            </div>
          );
        })
        :
        <div className="flex flex-col items-center justify-center gap-8 text-grey-title max-[479px]:pt-[25dvh] max-[479px]:text-lg min-[480px]:max-[1023px]:pt-8 min-[480px]:max-[1023px]:text-lg min-[1024px]:pt-[25dvh] min-[1024px]:text-[22px]">
          <Image src={EMOTIONS[1].src} alt={EMOTIONS[1].nameKr} width={128} height={128} />
          <span>작성된 일기가 존재하지 않습니다. :(</span>
        </div>}
    </>
  );
};
