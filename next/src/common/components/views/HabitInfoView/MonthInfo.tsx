'use client';

import { useQuery } from '@tanstack/react-query';

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
    { label: '완료', value: summary?.completedCount ?? '—', unit: '회' },
    { label: '월 목표 달성률', value: summary?.completionRate == null ? '—' : summary.completionRate.toFixed(1), unit: '%' },
    { label: '놓친 실천', value: summary?.missedCount ?? '—', unit: '회' },
  ];

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>월간 실천</AppSectionTitle>
        <AppSectionMeta>{calendar.monthLabel}</AppSectionMeta>
      </AppSectionHeader>

      <AppCardGrid columns={3}>
        {stats.map((stat) => (
          <AppStatCard key={stat.label}>
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
        onCurrentMonth={() => calendar.showDate(displayToday)}
        onNextMonth={calendar.goNextMonth}
        onPrevMonth={calendar.goPreviousMonth}
        onShowDate={calendar.showDate}
      />
    </AppSection>
  );
};

export default MonthInfo;
