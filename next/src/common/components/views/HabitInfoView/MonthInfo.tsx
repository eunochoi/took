'use client';

import { useQuery } from '@tanstack/react-query';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { getHabitMonthData } from '@/common/actions/habit/getHabitMonthData';
import { authAction } from '@/common/auth/authAction';
import { AppCardGrid } from '@/common/components/ui/AppSection/card';
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from '@/common/components/ui/AppSection/section';
import { AppStatCard, AppStatLabel, AppStatUnit, AppStatValue, AppStatValueWrapper } from '@/common/components/ui/AppSection/stat';
import { useMonthCalendar } from '@/common/components/ui/Calendar/useMonthCalendar';

import HabitMonthCalendar from './HabitMonthCalendar';

interface Props {
  habitId: string;
  today: string;
}

const MonthInfo = ({ habitId, today }: Props) => {
  const calendar = useMonthCalendar(today);
  const monthQuery = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', calendar.visibleMonth],
    queryFn: () => authAction(() => getHabitMonthData({ id: habitId, month: calendar.visibleMonth })),
    staleTime: 60_000,
  });
  const habitMonthData = monthQuery.data;
  const summary = habitMonthData?.summary;
  const displayToday = habitMonthData?.today ?? today;
  const stats = [
    { label: '실천 횟수', value: summary?.completedCount ?? '—', unit: '회' },
    { label: '놓친 실천', value: summary?.missedCount ?? '—', unit: '회' },
    { label: '실천율', value: summary?.completionRate == null ? '—' : summary.completionRate.toFixed(1), unit: '%' },
  ];

  return (
    <AppSection className="rounded-theme bg-theme-surface p-4 shadow-card">
      <AppSectionHeader className="!gap-1 !py-0">
        <AppSectionTitle className="shrink-0 !text-lg">월별 기록</AppSectionTitle>
        <div className="flex shrink-0 items-center text-theme-accent">
          <button type="button" onClick={calendar.goPreviousMonth} aria-label="이전 달" className="flex h-9 w-8 items-center justify-center">
            <MdKeyboardArrowLeft size={22} />
          </button>
          <button type="button" onClick={() => calendar.showDate(displayToday)} aria-label={`${calendar.monthLabel}, 이번 달로 이동`} className="px-1 py-2">
            <AppSectionMeta>{calendar.monthLabel}</AppSectionMeta>
          </button>
          <button type="button" onClick={calendar.goNextMonth} aria-label="다음 달" className="flex h-9 w-8 items-center justify-center">
            <MdKeyboardArrowRight size={22} />
          </button>
        </div>
      </AppSectionHeader>

      <AppCardGrid columns={3}>
        {stats.map((stat) => (
          <AppStatCard key={stat.label} className="!min-h-[100px] !bg-theme-bg !shadow-none">
            <AppStatLabel>{stat.label}</AppStatLabel>
            <AppStatValueWrapper>
              <AppStatValue>{stat.value}</AppStatValue>
              <AppStatUnit>{stat.unit}</AppStatUnit>
            </AppStatValueWrapper>
          </AppStatCard>
        ))}
      </AppCardGrid>

      <HabitMonthCalendar
        habitMonthData={habitMonthData}
        monthLabel={calendar.monthLabel}
        days={calendar.days}
        today={displayToday}
        isFetching={monthQuery.isFetching}
        onShowDate={calendar.showDate}
      />
    </AppSection>
  );
};

export default MonthInfo;
