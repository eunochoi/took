'use client';

import { PickerDialog } from "@/common/components/ui/Dialog/PickerDialog";
import {
  PICKER_ACTIONS_CLASS,
  PICKER_ACTION_GROUP_CLASS,
  PICKER_BODY_CLASS,
  PICKER_CANCEL_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_RESET_BUTTON_CLASS,
  PICKER_TITLE_CLASS,
} from '@/common/components/ui/Dialog/PickerDialog/constants';
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
      <div className={PICKER_CONTENT_CLASS}>
        <h2 id="diary-month-picker-title" className={PICKER_TITLE_CLASS}>기간 선택</h2>
        <div className={PICKER_BODY_CLASS}>
          <MonthSelector
            selectedYear={tempYear}
            setSelectedYear={setTempYear}
            selectedMonth={tempMonth}
            setSelectedMonth={setTempMonth}
          />
        </div>
        <div className={PICKER_ACTIONS_CLASS}>
          <button className={PICKER_RESET_BUTTON_CLASS} onClick={onInitialize} type="button"><MdRefresh />초기화</button>
          <div className={PICKER_ACTION_GROUP_CLASS}>
            <button className={PICKER_CANCEL_BUTTON_CLASS} onClick={onClose} type="button">취소</button>
            <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">확인</button>
          </div>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPageMonthPicker;
