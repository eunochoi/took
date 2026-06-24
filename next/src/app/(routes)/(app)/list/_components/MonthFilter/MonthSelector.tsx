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

const MonthSelector = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }: Props) => {
  const monthsTopNum = [1, 2, 3, 4, 5, 6];
  const monthsTopEng = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'];
  const monthsBottomNum = [7, 8, 9, 10, 11, 12];
  const monthsBottomEng = ['jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const [touchStartX, setTouchStartX] = useState<number>(0);
  const yearButtonClass = "px-2 py-[3px] text-base text-grey-title";

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

  const renderMonth = (month: number, label: string) => {
    const selected = selectedMonth === month;

    return (
      <button
        className={cn(
          "flex w-[16%] flex-col items-center justify-center",
          selected && "rounded-[14px]",
        )}
        key={'month' + month}
        onClick={() => selectMonth(month)}
        style={selected ? { backgroundColor: "color-mix(in srgb, var(--theme-color) 65%, white)" } : undefined}
        type="button"
      >
        <span className={cn("text-sm text-grey-title", selected && "text-white")}>{month}</span>
        <span className={cn("text-sm capitalize text-gray-400", selected && "text-white")}>{label}</span>
      </button>
    );
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between p-2">
        <button className={yearButtonClass} onClick={goToPreYear} type="button"><MdKeyboardArrowLeft /></button>
        <button className={yearButtonClass} onClick={goToCurrentDate} type="button">{selectedYear}</button>
        <button className={yearButtonClass} onClick={goToNextYear} type="button"><MdKeyboardArrowRight /></button>
      </div>
      <div
        className="flex h-[150px] w-full flex-col items-center justify-center"
        onTouchStart={(e: any) => {
          setTouchStartX(e.changedTouches[0].clientX);
        }}
        onTouchEnd={(e: any) => {
          const touchEndX = e.changedTouches[0].clientX;
          if (touchEndX - touchStartX > 100) goToPreYear();
          else if (touchStartX - touchEndX > 100) goToNextYear();
        }}
      >
        <section className="flex h-1/2 w-full justify-between">
          {monthsTopNum.map((month, i) => renderMonth(month, monthsTopEng[i]))}
        </section>
        <section className="flex h-1/2 w-full justify-between">
          {monthsBottomNum.map((month, i) => renderMonth(month, monthsBottomEng[i]))}
        </section>
      </div>
    </div>
  );
};

export default MonthSelector;
