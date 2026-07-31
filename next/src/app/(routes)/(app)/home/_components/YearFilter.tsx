'use client';

import { SelectionPanel } from "@/common/components/ui/SelectionPanel";
import { cn } from "@/common/utils/cn";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onApplyYear: (year: number) => void;
}

const YearFilter = ({ isOpen, onClose, years, selectedYear, onApplyYear }: Props) => {
  const [tempYear, setTempYear] = useState(selectedYear);
  const yearGridClass = "grid w-full grid-cols-3 gap-2.5 overflow-y-auto p-1 max-h-[calc(50dvh-120px)] tablet:max-h-[300px]";

  useEffect(() => {
    if (isOpen) {
      setTempYear(selectedYear);
    }
  }, [isOpen, selectedYear]);

  const onSubmit = () => {
    onApplyYear(tempYear);
  };

  return (
    <SelectionPanel
      isOpen={isOpen}
      title="연도 선택"
      onClose={() => onClose()}
      onSubmit={onSubmit}
    >
      <div className={yearGridClass}>
        {years.map((year) => {
          const selected = year === tempYear;

          return (
            <button
              key={year}
              className={cn(
                "rounded-theme px-2 py-3.5 text-base transition-all duration-200 ease-in-out hover:brightness-105 shadow-theme-action",
                selected ? "bg-theme-accent font-semibold text-theme-text-on-accent " : "bg-theme-accent/40 font-normal text-theme-text-primary",
              )}
              onClick={() => setTempYear(year)}
              type="button"
            >
              {year}년
            </button>
          );
        })}
      </div>
    </SelectionPanel>
  );
};

export default YearFilter;
