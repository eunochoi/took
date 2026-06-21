import { getHabitYearlyStatus } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { addYears, format, isLeapYear, subYears } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import {
  AppCardGrid,
  AppSection,
  AppSectionHeader,
  AppSectionMeta,
  AppSectionTitle,
  AppStatCard,
  AppStatLabel,
  AppStatUnit,
  AppStatValue,
  AppStatValueWrapper,
} from "@/common/components/ui/AppSection";
import MonthlyBarChart from "./MonthlyBarChart";

interface Props {
  displayDate: Date;
  habitId: string;
  setDisplayDate: Dispatch<SetStateAction<Date>>
}

const YearInfo = ({ setDisplayDate, displayDate, habitId }: Props) => {
  const { data } = useQuery({
    queryKey: ['habit', 'id', habitId, 'year', format(displayDate, 'yyyy')],
    queryFn: () => authAction(() => getHabitYearlyStatus({ id: habitId, year: format(displayDate, 'yyyy') })),
  });
  const year = format(displayDate, 'yyyy');
  const count = data?.reduce((acc: number, cur: number) => (acc + cur), 0);
  const totalDays = isLeapYear(displayDate) ? 366 : 365;
  const completionRate = Math.round(((count ?? 0) / totalDays) * 100);

  const currentYear = () => {
    setDisplayDate(new Date());
  };
  const nextYear = () => {
    const temp = addYears(displayDate, 1);
    setDisplayDate(temp);
  };
  const preYear = () => {
    const temp = subYears(displayDate, 1);
    setDisplayDate(temp);
  };

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>연간 실천</AppSectionTitle>
        <AppSectionMeta>{year}년</AppSectionMeta>
      </AppSectionHeader>

      <AppCardGrid $columns={2}>
        <AppStatCard>
          <AppStatLabel>{year}년 완료</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{count ?? 0}</AppStatValue>
            <AppStatUnit>회</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>

        <AppStatCard>
          <AppStatLabel>연간 완료율</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{completionRate}</AppStatValue>
            <AppStatUnit>%</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>
      </AppCardGrid>

      <MonthlyBarChart
        data={data}
        year={year}
        onCurrentYear={currentYear}
        onNextYear={nextYear}
        onPrevYear={preYear}
      />
    </AppSection>);
}

export default YearInfo;
