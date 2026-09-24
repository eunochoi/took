'use client';

import EmotionImage from '@/common/components/ui/EmotionImage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addMonths, format } from 'date-fns';
import type { CSSProperties } from 'react';
import { useEffect } from 'react';

import { getDiaryHabitMonthData } from '@/common/actions/diary/getDiaryHabitMonthData';
import { authAction } from '@/common/auth/authAction';
import { AppSurfaceCard } from '@/common/components/ui/AppSection/card';
import { CalendarDay } from '@/common/components/ui/Calendar/CalendarDay';
import { CalendarGrid } from '@/common/components/ui/Calendar/CalendarGrid';
import { CalendarDayModel, useMonthCalendar } from '@/common/components/ui/Calendar/useMonthCalendar';
import { useMonthSwipe } from '@/common/components/ui/Calendar/useMonthSwipe';
import { CALENDAR_BADGE_SCALE } from '@/common/constants/calendar';
import { Emotion, EMOTIONS } from '@/common/constants/emotions';
import type { DateKey, DiaryHabitDayData } from '@/common/types/calendar';
import { cn } from '@/common/utils/cn';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import DiaryHabitMonthCalendarHeader from './DiaryHabitMonthCalendarHeader';

interface Props {
  today: DateKey;
  selectedDate: DateKey;
  onSelectDate: (date: DateKey) => void;
}

const DiaryHabitMonthCalendar = ({ today, selectedDate, onSelectDate }: Props) => {
  const queryClient = useQueryClient();
  const calendar = useMonthCalendar(selectedDate);
  const monthQuery = useQuery({
    queryKey: ['diary-habit', 'month', calendar.visibleMonth],
    queryFn: () => authAction(() => getDiaryHabitMonthData({ month: calendar.visibleMonth })),
    staleTime: 60_000,
  });
  const diaryHabitMonthData = monthQuery.data;
  const swipeProps = useMonthSwipe(calendar.goPreviousMonth, calendar.goNextMonth);

  useEffect(() => {
    const monthStart = parseLocalDate(`${calendar.visibleMonth}-01`);

    for (const offset of [-1, 1]) {
      const month = format(addMonths(monthStart, offset), 'yyyy-MM');
      void queryClient.prefetchQuery({
        queryKey: ['diary-habit', 'month', month],
        staleTime: 60_000,
        retry: false,
        queryFn: async () => {
          const result = await getDiaryHabitMonthData({ month });
          if (!result.ok) throw new Error(result.message);
          return result.data;
        },
      });
    }
  }, [calendar.visibleMonth, queryClient]);

  const selectDate = (date: DateKey) => {
    calendar.showDate(date);
    onSelectDate(date);
  };

  return (
    <section className="flex w-full min-w-0 shrink-0 flex-col">
      <AppSurfaceCard className="flex min-w-0 flex-col gap-3 shadow-theme-section desktop:self-start">
        <DiaryHabitMonthCalendarHeader
          monthLabel={calendar.monthLabel}
          diaryCount={diaryHabitMonthData?.summary.diaryCount}
          completedHabitCount={diaryHabitMonthData?.summary.completedHabitCount}
          onPreviousMonth={calendar.goPreviousMonth}
          onNextMonth={calendar.goNextMonth}
          onToday={() => selectDate(today)}
        />

        {monthQuery.isError && (
          <p className="text-sm text-theme-danger" role="alert">
            월 기록을 불러오지 못했어요.{' '}
            <button type="button" onClick={() => void monthQuery.refetch()} className="underline">다시 시도</button>
          </p>
        )}

        <CalendarGrid {...swipeProps} aria-label={`${calendar.monthLabel} 일기와 습관 달력`} aria-busy={monthQuery.isFetching}>
          {calendar.days.map((day: CalendarDayModel) => {
            const record: DiaryHabitDayData | undefined = day.isOutsideMonth ? undefined : diaryHabitMonthData?.daysByDate[day.dateKey];
            const emotion: Emotion | undefined = record?.emotion == null ? undefined : EMOTIONS[record.emotion];
            const habitCount = record?.completedHabitCount ?? 0;
            const hasDecoration = Boolean(record?.hasDiary && emotion) || habitCount > 0;
            const isSelected = day.dateKey === selectedDate;

            return (
              <CalendarDay
                key={day.dateKey}
                day={day}
                isToday={day.dateKey === today}
                isSelected={isSelected}
                onClick={() => selectDate(day.dateKey)}
                label={[
                  day.dateKey,
                  record?.hasDiary ? '일기 있음' : '',
                  emotion?.nameKr ?? '',
                  habitCount > 0 ? `습관 ${habitCount}개 완료` : '',
                ].filter(Boolean).join(', ')}
              >
                <span>{!hasDecoration && day.dayNumber}</span>
                <span className="relative w-[90%] tablet:w-[75%] h-[auto] flex items-center justify-center">
                  {record?.hasDiary && emotion && (
                    <EmotionImage
                      emotion={emotion}
                      alt={`${day.dateKey}[${emotion.name}]`}
                      className={cn(
                        'object-contain',
                        isSelected && 'motion-safe:animate-calendar-selected-bounce',
                      )} />
                  )}
                  {habitCount > 0 && (
                    <span className={cn(
                      "flex items-center justify-center rounded-[50%_45%_55%_50%/60%_50%_50%_55%] bg-theme-accent h-[24px] w-[24px] text-sm font-semibold text-theme-text-on-accent",
                      emotion ? "absolute -top-2 -right-2" : "[--calendar-badge-scale:1.3] scale-[var(--calendar-badge-scale)]",
                      isSelected && (emotion
                        ? 'motion-safe:animate-calendar-selected-bounce'
                        : 'motion-safe:animate-calendar-selected-badge-bounce'),
                    )}
                    style={!emotion ? { '--calendar-badge-scale': CALENDAR_BADGE_SCALE } as CSSProperties : undefined}>
                      {habitCount}
                    </span>
                  )}
                </span>
              </CalendarDay>
            );
          })}
        </CalendarGrid>
      </AppSurfaceCard>
    </section>
  );
};

export default DiaryHabitMonthCalendar;
