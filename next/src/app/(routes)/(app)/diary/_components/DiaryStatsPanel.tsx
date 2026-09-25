'use client';

import { getDiaryStats } from '@/common/actions/stats';
import { authAction } from '@/common/auth/authAction';
import { YearRecordHeader } from '@/common/components/ui/AppSection/YearRecordHeader';
import MonthlyBarChart from '@/common/components/views/HabitInfoView/MonthlyBarChart';
import { cn } from '@/common/utils/cn';
import { useQuery } from '@tanstack/react-query';

interface Props {
  className?: string;
  year: number;
  onChangeYear: (year: number) => void;
}

const DiaryStatsPanel = ({ year, onChangeYear, className }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['stats', 'diary', year],
    queryFn: () => authAction(() => getDiaryStats({ year })),
  });

  const formattedTextLength = (data?.totalTextLength ?? 0) < 1000
    ? `${data?.totalTextLength ?? 0}자`
    : `${((data?.totalTextLength ?? 0) / 1000).toFixed(1)}천자`;

  return (
    <aside className={cn("hidden w-full flex-col gap-3 desktop:flex desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:self-start", className)}>
      <YearRecordHeader
        year={year}
        onPreviousYear={() => onChangeYear(year - 1)}
        onCurrentYear={() => onChangeYear(new Date().getFullYear())}
        onNextYear={() => onChangeYear(year + 1)}
      />
      <div className="grid grid-cols-2 divide-x divide-theme-border/60 py-3 text-center">
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">작성된 일기</span>
          <strong className="font-title text-3xl text-theme-accent">
            {isPending ? '—' : `${data?.totalCount ?? 0}개`}
          </strong>
        </div>
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">총 텍스트</span>
          <strong className="font-title text-3xl text-theme-accent">
            {isPending ? '—' : formattedTextLength}
          </strong>
        </div>
      </div>
      <MonthlyBarChart
        data={data?.monthlyCount}
        rootClassName="!p-0"
      />
    </aside>
  );
};

export default DiaryStatsPanel;
