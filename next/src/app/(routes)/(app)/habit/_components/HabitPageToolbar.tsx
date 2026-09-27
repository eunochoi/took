'use client';

import ToolbarButton from "@/common/components/ui/ToolbarButton";
import type { HabitSort } from "@/common/types/sort";
import { FaPlus } from "react-icons/fa6";
import { MdSort } from "react-icons/md";

import { IoMdStar, IoMdStarOutline } from "react-icons/io";


const HABIT_SORT_LABELS: Record<HabitSort, string> = {
  ASC: '과거순',
  DESC: '최신순',
  CUSTOM: '커스텀'
};

interface Props {
  onToggle: () => void;
  onTogglePriorityFirst: () => void;
  onAddHabit: () => void;
  sortValue: HabitSort;
  priorityFirst: boolean;
}

const HabitPageToolbar = ({ onToggle, onTogglePriorityFirst, onAddHabit, sortValue, priorityFirst }: Props) => {
  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-2'>
        <ToolbarButton onClick={onToggle}>
          <MdSort size={18} className="shrink-0" aria-hidden="true" />
          {HABIT_SORT_LABELS[sortValue]}
        </ToolbarButton>
        <ToolbarButton
          aria-label="중요도 우선"
          aria-pressed={priorityFirst}
          title="중요도 우선"
          onClick={onTogglePriorityFirst}
        >
          {priorityFirst ? <IoMdStar size={20} fill={priorityFirst ? 'currentColor' : 'none'} aria-hidden="true" /> : <IoMdStarOutline size={20} aria-hidden="false" />}
        </ToolbarButton>
      </div>
      <div className='flex gap-2'>
        <ToolbarButton aria-label="습관 추가" onClick={onAddHabit} title="습관 추가">
          <FaPlus size={18} aria-hidden="true" />
        </ToolbarButton>
      </div>
    </div>
  );
};

export default HabitPageToolbar;
