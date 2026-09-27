'use client';

import { getDiaryStats } from '@/common/actions/stats';
import { authAction } from '@/common/auth/authAction';
import MonthlyBarChart from '@/common/components/features/HabitDetail/MonthlyBarChart';
import { YearRecordHeader } from '@/common/components/ui/YearRecordHeader';
import { cn } from '@/common/utils/cn';
import { useQuery } from '@tanstack/react-query';

interface Props {
  className?: string;
  year: number;
  onChangeYear: (year: number) => void;
}

const DiaryStatsPanel = ({ year, onChangeYear, className }: Props) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['stats', 'diary', year],
    queryFn: () => authAction(() => getDiaryStats({ year })),
  });

  return (
    <aside className={cn("hidden w-full flex-col gap-3 desktop:flex desktop:sticky desktop:top-[max(112px,calc(var(--page-toolbar-height,0px)+24px))] desktop:self-start", className)}>
      <YearRecordHeader
        year={year}
        onPreviousYear={() => onChangeYear(year - 1)}
        onCurrentYear={() => onChangeYear(new Date().getFullYear())}
        onNextYear={() => onChangeYear(year + 1)}
      />
      <div className="text-nowrap grid grid-cols-3 divide-x divide-theme-border/60 py-3 text-center">
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">작성된 일기</span>
          <strong className="font-title text-2xl text-theme-accent">
            {isPending || isError ? '—' : `${data?.totalCount ?? 0}개`}
          </strong>
        </div>
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">현재 연속 기록</span>
          <strong className="font-title text-2xl text-theme-accent">
            {isPending || isError ? '—' : `${data?.currentStreak.days ?? 0}일`}
          </strong>
        </div>
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">역대 최고 기록</span>
          <strong className="font-title text-2xl text-theme-accent">
            {isPending || isError ? '—' : `${data?.longestStreak.days ?? 0}일`}
          </strong>
        </div>
      </div>
      {isError && (
        <div className="text-center text-sm text-theme-text-secondary">
          기록을 불러오지 못했어요.{' '}
          <button type="button" className="text-theme-accent" onClick={() => { void refetch(); }}>다시 시도</button>
        </div>
      )}
      {data && !isError && (
        <MonthlyBarChart
          data={data.monthlyCount}
          rootClassName="!p-0"
        />
      )}
    </aside>
  );
};

export default DiaryStatsPanel;
