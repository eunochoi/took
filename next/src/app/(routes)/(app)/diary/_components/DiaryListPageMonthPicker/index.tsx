'use client';

import { PickerDialog } from "@/common/components/ui/PickerDialog";
import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useState } from "react";
import { MdRefresh } from 'react-icons/md';
import MonthSelector from "./MonthSelector";

interface Props {
  selectedYear: number;
  selectedMonth: number;
  onClose: () => void;
  onApply: (year: number, month: number) => void;
}

const DiaryListPageMonthPicker = ({
  selectedYear,
  selectedMonth,
  onClose,
  onApply,
}: Props) => {
  const [tempYear, setTempYear] = useState(selectedYear);
  const [tempMonth, setTempMonth] = useState(selectedMonth);

  const onSubmit = () => {
    onApply(tempYear, tempMonth);
  };

  const onInitialize = () => {
    setTempYear(getDefaultYear());
    setTempMonth(MONTH_UNSELECTED);
  };

  return (
    <PickerDialog labelledBy="diary-month-picker-title" onClose={onClose}>
      <div className="flex w-full flex-col gap-6 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 tablet:px-7 tablet:py-6 desktop:px-10 desktop:py-8 landscape-short:gap-4 landscape-short:px-6 landscape-short:py-6">
        <h2 id="diary-month-picker-title" className="font-title text-xl font-bold text-theme-text-primary">기간 선택</h2>
        <div className="w-full min-w-0">
          <MonthSelector
            selectedYear={tempYear}
            setSelectedYear={setTempYear}
            selectedMonth={tempMonth}
            setSelectedMonth={setTempMonth}
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 border-t border-theme-border/60 pt-6">
          <button className="mr-auto flex min-h-10 shrink-0 items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-theme-text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onInitialize} type="button"><MdRefresh />초기화</button>
          <div className="ml-auto flex items-center gap-3">
            <button className="min-h-10 shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-theme-text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onClose} type="button">취소</button>
            <button className="min-h-10 shrink-0 rounded-xl bg-theme-accent px-4 py-2 text-sm font-semibold text-theme-text-on-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onSubmit} type="button">확인</button>
          </div>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPageMonthPicker;
