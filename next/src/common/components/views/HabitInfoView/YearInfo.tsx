import { getHabitYearlyStatus } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { AppCardGrid } from "@/common/components/ui/AppSection/card";
import { AppSection } from "@/common/components/ui/AppSection/section";
import { AppStatCard, AppStatLabel, AppStatUnit, AppStatValue, AppStatValueWrapper } from "@/common/components/ui/AppSection/stat";
import { YearRecordHeader } from "@/common/components/ui/AppSection/YearRecordHeader";
import { useQuery } from "@tanstack/react-query";
import { addYears, format, isLeapYear, subYears } from "date-fns";
import { Dispatch, SetStateAction } from "react";
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
  const completionRate = (((count ?? 0) / totalDays) * 100).toFixed(1);

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
    <AppSection className="rounded-theme bg-theme-surface p-4 shadow-card">
      <YearRecordHeader
        year={Number(year)}
        onPreviousYear={preYear}
        onCurrentYear={currentYear}
        onNextYear={nextYear}
      />

      <AppCardGrid columns={2}>
        <AppStatCard className="!min-h-[100px] !bg-theme-bg !shadow-none">
          <AppStatLabel>실천 횟수</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{count ?? 0}</AppStatValue>
            <AppStatUnit>회</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>

        <AppStatCard className="!min-h-[100px] !bg-theme-bg !shadow-none">
          <AppStatLabel>실천율</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{completionRate}</AppStatValue>
            <AppStatUnit>%</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>
      </AppCardGrid>

      <MonthlyBarChart
        data={data}
      />
    </AppSection>);
}

export default YearInfo;
