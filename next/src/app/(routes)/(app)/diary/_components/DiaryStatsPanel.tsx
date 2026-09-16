'use client';

import { getDiaryStats } from '@/common/actions/stats';
import { authAction } from '@/common/auth/authAction';
import { AppSurfaceCard } from '@/common/components/ui/AppSection/card';
import MonthlyBarChart from '@/common/components/views/HabitInfoView/MonthlyBarChart';
import { cn } from '@/common/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

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
      <AppSurfaceCard className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <button
            className="flex items-center text-2xl text-theme-text-tertiary"
            aria-label="이전 연도"
            onClick={() => onChangeYear(year - 1)}
            type="button"
          >
            <MdKeyboardArrowLeft />
          </button>
          <h2 className="text-lg font-semibold text-theme-text-primary">{year}년 기록</h2>
          <button
            className="flex items-center text-2xl text-theme-text-tertiary"
            aria-label="다음 연도"
            onClick={() => onChangeYear(year + 1)}
            type="button"
          >
            <MdKeyboardArrowRight />
          </button>
        </header>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-theme bg-theme-bg p-3">
            <span className="text-sm text-theme-text-tertiary">작성된 일기</span>
            <strong className="mt-1 block text-2xl text-theme-accent">
              {isPending ? '—' : `${data?.totalCount ?? 0}개`}
            </strong>
          </div>
          <div className="rounded-theme bg-theme-bg p-3">
            <span className="text-sm text-theme-text-tertiary">총 텍스트량</span>
            <strong className="mt-1 block text-2xl text-theme-accent">
              {isPending ? '—' : formattedTextLength}
            </strong>
          </div>
        </div>
      </AppSurfaceCard>

      <MonthlyBarChart
        className="desktop:[&>header>button]:text-lg desktop:[&>header>button]:font-semibold"
        data={data?.monthlyCount}
        year={String(year)}
        onCurrentYear={() => onChangeYear(new Date().getFullYear())}
        onNextYear={() => onChangeYear(year + 1)}
        onPrevYear={() => onChangeYear(year - 1)}
      />
    </aside>
  );
};

export default DiaryStatsPanel;
