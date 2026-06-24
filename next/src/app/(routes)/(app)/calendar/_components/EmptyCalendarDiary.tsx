'use client';

import DiaryAddButton from '@/common/components/ui/Diary/DiaryAddButton';
import DiaryCardShell from '@/common/components/ui/Diary/DiaryCardShell';
import DiaryHabits from '@/common/components/ui/Diary/DiaryHabits';
import type { DiaryHabit } from '@/common/types/diary';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  date: string;
  habits?: DiaryHabit[];
}

const EmptyCalendarDiary = ({ date, habits = [] }: Props) => {
  const dateForDisplay = parseLocalDate(date);
  const formattedDate = format(dateForDisplay, 'yyyy년 M월 d일');
  const day = format(dateForDisplay, 'eeee', { locale: ko });

  return (
    <DiaryCardShell $type="small">
      <div className="box-border flex h-full w-full flex-col justify-between">
        <div className="flex w-full items-center justify-between px-3.5 pt-3.5">
          <div className="flex items-center gap-3">
            <span className="text-xl font-medium text-grey-title">{formattedDate}</span>
            <span className="text-xl font-medium text-gray-500">{day}</span>
          </div>
        </div>
        <DiaryAddButton date={date} />
        <DiaryHabits habits={habits} />
      </div>
    </DiaryCardShell>
  );
};

export default EmptyCalendarDiary;
