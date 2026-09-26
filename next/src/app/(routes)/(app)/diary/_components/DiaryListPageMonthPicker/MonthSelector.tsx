import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { cn } from "@/common/utils/cn";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);

const MonthSelector = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }: Props) => {
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const yearButtonClass = "px-2 py-[3px] text-base font-semibold text-theme-text-primary";

  const goToNextYear = () => {
    setSelectedYear(c => c + 1);
    setSelectedMonth(MONTH_UNSELECTED);
  };
  const goToPreYear = () => {
    setSelectedYear(c => c - 1);
    setSelectedMonth(MONTH_UNSELECTED);
  };
  const goToCurrentDate = () => {
    setSelectedYear(getDefaultYear());
  };
  const selectMonth = (n: number) => {
    if (selectedMonth === n) {
      setSelectedMonth(MONTH_UNSELECTED);
    }
    else setSelectedMonth(n);
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between p-2">
        <button className={yearButtonClass} onClick={goToCurrentDate} type="button">{selectedYear}</button>
        <div className="flex items-center gap-1">
          <button className={yearButtonClass} onClick={goToPreYear} aria-label="이전 연도" type="button"><MdKeyboardArrowLeft aria-hidden="true" /></button>
          <button className={yearButtonClass} onClick={goToNextYear} aria-label="다음 연도" type="button"><MdKeyboardArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div
        className="grid h-[150px] w-full grid-cols-6 grid-rows-2"
        onTouchStart={(e) => {
          setTouchStartX(e.changedTouches[0].clientX);
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.changedTouches[0].clientX;
          if (touchEndX - touchStartX > 100) goToPreYear();
          else if (touchStartX - touchEndX > 100) goToNextYear();
        }}
      >
        {MONTHS.map((month) => {
          const selected = selectedMonth === month;

          return (
            <button
              key={month}
              className={cn(
                "flex items-center justify-center text-sm transition-colors duration-200 text-theme-text-primary",
                selected ? "rounded-2xl border p-2 transition-colors border-theme-accent bg-theme-accent/10" : "border-transparent",
              )}
              aria-pressed={selected}
              onClick={() => selectMonth(month)}
              type="button"
            >
              {month}월
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthSelector;
