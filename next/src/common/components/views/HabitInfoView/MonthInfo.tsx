import { authAction } from "@/common/auth/authAction";
import { getHabitMonthlyStatus } from "@/common/actions/habit";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays, endOfMonth, format, isAfter, isBefore, isSameMonth, parseISO, startOfDay, startOfMonth, subDays } from "date-fns";
import { notFound } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

import Calendar from "../../ui/Calendar";
import {
  CardGrid,
  InfoCard,
  InfoSection,
  SectionHeader,
  SectionMeta,
  SectionTitle,
  StatCard,
  StatLabel,
  StatUnit,
  StatValue,
  StatValueWrapper,
  SurfaceCard,
} from "./InfoSection";
import { renderHabitInfoPageContent } from "./_utils/renderHabitInfoPageContent";

interface Props {
  displayDate: Date;
  habitId: string;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
}

const MonthInfo = ({ displayDate, habitId, setDisplayDate }: Props) => {

  //only habit data by month, not include habit name or priority
  const { data, isError } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(displayDate, 'yyyy-MM')],
    queryFn: () => authAction(() => getHabitMonthlyStatus({ id: habitId, month: format(displayDate, 'yyyy-MM') }))
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  const monthStartDate = startOfMonth(displayDate);
  const monthEndDate = endOfMonth(displayDate);
  const today = startOfDay(new Date());
  const lastUneditableDate = subDays(today, 4);
  const totalDays = differenceInCalendarDays(monthEndDate, monthStartDate) + 1;
  const doneCount = data?.length ?? 0;
  const completionRate = ((doneCount / totalDays) * 100).toFixed(1);
  const habitDateDataMap: { [key: string]: boolean } = {};

  data?.forEach(({ date }) => {
    habitDateDataMap[format(parseISO(date), 'yyMMdd')] = true;
  });

  let missedTargetDays = 0;
  let missedDoneCount = 0;

  if (isBefore(monthEndDate, today)) {
    missedTargetDays = totalDays;
    missedDoneCount = doneCount;
  } else if (isSameMonth(displayDate, today) && !isBefore(lastUneditableDate, monthStartDate)) {
    missedTargetDays = differenceInCalendarDays(lastUneditableDate, monthStartDate) + 1;
    missedDoneCount = data?.filter(({ date }) => {
      const doneDate = startOfDay(parseISO(date));
      return !isAfter(doneDate, lastUneditableDate);
    }).length ?? 0;
  }

  const missedCount = Math.max(missedTargetDays - missedDoneCount, 0);

  return (
    <InfoSection>
      <SectionHeader>
        <SectionTitle>월간 실천</SectionTitle>
        <SectionMeta>{format(displayDate, 'yyyy년 M월')}</SectionMeta>
      </SectionHeader>

      <CardGrid $columns={3}>
        <StatCard>
          <StatLabel>{format(displayDate, 'M월 완료')}</StatLabel>
          <StatValueWrapper>
            <StatValue>{doneCount}</StatValue>
            <StatUnit>회</StatUnit>
          </StatValueWrapper>
        </StatCard>

        <StatCard>
          <StatLabel>{format(displayDate, 'M월 완료율')}</StatLabel>
          <StatValueWrapper>
            <StatValue>{completionRate}</StatValue>
            <StatUnit>%</StatUnit>
          </StatValueWrapper>
        </StatCard>

        <StatCard>
          <StatLabel>놓친 실천</StatLabel>
          <StatValueWrapper>
            <StatValue>{missedCount}</StatValue>
            <StatUnit>회</StatUnit>
          </StatValueWrapper>
        </StatCard>
      </CardGrid>

      <InfoCard>
        오늘 포함 최근 4일 동안만 습관 체크가 가능하며, 그보다 지난 날짜 중 완료하지 못한 횟수를 놓친 실천으로 계산해요.
      </InfoCard>

      <CalendarCard>
        <Calendar
          isTouchGestureEnabled={false}
          variant="compact"
          visibleMonth={displayDate}
          setVisibleMonth={setDisplayDate}
          dateDataMap={habitDateDataMap}
          renderDateContent={renderHabitInfoPageContent}
        />
      </CalendarCard>
    </InfoSection>
  );
}

export default MonthInfo;

const CalendarCard = styled(SurfaceCard)`
  min-height: 430px;

  @media (min-width:480px) {
    min-height: 500px;
  }
`;
