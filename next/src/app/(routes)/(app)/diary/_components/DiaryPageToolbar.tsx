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
  disabled?: boolean;
}

const DiaryPageToolbar = ({ openPeriodFilter, isPeriodSelected, selectedPeriodLabel, onToggle, sortValue, openEmotionFilter, isEmotionSelected, selectedEmotionLabel, disabled = false }: Props) => {
  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-2'>
        <ToolbarButton
          onClick={onToggle}
          disabled={disabled}
        >
          <MdSort size={18} className="shrink-0" aria-hidden="true" />
          {sortValue === 'DESC' ? '최신순' : '과거순'}
        </ToolbarButton>
      </div>
      <div className='flex gap-2'>
        <ToolbarButton
          aria-label="기간 필터"
          onClick={openPeriodFilter}
          disabled={disabled}
        >
          <MdCalendarMonth size={18} className="shrink-0" aria-hidden="true" />
          {isPeriodSelected && selectedPeriodLabel}
        </ToolbarButton>

        <ToolbarButton
          aria-label="감정 필터"
          onClick={openEmotionFilter}
          disabled={disabled}
        >
          <MdEmojiEmotions size={18} className="shrink-0" aria-hidden="true" />
          {isEmotionSelected && selectedEmotionLabel}
        </ToolbarButton>
      </div>
    </div>
  );
};

export default DiaryPageToolbar;
