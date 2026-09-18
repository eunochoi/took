'use client';

import { Modal } from "@/common/components/ui/Modal";
import { SelectionPanel } from "@/common/components/ui/SelectionPanel";
import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdRefresh } from 'react-icons/md';
import MonthSelector from "./MonthSelector";

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  onClose: (params?: URLSearchParams) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthFilter = ({
  contentRef,
  onClose,
  setSelectedYear,
  setSelectedMonth,
}: Props) => {
  const searchParams = useSearchParams();

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const [tempYear, setTempYear] = useState<number>(() => year ? Number(year) : getDefaultYear());
  const [tempMonth, setTempMonth] = useState<number>(() => month ? Number(month) : MONTH_UNSELECTED);

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
    <Modal
      ariaLabel="기간 선택"
      onClose={() => onClose()}
      overlayClassName="z-[98] tablet:z-[105]"
      variant={{ base: 'bottom', tablet: 'bottom', desktop: 'bottom' }}
    >
      <SelectionPanel
        title="기간 선택"
        resetLabel={<><MdRefresh />초기화</>}
        onCancel={() => onClose()}
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
    </Modal>
  );
};

export default MonthFilter;
