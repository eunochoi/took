'use client';

import { PickerDialog } from "@/common/components/ui/Dialog/PickerDialog";
import {
  PICKER_ACTIONS_CLASS,
  PICKER_ACTION_GROUP_CLASS,
  PICKER_BODY_CLASS,
  PICKER_CANCEL_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_TITLE_CLASS,
} from '@/common/components/ui/Dialog/PickerDialog/constants';
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
      <div className={PICKER_CONTENT_CLASS}>
        <h2 id="home-year-picker-title" className={PICKER_TITLE_CLASS}>연도 선택</h2>
        <div className={cn(PICKER_BODY_CLASS, yearGridClass)}>
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
        <div className={PICKER_ACTIONS_CLASS}>
          <div className={PICKER_ACTION_GROUP_CLASS}>
            <button className={PICKER_CANCEL_BUTTON_CLASS} onClick={onClose} type="button">취소</button>
            <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">확인</button>
          </div>
        </div>
      </div>
    </PickerDialog>
  );
};

export default HomePageYearPicker;
