'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { getHabitMonthData } from '@/common/actions/habit/getHabitMonthData';
import { authAction } from '@/common/auth/authAction';
import { AppCardGrid, AppSurfaceCard } from '@/common/components/ui/AppSection/card';
import { AppNoteCard } from '@/common/components/ui/AppSection/info';
import { AppSection, AppSectionHeader, AppSectionTitle } from '@/common/components/ui/AppSection/section';
import { AppStatCard, AppStatLabel, AppStatUnit, AppStatValue, AppStatValueWrapper } from '@/common/components/ui/AppSection/stat';
import { CalendarDay } from '@/common/components/ui/Calendar/CalendarDay';
import { CalendarGrid } from '@/common/components/ui/Calendar/CalendarGrid';
import { useMonthCalendar } from '@/common/components/ui/Calendar/useMonthCalendar';
import { cn } from '@/common/utils/cn';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';

interface Props {
  habitId: string;
  today: string;
}

const HabitMonthCalendar = ({ habitId, today }: Props) => {
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

      {habitMonthData && (
        <AppNoteCard>
          <p>{format(parseLocalDate(habitMonthData.createdDate), 'yyyy년 M월 d일')}에 만든 습관이에요. 생성일 이전 날짜는 통계에서 제외해요.</p>
          {habitMonthData.summary.periodStart && habitMonthData.summary.periodEnd ? (
            <p className="mt-2">
              이 달 목표 기간은 {format(parseLocalDate(habitMonthData.summary.periodStart), 'M월 d일')}부터{' '}
              {format(parseLocalDate(habitMonthData.summary.periodEnd), 'M월 d일')}까지, 총 {habitMonthData.summary.targetDays}일이에요.
              월 목표에는 아직 오지 않은 날짜도 포함해요.
            </p>
          ) : (
            <p className="mt-2">이 달은 습관 생성 전이어서 집계 대상이 없어요.</p>
          )}
          <p className="mt-2">
            기록은 오늘을 포함한 최근 4일만 수정할 수 있어요.
            수정 가능 기간보다 이전의 미완료 목표일을 놓친 실천으로 계산해요.
          </p>
        </AppNoteCard>
      )}

      {monthQuery.isPending && <p role="status" className="text-sm text-theme-text-tertiary">월간 실천 기록을 불러오고 있어요.</p>}
      {monthQuery.isError && (
        <p role="alert" className="text-sm text-theme-danger">
          월간 실천 기록을 불러오지 못했어요.{' '}
          <button type="button" className="underline" onClick={() => void monthQuery.refetch()}>다시 시도</button>
        </p>
      )}

      <AppSurfaceCard>
        <header className="mb-2 flex items-center justify-between">
          <button type="button" className="p-2 text-theme-text-secondary" onClick={calendar.goPreviousMonth} aria-label="이전 달">
            <MdKeyboardArrowLeft size={22} />
          </button>
          <button
            type="button"
            className="font-title text-xl font-bold text-theme-accent"
            onClick={() => calendar.showDate(displayToday)}
            aria-label={`${calendar.monthLabel}, 이번 달로 이동`}
          >
            {calendar.monthLabel}
          </button>
          <button type="button" className="p-2 text-theme-text-secondary" onClick={calendar.goNextMonth} aria-label="다음 달">
            <MdKeyboardArrowRight size={22} />
          </button>
        </header>

        <CalendarGrid aria-busy={monthQuery.isFetching} aria-label={`${calendar.monthLabel} 습관 실천 달력`}>
          {calendar.days.map((day) => {
            const isCompleted = !day.isOutsideMonth && habitMonthData?.daysByDate[day.dateKey] === true;
            const isBeforeCreation = habitMonthData ? day.dateKey < habitMonthData.createdDate : false;
            const isFuture = day.dateKey > displayToday;
            const isCreationDay = !day.isOutsideMonth && day.dateKey === habitMonthData?.createdDate;

            return (
              <CalendarDay
                key={day.dateKey}
                day={day}
                isToday={day.dateKey === displayToday}
                className={cn(!day.isOutsideMonth && (isBeforeCreation || isFuture) && 'opacity-40')}
                onClick={day.isOutsideMonth ? () => calendar.showDate(day.dateKey) : undefined}
                label={[
                  day.dateKey,
                  isCreationDay ? '습관 생성일' : '',
                  isCompleted ? '완료 기록 있음' : '',
                  isBeforeCreation ? '생성일 이전, 통계 제외' : '',
                  isFuture ? '미래 날짜' : '',
                ].filter(Boolean).join(', ')}
              >
                <span className={cn('flex h-7 w-7 items-center justify-center rounded-full', isCompleted && 'bg-theme-accent text-theme-text-on-accent')}>
                  {day.dayNumber}
                </span>
                {isCreationDay && <span className="absolute bottom-0.5 text-[10px] text-theme-accent">시작</span>}
              </CalendarDay>
            );
          })}
        </CalendarGrid>
      </AppSurfaceCard>
    </AppSection>
  );
};

export default HabitMonthCalendar;
