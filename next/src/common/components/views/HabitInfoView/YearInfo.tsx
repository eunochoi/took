import { getHabitYearlyStatus } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { addYears, format, isLeapYear, subYears } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import {
  CardGrid,
  InfoSection,
  SectionHeader,
  SectionMeta,
  SectionTitle,
  StatCard,
  StatLabel,
  StatUnit,
  StatValue,
  StatValueWrapper,
} from "./InfoSection";
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
    <InfoSection>
      <SectionHeader>
        <SectionTitle>연간 실천</SectionTitle>
        <SectionMeta>{year}년</SectionMeta>
      </SectionHeader>

      <CardGrid $columns={2}>
        <StatCard>
          <StatLabel>{year}년 완료</StatLabel>
          <StatValueWrapper>
            <StatValue>{count ?? 0}</StatValue>
            <StatUnit>회</StatUnit>
          </StatValueWrapper>
        </StatCard>

        <StatCard>
          <StatLabel>연간 완료율</StatLabel>
          <StatValueWrapper>
            <StatValue>{completionRate}</StatValue>
            <StatUnit>%</StatUnit>
          </StatValueWrapper>
        </StatCard>
      </CardGrid>

      <MonthlyBarChart
        data={data}
        year={year}
        onCurrentYear={currentYear}
        onNextYear={nextYear}
        onPrevYear={preYear}
      />
    </InfoSection>);
}

export default YearInfo;
