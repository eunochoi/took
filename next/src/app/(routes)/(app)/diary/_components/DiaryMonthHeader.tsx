'use client';

import { getDiaryHabitMonthData } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import { EMOTIONS } from '@/common/constants/emotions';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';

interface Props {
  month: string;
}

const DiaryMonthHeader = ({ month }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['diary-habit', 'month', month],
    queryFn: () => authAction(() => getDiaryHabitMonthData({ month })),
  });

  const emotionCounts = Array(EMOTIONS.length).fill(0) as number[];
  Object.values(data?.daysByDate ?? {}).forEach((day) => {
    if (day?.hasDiary && day.emotion !== null) emotionCounts[day.emotion] += 1;
  });

  return (
    <header className="mb-3 mt-5 w-full first:mt-2 max-tablet:w-[90dvw]">
      <div className='flex flex-between items-center'>
        <h2 className="text-3xl font-title font-bold text-theme-accent">
          {format(parseLocalDate(`${month}-01`), 'yyyy년 M월')}
        </h2>
      </div>

      <div className="mt-2 flex flex-col items-start gap-1.5 text-sm text-theme-text-tertiary">
        {!isPending && data && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{`작성된 일기 ${data?.summary.diaryCount ?? 0}개,`}</span>
            {EMOTIONS.map((emotion) => {
              const count = emotionCounts[emotion.id];
              if (count === 0) return null;

              return (
                <span key={emotion.id} className="inline-flex items-center gap-1 whitespace-nowrap">
                  <Image src={emotion.src} alt="" width={20} height={20} />
                  <span>{emotion.nameKr} {count}개</span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default DiaryMonthHeader;
