'use client';

import { PickerDialog } from "@/common/components/ui/Dialog/PickerDialog";
import {
  PICKER_ACTIONS_CLASS,
  PICKER_BODY_CLASS,
  PICKER_CLOSE_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_DESCRIPTION_CLASS,
  PICKER_TITLE_CLASS,
} from '@/common/components/ui/Dialog/PickerDialog/constants';
import { cn } from "@/common/utils/cn";
import { useState } from "react";
import { MdClose } from 'react-icons/md';

interface Props {
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onApplyYear: (year: number) => void;
}

const HomePageYearPicker = ({ onClose, years, selectedYear, onApplyYear }: Props) => {
  const [tempYear, setTempYear] = useState(selectedYear);
  const yearGridClass = "grid w-full max-h-[30dvh] gap-2 overflow-y-auto tablet:max-h-[300px]";

  const onSubmit = () => {
    onApplyYear(tempYear);
  };

  return (
    <PickerDialog labelledBy="home-year-picker-title" describedBy="home-year-picker-description" onClose={onClose}>
      <div className={PICKER_CONTENT_CLASS}>
        <button type="button" aria-label="연도 선택 닫기" onClick={onClose} className={PICKER_CLOSE_BUTTON_CLASS}>
          <MdClose aria-hidden="true" className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h2 id="home-year-picker-title" className={PICKER_TITLE_CLASS}>어느 해의 기록을 볼까요?</h2>
          <p id="home-year-picker-description" className={PICKER_DESCRIPTION_CLASS}>선택한 연도의 기록을 보여드려요</p>
        </div>
        <div className={cn(PICKER_BODY_CLASS, yearGridClass, years.length === 1 ? "grid-cols-1" : years.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
          {years.map((year) => {
            const selected = year === tempYear;
            return (
              <button
                key={year}
                className={cn(
                  "min-h-14 rounded-2xl border px-2 py-3 text-base text-theme-text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
                  selected ? "border-theme-accent bg-theme-accent/10" : "border-transparent",
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
          <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">적용하기</button>
        </div>
      </div>
    </PickerDialog>
  );
};

export default HomePageYearPicker;
