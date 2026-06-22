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
          selected && "rounded-[14px] [&>span]:text-white",
        )}
        key={'month' + month}
        onClick={() => selectMonth(month)}
        style={selected ? { backgroundColor: "color-mix(in srgb, var(--theme-color) 65%, white)" } : undefined}
        type="button"
      >
        <span className="text-base text-grey-title">{month}</span>
        <span className="text-base capitalize text-gray-500">{label}</span>
      </button>
    );
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between p-2.5 min-[480px]:max-[1023px]:px-0 min-[480px]:max-[1023px]:py-1.5 [&>button]:px-2 [&>button]:py-[3px] [&>button]:text-xl [&>button]:text-grey-title">
        <button onClick={goToPreYear} type="button"><MdKeyboardArrowLeft /></button>
        <button onClick={goToCurrentDate} type="button">{selectedYear}</button>
        <button onClick={goToNextYear} type="button"><MdKeyboardArrowRight /></button>
      </div>
      <div
        className="flex h-[150px] w-full flex-col items-center justify-center min-[480px]:max-[1023px]:h-[120px]"
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
