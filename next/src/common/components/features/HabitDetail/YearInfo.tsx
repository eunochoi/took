import { getHabitYearlyStatus } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { AppSection } from "@/common/components/ui/AppSection/section";
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
    <AppSection className="py-6 px-2">
      <YearRecordHeader
        year={Number(year)}
        onPreviousYear={preYear}
        onCurrentYear={currentYear}
        onNextYear={nextYear}
      />

      <div className="grid grid-cols-2 divide-x divide-theme-border/60 py-3 text-center">
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">실천 횟수</span>
          <strong className="font-title text-2xl text-theme-accent">
            {count ?? 0}<span className="ml-0.5 text-sm font-semibold text-theme-text-secondary">회</span>
          </strong>
        </div>
        <div className="flex min-w-0 flex-col gap-1 px-2">
          <span className="text-sm text-theme-text-secondary">실천율</span>
          <strong className="font-title text-2xl text-theme-accent">
            {completionRate}<span className="ml-0.5 text-sm font-semibold text-theme-text-secondary">%</span>
          </strong>
        </div>
      </div>

      <MonthlyBarChart
        data={data}
      />
    </AppSection>);
}

export default YearInfo;
