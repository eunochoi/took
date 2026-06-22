import { authAction } from "@/common/auth/authAction";
import { getHabitMonthlyStatus } from "@/common/actions/habit";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays, endOfMonth, format, isAfter, isBefore, isSameMonth, parseISO, startOfDay, startOfMonth, subDays } from "date-fns";
import { notFound } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

import Calendar from "../../ui/Calendar";
import {
  AppCardGrid,
  AppNoteCard,
  AppSection,
  AppSectionHeader,
  AppSectionMeta,
  AppSectionTitle,
  AppStatCard,
  AppStatLabel,
  AppStatUnit,
  AppStatValue,
  AppStatValueWrapper,
  AppSurfaceCard,
} from "@/common/components/ui/AppSection";
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
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>월간 실천</AppSectionTitle>
        <AppSectionMeta>{format(displayDate, 'yyyy년 M월')}</AppSectionMeta>
      </AppSectionHeader>

      <AppCardGrid $columns={3}>
        <AppStatCard>
          <AppStatLabel>{format(displayDate, 'M월 완료')}</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{doneCount}</AppStatValue>
            <AppStatUnit>회</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>

        <AppStatCard>
          <AppStatLabel>{format(displayDate, 'M월 완료율')}</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{completionRate}</AppStatValue>
            <AppStatUnit>%</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>

        <AppStatCard>
          <AppStatLabel>놓친 실천</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{missedCount}</AppStatValue>
            <AppStatUnit>회</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>
      </AppCardGrid>

      <AppNoteCard>
        오늘 포함 최근 4일 동안만 습관 체크가 가능하며, 그보다 지난 날짜 중 완료하지 못한 횟수를 놓친 실천으로 계산해요.
      </AppNoteCard>

      <AppSurfaceCard className="min-h-[430px] min-[480px]:min-h-[500px]">
        <Calendar
          isTouchGestureEnabled={false}
          variant="compact"
          visibleMonth={displayDate}
          setVisibleMonth={setDisplayDate}
          dateDataMap={habitDateDataMap}
          renderDateContent={renderHabitInfoPageContent}
        />
      </AppSurfaceCard>
    </AppSection>
  );
}

export default MonthInfo;
