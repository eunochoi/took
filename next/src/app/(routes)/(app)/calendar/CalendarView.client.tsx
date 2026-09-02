'use client';

import { useQuery } from "@tanstack/react-query";
import { addMonths, format, startOfMonth, subMonths } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

//function
import { getMonthlyDiaryData } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";


//component
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import Calendar from "@/common/components/ui/Calendar";
import TopButton from "@/common/components/ui/TopButton";
import { getTodayString } from "@/common/functions/getTodayString";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useRouter } from "next/navigation";
import SelectedDayInfo from "./_components/SelectedDayInfo";
import { renderCalendarPageContent } from "./_utils/renderCalendarPageContent";


import { FaArrowLeft, FaArrowRight } from "react-icons/fa";



interface CalendarViewProps {
  date: string; // 'yyyy-MM-dd'
}
interface DiaryDateData {
  habitsCount: number;
  isVisible: boolean;
  emotionType: number;
}
interface DiaryDateDataMap {
  [key: string]: DiaryDateData;
}

const CalendarView = ({ date }: CalendarViewProps) => {
  usePrefetchPage();
  const router = useRouter();

  const selectedDate = useMemo(() => parseLocalDate(date), [date]);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selectedDate));

  useEffect(() => {
    setVisibleMonth(startOfMonth(selectedDate));
  }, [selectedDate]);

  const { data: diaryDateDataMap } = useQuery({
    queryKey: ['diary', 'month', format(visibleMonth, 'yyyy-MM')],
    queryFn: () => authAction(() => getMonthlyDiaryData({ month: format(visibleMonth, 'yyyy-MM') })),
    select: (data) => { //select 옵션 덕분에 가공한 데이터도 캐시에 저장된다., 데이터를 가져올때마다 매번 가공 x
      const diaryDateDataMap: DiaryDateDataMap = {};
      data.forEach((e: any) => {
        diaryDateDataMap[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length ?? 0, isVisible: e?.visible, emotionType: e?.emotion };
      });
      return diaryDateDataMap;
    }
  });

  const headerDescription = useMemo(() => {
    const monthlyRecords = Object.values(diaryDateDataMap ?? {});
    const diaryCount = monthlyRecords.filter((record) => record.isVisible).length;
    const completedHabitCount = monthlyRecords.reduce((count, record) => count + record.habitsCount, 0);

    return `이번 달 일기 ${diaryCount}개 · 습관 완료 ${completedHabitCount}회`;
  }, [diaryDateDataMap]);

  const onClickDate = useCallback((selectedDate: Date) => {
    router.push(`/calendar?date=${format(selectedDate, 'yyyy-MM-dd')}`);
  }, [router]);

  const onGoPrevMonth = useCallback(() => {
    const prevMonth = subMonths(visibleMonth, 1);
    setVisibleMonth(prevMonth);
  }, [visibleMonth])
  const onGoNextMonth = useCallback(() => {
    const nextMonth = addMonths(visibleMonth, 1);
    setVisibleMonth(nextMonth);
  }, [visibleMonth])
  const onGoToday = useCallback(() => {
    setVisibleMonth(new Date());
    router.push(`/calendar?date=${getTodayString()}`);
  }, [router]);

  return (
    <AppPageLayout
      topButton={
        <>
          <TopButton
            size="auto"
            onClick={onGoPrevMonth}>
            <FaArrowLeft size={16} />
          </TopButton>
          <TopButton
            onClick={onGoToday}>
            <span>오늘</span>
          </TopButton>
          <TopButton
            size="auto"
            onClick={onGoNextMonth}>
            <FaArrowRight size={16} />
          </TopButton>
        </>
      }
      contentProps={{
        className: "flex-1 gap-3 max-tablet:gap-5 max-tablet:pt-6 tablet:gap-6 tablet:pt-6",
      }}>
      <div className="w-full shrink-0 overflow-visible">
        <Calendar<DiaryDateData>
          headerDescription={headerDescription}
          isTouchGestureEnabled={true}
          variant="default"

          visibleMonth={visibleMonth}
          setVisibleMonth={setVisibleMonth}
          selectedDate={selectedDate}
          dateDataMap={diaryDateDataMap}
          renderDateContent={renderCalendarPageContent}

          onClickDate={onClickDate}
        />
      </div>
      <div key={date} className="shrink-0">
        <SelectedDayInfo />
      </div>
    </AppPageLayout>
  );
};

export default CalendarView;
