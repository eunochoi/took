'use client';

import { SelectionPanel } from "@/common/components/ui/SelectionPanel";
import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdRefresh } from 'react-icons/md';
import MonthSelector from "./MonthSelector";

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: (params?: URLSearchParams) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthFilter = ({
  contentRef,
  isOpen,
  onClose,
  setSelectedYear,
  setSelectedMonth,
}: Props) => {
  const searchParams = useSearchParams();

  const [tempYear, setTempYear] = useState<number>(getDefaultYear());
  const [tempMonth, setTempMonth] = useState<number>(MONTH_UNSELECTED);

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  useEffect(() => {
    if (isOpen) {
      if (year) setTempYear(Number(year));
      else setTempYear(getDefaultYear());
      if (month) setTempMonth(Number(month));
      else setTempMonth(MONTH_UNSELECTED);
    }
  }, [isOpen, year, month]);

  const onSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('modal');

    if (tempYear !== getDefaultYear()) params.set('year', tempYear.toString());
    else params.delete('year');
    if (tempMonth !== MONTH_UNSELECTED) params.set('month', tempMonth.toString());
    else params.delete('month');

    setSelectedYear(tempYear);
    setSelectedMonth(tempMonth);
    onClose(params);

    setTimeout(() => {
      contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const onInitialize = () => {
    setTempYear(getDefaultYear());
    setTempMonth(MONTH_UNSELECTED);
  };

  return (
    <SelectionPanel
      isOpen={isOpen}
      title="기간 선택"
      minHeightClassName="max-[479px]:min-h-[400px]"
      resetLabel={<><MdRefresh />초기화</>}
      onClose={() => onClose()}
      onReset={onInitialize}
      onSubmit={onSubmit}
    >
      <MonthSelector
        selectedYear={tempYear}
        setSelectedYear={setTempYear}
        selectedMonth={tempMonth}
        setSelectedMonth={setTempMonth}
      />
    </SelectionPanel>
  );
};

export default MonthFilter;
