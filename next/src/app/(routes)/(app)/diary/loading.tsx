'use client';

import AppPageLayout from '@/common/components/layout/AppPageLayout';
import { EMOTIONS } from '@/common/constants/emotions';
import { EMOTION_UNSELECTED, MONTH_UNSELECTED } from '@/common/constants/filterDefaults';
import { useSortToggle } from '@/common/hooks/useSortToggle';
import DiaryPageSkeleton from './_components/DiaryPageSkeleton';
import DiaryPageToolbar from './_components/DiaryPageToolbar';
import DiaryPageTopSection from './_components/DiaryPageTopSection';
import { useDiaryListFilter } from './_hooks/useDiaryListFilter';

const noop = () => {};

const DiaryLoading = () => {
  const { selectedYear, selectedMonth, emotionToggle } = useDiaryListFilter();
  const { sortValue } = useSortToggle({ sortKey: 'diary' });
  const isPeriodSelected = selectedYear !== null;
  const isEmotionSelected = emotionToggle !== EMOTION_UNSELECTED;
  const selectedPeriodLabel = selectedYear === null
    ? '전체 기간'
    : selectedMonth === MONTH_UNSELECTED ? `${selectedYear}년` : `${selectedYear}년 ${selectedMonth}월`;

  return (
    <AppPageLayout
      topSection={<DiaryPageTopSection />}
      toolbar={
        <DiaryPageToolbar
          openPeriodFilter={noop}
          isPeriodSelected={isPeriodSelected}
          selectedPeriodLabel={selectedPeriodLabel}
          onToggle={noop}
          sortValue={sortValue}
          openEmotionFilter={noop}
          isEmotionSelected={isEmotionSelected}
          selectedEmotionLabel={EMOTIONS[emotionToggle]?.nameKr ?? ''}
          disabled
        />
      }
      mainSection={<DiaryPageSkeleton />}
    />
  );
};

export default DiaryLoading;
