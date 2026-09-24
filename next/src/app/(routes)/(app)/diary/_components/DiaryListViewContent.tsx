'use client';

import EmptyStateCard from "@/common/components/ui/EmptyStateCard";
import type { DiaryData } from "@/common/types/diary";
import { MdMenuBook } from 'react-icons/md';
import DiaryCard from "./DiaryCard";
import DiaryStatsPanel from "./DiaryStatsPanel";

interface Props {
  flatDiaries?: DiaryData[];
  isDiaryListEmpty: boolean;
  hasAppliedFilter: boolean;
  inViewRef: (node?: Element | null) => void;
  statsYear: number;
  setStatsYear: (year: number) => void;
}

const DiaryListViewContent = ({ flatDiaries, isDiaryListEmpty, hasAppliedFilter, inViewRef, statsYear, setStatsYear }: Props) => {
  return (
    <div className="grid flex-1 w-full gap-6 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:items-start desktop:gap-x-8">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex w-full min-w-0 flex-col gap-4 desktop:self-start">
          {isDiaryListEmpty ? (
            <EmptyStateCard
              description={hasAppliedFilter ? '필터를 바꾸거나 새로운 일기를 작성해 보세요.' : '오늘의 감정과 생각을 첫 번째 일기로 남겨보세요.'}
              icon={<MdMenuBook aria-hidden="true" />}
              title={hasAppliedFilter ? '선택한 조건의 일기가 없어요.' : '아직 작성한 일기가 없어요.'}
            />
          ) : flatDiaries?.map((diary) => (
            <div key={diary.id} className="flex w-full items-center justify-center">
              <DiaryCard diaryData={diary} />
            </div>
          ))}
          <div ref={inViewRef} className="h-[50px] w-full shrink-0" />
        </div>
      </div>
      <DiaryStatsPanel
        year={statsYear}
        onChangeYear={setStatsYear}
        className="desktop:col-start-2"
      />
    </div>
  );
};

export default DiaryListViewContent;
