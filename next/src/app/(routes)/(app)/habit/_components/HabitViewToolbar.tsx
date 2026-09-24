'use client';

import ToolbarButton from "@/common/components/ui/ToolbarButton";
import type { HabitSort } from "@/common/types/sort";
import { MdAdd, MdSort } from 'react-icons/md';

const HABIT_SORT_LABELS: Record<HabitSort, string> = {
  ASC: '과거순',
  DESC: '최신순',
  PRIORITY: '중요도',
  CUSTOM: '커스텀'
};

interface Props {
  onToggle: () => void;
  onAddHabit: () => void;
  sortValue: HabitSort;
}

const HabitViewToolbar = ({ onToggle, onAddHabit, sortValue }: Props) => {
  return (
    <>
      <ToolbarButton onClick={onToggle}>
        <MdSort size={18} className="shrink-0" aria-hidden="true" />
        {HABIT_SORT_LABELS[sortValue]}
      </ToolbarButton>
      <ToolbarButton aria-label="습관 추가" onClick={onAddHabit} title="습관 추가">
        <MdAdd className="text-xl" aria-hidden="true" />
      </ToolbarButton>
    </>
  );
};

export default HabitViewToolbar;
