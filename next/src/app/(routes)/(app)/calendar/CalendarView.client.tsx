'use client';

import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

//function
import { authAction } from "@/common/auth/authAction";
import { getDiaryByDate, getMonthlyDiaryData } from "@/common/actions/diary";

//styledComponent

//component
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
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
    <PageWrapper>
      <ContentWrapper $gap={12} $mobileGap={20} $tabletGap={24} $flex="1 1 0" $paddingTop={24}>
        <CalendarSection>
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
        </CalendarSection>
        <DiaryWrapper key={date}>
          {diaryData?.visible ? (
            <Diary type="small" diaryData={diaryData} />
          ) : (
            <EmptyCalendarDiary date={date} habits={diaryData?.Habits} />
          )}
        </DiaryWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default CalendarView;

const CalendarSection = styled.div`
  flex: 1 1 0;
  min-height: 520px;
  overflow: visible;
  
  @media (max-width: 479px) {
    min-height: 480px;
  }
`;

const diaryCardEnter = keyframes`
  from {
    opacity: 0.7;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DiaryWrapper = styled.div`
  flex-shrink: 0;
  animation: ${diaryCardEnter} 300ms ease-in;
`;
