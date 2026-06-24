'use client';

import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

//function
import { getDiaryByDate, getMonthlyDiaryData } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";

//styledComponent

//component
import AppPage from "@/common/components/layout/AppPage";
import Calendar from "@/common/components/ui/Calendar";
import Diary from "@/common/components/ui/Diary";
import { getTodayString } from "@/common/functions/getTodayString";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useRouter } from "next/navigation";
import EmptyCalendarDiary from "./_components/EmptyCalendarDiary";
import { renderCalendarPageContent } from "./_utils/renderCalendarPageContent";


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

  //get date diary data
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'date', date],
    queryFn: () => authAction(() => getDiaryByDate({ date })),
  });

  const { data: diaryDateDataMap } = useQuery({
    queryKey: ['diary', 'month', format(visibleMonth, 'yyyy-MM')],
    queryFn: () => authAction(() => getMonthlyDiaryData({ month: format(visibleMonth, 'yyyy-MM') })),
    select: (data) => { //select 옵션 덕분에 가공한 데이터도 캐시에 저장된다., 데이터를 가져올때마다 매번 가공 x
      const diaryDateDataMap: DiaryDateDataMap = {};
      data.forEach((e: any) => {
        diaryDateDataMap[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length, isVisible: e?.visible, emotionType: e?.emotion };
      });
      return diaryDateDataMap;
    }
  });

  const onClickDate = useCallback((selectedDate: Date) => {
    router.push(`/calendar?date=${format(selectedDate, 'yyyy-MM-dd')}`);
  }, [router]);
  const onGoToday = useCallback(() => {
    router.push(`/calendar?date=${getTodayString()}`);
  }, [router]);

  return (
    <AppPage
      contentVariant="fill"
      contentProps={{ $gap: 12, $mobileGap: 20, $tabletGap: 24, $paddingTop: 24 }}>
      <div className="min-h-[520px] flex-[1_1_0] overflow-visible max-[479px]:min-h-[380px]">
        <Calendar<DiaryDateData>
          isTouchGestureEnabled={true}
          variant="default"

          visibleMonth={visibleMonth}
          setVisibleMonth={setVisibleMonth}
          selectedDate={selectedDate}
          dateDataMap={diaryDateDataMap}
          renderDateContent={renderCalendarPageContent}

          onClickDate={onClickDate}
          onGoToday={onGoToday}
        />
      </div>
      <div key={date} className="shrink-0 animate-[diary-card-enter_300ms_ease-in]">
        {diaryData?.visible ? (
          <Diary type="small" diaryData={diaryData} />
        ) : (
          <EmptyCalendarDiary date={date} habits={diaryData?.Habits} />
        )}
      </div>
    </AppPage>
  );
};

export default CalendarView;
