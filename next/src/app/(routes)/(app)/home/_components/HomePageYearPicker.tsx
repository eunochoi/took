'use client';

import { PickerDialog } from "@/common/components/ui/PickerDialog";
import { cn } from "@/common/utils/cn";
import { useState } from "react";

interface Props {
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onApplyYear: (year: number) => void;
}

const HomePageYearPicker = ({ onClose, years, selectedYear, onApplyYear }: Props) => {
  const [tempYear, setTempYear] = useState(selectedYear);
  const yearGridClass = "grid w-full grid-cols-3 gap-x-4 gap-y-2 overflow-y-auto max-h-[calc(50dvh-120px)] tablet:max-h-[300px]";

  const onSubmit = () => {
    onApplyYear(tempYear);
  };

  return (
    <PickerDialog labelledBy="home-year-picker-title" onClose={onClose}>
      <div className="flex w-full flex-col gap-6 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 tablet:px-7 tablet:py-6 desktop:px-10 desktop:py-8 landscape-short:gap-4 landscape-short:px-6 landscape-short:py-6">
        <h2 id="home-year-picker-title" className="font-title text-xl font-bold text-theme-text-primary">연도 선택</h2>
        <div className={cn("w-full min-w-0", yearGridClass)}>
          {years.map((year) => {
            const selected = year === tempYear;

            return (
              <button
                key={year}
                className={cn(
                  "px-2 py-3 text-base transition-colors duration-200 font-normal text-theme-text-primary",
                  selected ? "rounded-2xl border p-2 transition-colors border-theme-accent bg-theme-accent/10" : "border-transparent",
                )}
                aria-pressed={selected}
                onClick={() => setTempYear(year)}
                type="button"
              >
                {year}년
              </button>
            );
          })}
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 border-t border-theme-border/60 pt-6">
          <div className="ml-auto flex items-center gap-3">
            <button className="min-h-10 shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-theme-text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onClose} type="button">취소</button>
            <button className="min-h-10 shrink-0 rounded-xl bg-theme-accent px-4 py-2 text-sm font-semibold text-theme-text-on-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onSubmit} type="button">확인</button>
          </div>
        </div>
      </div>
    </PickerDialog>
  );
};

export default HomePageYearPicker;
