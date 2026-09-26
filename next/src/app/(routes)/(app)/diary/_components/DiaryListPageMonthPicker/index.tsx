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
import { useState } from "react";
import { MdClose } from 'react-icons/md';
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

  return (
    <PickerDialog labelledBy="diary-month-picker-title" describedBy="diary-month-picker-description" onClose={onClose}>
      <div className={PICKER_CONTENT_CLASS}>
        <button type="button" aria-label="기간 선택 닫기" onClick={onClose} className={PICKER_CLOSE_BUTTON_CLASS}>
          <MdClose aria-hidden="true" className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h2 id="diary-month-picker-title" className={PICKER_TITLE_CLASS}>어느 기간의 기록을 볼까요?</h2>
          <p id="diary-month-picker-description" className={PICKER_DESCRIPTION_CLASS}>연도를 고르고, 필요하면 월도 선택해 주세요</p>
        </div>
        <div className={PICKER_BODY_CLASS}>
          <MonthSelector
            selectedYear={tempYear}
            setSelectedYear={setTempYear}
            selectedMonth={tempMonth}
            setSelectedMonth={setTempMonth}
          />
        </div>
        <div className={PICKER_ACTIONS_CLASS}>
          <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">적용하기</button>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPageMonthPicker;
