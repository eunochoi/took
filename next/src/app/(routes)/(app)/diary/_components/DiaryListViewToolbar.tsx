'use client';

import type { DiarySort } from '@/common/types/sort';

import ToolbarButton from "@/common/components/ui/ToolbarButton";
import { MdCalendarMonth, MdEmojiEmotions, MdSort } from 'react-icons/md';

interface Props {
  openPeriodFilter: () => void;
  isPeriodSelected: boolean;
  selectedPeriodLabel: string;
  onToggle: () => void;
  sortValue: DiarySort;
  openEmotionFilter: () => void;
  isEmotionSelected: boolean;
  selectedEmotionLabel: string;
}

const DiaryListViewToolbar = ({ openPeriodFilter, isPeriodSelected, selectedPeriodLabel, onToggle, sortValue, openEmotionFilter, isEmotionSelected, selectedEmotionLabel }: Props) => {
  return (
    <>
      <ToolbarButton
        aria-label="기간 필터"
        onClick={openPeriodFilter}
      >
        <MdCalendarMonth size={18} className="shrink-0" aria-hidden="true" />
        {isPeriodSelected ? selectedPeriodLabel : "전체 기간"}
      </ToolbarButton>
      <ToolbarButton
        onClick={onToggle}
      >
        <MdSort size={18} className="shrink-0" aria-hidden="true" />
        {sortValue === 'DESC' ? '최신순' : '과거순'}
      </ToolbarButton>
      <ToolbarButton
        aria-label="감정 필터"
        onClick={openEmotionFilter}
      >
        <MdEmojiEmotions size={18} className="shrink-0" aria-hidden="true" />
        {isEmotionSelected && selectedEmotionLabel}
      </ToolbarButton>
    </>
  );
};

export default DiaryListViewToolbar;
