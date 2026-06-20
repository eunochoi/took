'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useState } from "react";
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
import { useRouter } from "next/navigation";
import EmptyCalendarDiary from "./_components/EmptyCalendarDiary";
import { RenderDateContent } from "./_utils/CalendarInfoDateContent";


interface CalendarViewProps {
  date: string; // 'yyyy-MM-dd'
}
interface MonthCalendarDataType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}

const CalendarView = ({ date }: CalendarViewProps) => {
  usePrefetchPage();
  const router = useRouter();

  const [displayDate, setDisplayDate] = useState(new Date());

  //get date diary data
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'date', date],
    queryFn: () => authAction(() => getDiaryByDate({ date })),
  });

  const { data: monthCalendarData } = useQuery({
    queryKey: ['diary', 'month', format(displayDate, 'yyyy-MM')],
    queryFn: () => authAction(() => getMonthlyDiaryData({ month: format(displayDate, 'yyyy-MM') })),
    select: (data) => { //select 옵션 덕분에 가공한 데이터도 캐시에 저장된다., 데이터를 가져올때마다 매번 가공 x
      const monthCalendarData: MonthCalendarDataType = {};
      data.forEach((e: any) => {
        monthCalendarData[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length, isVisible: e?.visible, emotionType: e?.emotion };
      });
      return monthCalendarData;
    }
  });

  const onClickMonthTitle = () => {
    router.push(`/calendar?date=${getTodayString()}`);
  }
  const onClickDate = useCallback((date: Date) => {
    router.push(`calendar?date=${format(date, 'yyyy-MM-dd')}`);
  }, [router]);

  return (
    <PageWrapper>
      <ContentWrapper $gap={12} $mobileGap={20} $tabletGap={24} $flex="1 1 0" $paddingTop={24}>
        <CalendarPageCalendar
          isTouchGestureEnabled={true}
          isDateSelectionEnabled={true}
          headerTitlePosition="start"
          headerSize="large"

          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          monthlyData={monthCalendarData}
          RenderDateContent={RenderDateContent}

          onClickMonthTitle={onClickMonthTitle}
          onClickDate={onClickDate}
        />
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

const CalendarPageCalendar = styled(Calendar)`
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
