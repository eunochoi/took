'use client';

import { Modal } from "@/common/components/ui/Modal";
import { SelectionPanel } from "@/common/components/ui/SelectionPanel";
import { cn } from "@/common/utils/cn";
import { useState } from "react";

interface Props {
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onApplyYear: (year: number) => void;
}

const YearFilter = ({ onClose, years, selectedYear, onApplyYear }: Props) => {
  const [tempYear, setTempYear] = useState(selectedYear);
  const yearGridClass = "grid w-full grid-cols-3 gap-2.5 overflow-y-auto p-1 max-h-[calc(50dvh-120px)] tablet:max-h-[300px]";

  const onSubmit = () => {
    onApplyYear(tempYear);
  };

  return (
    <Modal
      ariaLabel="연도 선택"
      onClose={() => onClose()}
      overlayClassName="z-[98] tablet:z-[105]"
      variant={{ base: 'top', tablet: 'top', desktop: 'top' }}
    >
      <SelectionPanel
        title="연도 선택"
        onCancel={() => onClose()}
        onSubmit={onSubmit}
      >
        <div className={yearGridClass}>
          {years.map((year) => {
            const selected = year === tempYear;

            return (
              <button
                key={year}
                className={cn(
                  "rounded-theme px-2 py-3.5 text-base transition-all duration-200 ease-in-out desktop:hover:brightness-105 shadow-theme-action",
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
    </Modal>
  );
};

export default YearFilter;
