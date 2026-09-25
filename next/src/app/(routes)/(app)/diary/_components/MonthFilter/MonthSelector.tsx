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
  const yearButtonClass = "px-2 py-[3px] text-base text-theme-text-primary";

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
        <button className={yearButtonClass} onClick={goToPreYear} type="button"><MdKeyboardArrowLeft /></button>
        <button className={yearButtonClass} onClick={goToCurrentDate} type="button">{selectedYear}</button>
        <button className={yearButtonClass} onClick={goToNextYear} type="button"><MdKeyboardArrowRight /></button>
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
                "flex items-center justify-center border-b-2 text-sm transition-colors duration-200",
                selected ? "border-theme-accent font-semibold text-theme-accent" : "border-transparent text-theme-text-primary",
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
