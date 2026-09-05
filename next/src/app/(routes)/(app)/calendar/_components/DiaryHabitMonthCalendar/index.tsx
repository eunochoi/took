'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addMonths, format } from 'date-fns';
import Image from 'next/image';
import { useEffect } from 'react';

import { getDiaryHabitMonthData } from '@/common/actions/diary/getDiaryHabitMonthData';
import { authAction } from '@/common/auth/authAction';
import { CalendarDay } from '@/common/components/ui/Calendar/CalendarDay';
import { CalendarGrid } from '@/common/components/ui/Calendar/CalendarGrid';
import { CalendarDayModel, useMonthCalendar } from '@/common/components/ui/Calendar/useMonthCalendar';
import { useMonthSwipe } from '@/common/components/ui/Calendar/useMonthSwipe';
import { Emotion, EMOTIONS } from '@/common/constants/emotions';
import type { DateKey, DiaryHabitDayData } from '@/common/types/calendar';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import DiaryHabitMonthCalendarHeader from './DiaryHabitMonthCalendarHeader';

const badgeClass = "bg-theme-accent flex h-[20px] w-[20px] items-center justify-center rounded-[50%_45%_55%_50%/60%_50%_50%_55%] text-xs font-semibold text-theme-text-on-accent";

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
    <section className="flex w-full min-w-0 shrink-0 flex-col gap-3">
      <div className="flex min-w-0 flex-col gap-3">
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
      </div>

      <div className="rounded-theme bg-theme-surface p-2 shadow-theme-section backdrop-blur-xl tablet:p-3">
        <CalendarGrid {...swipeProps} aria-label={`${calendar.monthLabel} 일기와 습관 달력`} aria-busy={monthQuery.isFetching}>
          {calendar.days.map((day: CalendarDayModel) => {
            const record: DiaryHabitDayData | undefined = day.isOutsideMonth ? undefined : diaryHabitMonthData?.daysByDate[day.dateKey];
            const emotion: Emotion | undefined = record?.emotion == null ? undefined : EMOTIONS[record.emotion];
            const habitCount = record?.completedHabitCount ?? 0;

            return (
              <CalendarDay
                key={day.dateKey}
                day={day}
                isToday={day.dateKey === today}
                isSelected={day.dateKey === selectedDate}
                onClick={() => selectDate(day.dateKey)}
                label={[
                  day.dateKey,
                  record?.hasDiary ? '일기 있음' : '',
                  emotion?.nameKr ?? '',
                  habitCount > 0 ? `습관 ${habitCount}개 완료` : '',
                ].filter(Boolean).join(', ')}
              >
                {record?.hasDiary && emotion ? (
                  <div className="relative z-[2] w-full h-full flex justify-center items-end pb-[2px]">
                    <Image className="h-auto w-[90%]" src={emotion.src} alt={emotion.nameKr} />
                    {habitCount > 0 && (
                      <div className={`${badgeClass} absolute right-[2px] top-[2px] z-10`}>
                        {habitCount}
                      </div>
                    )}
                  </div>
                ) : habitCount > 0 ? (
                  <div className={`${badgeClass} scale-[1.3]`}>{habitCount}</div>
                ) : (
                  <span className="date">{day.dayNumber}</span>
                )}
              </CalendarDay>
            );
          })}
        </CalendarGrid>
      </div>
    </section>
  );
};

export default DiaryHabitMonthCalendar;
