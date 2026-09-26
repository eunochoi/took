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
import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useState } from "react";
import { MdClose } from 'react-icons/md';
import PeriodSelector from "./PeriodSelector";

interface Props {
  selectedYear: number | null;
  selectedMonth: number;
  onClose: () => void;
  onApply: (year: number | null, month: number) => void;
}

const DiaryListPagePeriodPicker = ({
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
    <PickerDialog labelledBy="diary-period-picker-title" describedBy="diary-period-picker-description" onClose={onClose}>
      <div className={PICKER_CONTENT_CLASS}>
        <button type="button" aria-label="기간 선택 닫기" onClick={onClose} className={PICKER_CLOSE_BUTTON_CLASS}>
          <MdClose aria-hidden="true" className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h2 id="diary-period-picker-title" className={PICKER_TITLE_CLASS}>어느 기간의 기록을 볼까요?</h2>
          <p id="diary-period-picker-description" className={PICKER_DESCRIPTION_CLASS}>선택한 연도나 월을 다시 누르면 해당 선택이 해제돼요</p>
        </div>
        <div className={PICKER_BODY_CLASS}>
          <PeriodSelector
            selectedYear={tempYear}
            setSelectedYear={setTempYear}
            selectedMonth={tempMonth}
            setSelectedMonth={setTempMonth}
          />
        </div>
        <div className={PICKER_ACTIONS_CLASS}>
          <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">
            {tempYear === null ? '전체 기간 선택' : tempMonth === MONTH_UNSELECTED ? `${tempYear}년 선택` : `${tempYear}년 ${tempMonth}월 선택`}
          </button>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPagePeriodPicker;
