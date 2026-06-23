'use client';

import { cn } from "@/common/utils/cn";
import { useEffect, useState } from "react";
import { SelectionPanel } from "@/common/components/ui/SelectionPanel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

const YearSelector = ({ isOpen, onClose, years, selectedYear, onSelectYear }: Props) => {
  const [tempYear, setTempYear] = useState(selectedYear);

  useEffect(() => {
    if (isOpen) {
      setTempYear(selectedYear);
    }
  }, [isOpen, selectedYear]);

  const onSubmit = () => {
    onSelectYear(tempYear);
  };

  return (
    <SelectionPanel
      isOpen={isOpen}
      title="연도 선택"
      minHeightClassName="max-[479px]:min-h-[300px]"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="grid w-full grid-cols-3 gap-2.5 overflow-y-auto p-1 max-[479px]:max-h-[calc(50dvh-120px)] min-[480px]:max-h-[300px] [@media(max-width:479px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-200px)] [@media(min-width:480px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-180px)]">
        {years.map((year) => {
          const selected = year === tempYear;

          return (
            <button
              key={year}
              className={cn(
                "rounded-[14px] px-2 py-3.5 text-base transition-all duration-200 ease-in-out hover:brightness-105",
                selected ? "bg-theme font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]" : "font-normal text-grey-title",
              )}
              onClick={() => setTempYear(year)}
              style={selected ? undefined : { backgroundColor: "color-mix(in srgb, var(--theme-color) 40%, white)" }}
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

export default YearSelector;
