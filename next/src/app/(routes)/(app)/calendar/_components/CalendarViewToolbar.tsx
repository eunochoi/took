'use client';

import { MdEdit } from 'react-icons/md';

import ToolbarButton from '@/common/components/ui/ToolbarButton';

interface Props {
  openSelectedDiary: () => void;
  diaryActionLabel: string;
}

const CalendarViewToolbar = ({ openSelectedDiary, diaryActionLabel }: Props) => {
  return (
    <>
      <ToolbarButton onClick={openSelectedDiary}>
        <MdEdit size={18} className="shrink-0" aria-hidden="true" />
        <span>{diaryActionLabel}</span>
      </ToolbarButton>
    </>
  );
};

export default CalendarViewToolbar;
