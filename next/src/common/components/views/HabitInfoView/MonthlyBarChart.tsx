import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styled from "styled-components";

import { SurfaceCard } from "./InfoSection";

interface Props {
  data?: number[];
  year: string;
  onCurrentYear: () => void;
  onNextYear: () => void;
  onPrevYear: () => void;
}

const MonthlyBarChart = ({ data, year, onCurrentYear, onNextYear, onPrevYear }: Props) => {
  const maxCount = Math.max(...(data ?? [1]), 1);

  return (
    <ChartCard>
      <ChartHeader>
        <button onClick={onPrevYear}><MdKeyboardArrowLeft /></button>
        <ChartTitle as="button" onClick={onCurrentYear}>
          {year}년
        </ChartTitle>
        <button onClick={onNextYear}><MdKeyboardArrowRight /></button>
      </ChartHeader>

      <Chart>
        {[...Array(12)].map((_, i: number) =>
          <BarWrapper key={'month' + i + 1}>
            <BarArea>
              <BarCount>{data && data[i] > 0 && data[i]}</BarCount>
              <Bar $height={data && data[i] > 0 ? Math.max((data[i] / maxCount) * 160, 8) : 4} $hasValue={!!data && data[i] > 0} />
            </BarArea>
            <BarLabel>{i + 1}</BarLabel>
          </BarWrapper>)}
      </Chart>
    </ChartCard>);
}

export default MonthlyBarChart;

const ChartCard = styled(SurfaceCard)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChartHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;

  button{
    display: flex;
    color: grey;
    padding: 3px;
  }
`;

const ChartTitle = styled.span`
  text-transform: capitalize;
  color: rgb(var(--greyTitle)) !important;
  font-family: 'BMJUA';
  font-size: 20px;
`;

const Chart = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const BarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

const BarArea = styled.div`
  width: 100%;
  height: 178px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

const BarCount = styled.div`
  min-height: 18px;
  font-size: 13px;
  color: rgba(var(--greyTitle), 0.6);
`;

const Bar = styled.div<{ $height: number; $hasValue: boolean }>`
  width: 60%;
  max-width: 20px;
  min-height: 4px;
  height: ${({ $height }) => $height}px;
  border-radius: 3px;
  background-color: ${({ $hasValue, theme }) =>
    $hasValue ? (theme.themeColor ?? '#979FC7') : 'rgba(var(--greyTitle), 0.15)'};
  transition: height 0.3s ease;
`;

const BarLabel = styled.span`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.6);
`;
