'use client';

import { Overlay } from "@/common/components/ui/Overlay";
import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { cn } from "@/common/utils/cn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdRefresh } from 'react-icons/md';
import MonthSelector from "./MonthSelector";

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: (params?: URLSearchParams) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const panelClass =
  "fixed -top-[3px] flex shrink-0 flex-col items-center justify-start overflow-hidden backdrop-blur-2xl " +
  "max-[479px]:max-h-[calc(100dvh-var(--mobileHeader))] max-[479px]:min-h-[400px] max-[479px]:w-full max-[479px]:origin-top max-[479px]:gap-5 max-[479px]:overflow-y-auto max-[479px]:overflow-x-hidden max-[479px]:rounded-b-[28px] max-[479px]:px-6 max-[479px]:pb-6 max-[479px]:pt-[calc(var(--mobileHeader)+24px)] max-[479px]:shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-[479px]:transition-transform max-[479px]:duration-300 max-[479px]:ease-in-out " +
  "min-[480px]:max-[1024px]:left-1/2 min-[480px]:max-[1024px]:top-[50dvh] min-[480px]:max-[1024px]:z-[999] min-[480px]:max-[1024px]:max-h-[80dvh] min-[480px]:max-[1024px]:w-[400px] min-[480px]:max-[1024px]:-translate-x-1/2 min-[480px]:max-[1024px]:-translate-y-1/2 min-[480px]:max-[1024px]:gap-4 min-[480px]:max-[1024px]:rounded-[28px] min-[480px]:max-[1024px]:px-7 min-[480px]:max-[1024px]:py-6 min-[480px]:max-[1024px]:shadow-[0_4px_24px_rgba(0,0,0,0.1)] min-[480px]:max-[1024px]:transition-[opacity,visibility] min-[480px]:max-[1024px]:duration-300 " +
  "min-[1025px]:left-1/2 min-[1025px]:top-[50dvh] min-[1025px]:max-h-[80dvh] min-[1025px]:w-[450px] min-[1025px]:-translate-x-1/2 min-[1025px]:-translate-y-1/2 min-[1025px]:gap-6 min-[1025px]:rounded-[28px] min-[1025px]:px-10 min-[1025px]:py-8 min-[1025px]:shadow-[0_4px_24px_rgba(0,0,0,0.1)] min-[1025px]:transition-[opacity,visibility] min-[1025px]:duration-300 " +
  "[@media(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-20px)] [@media(orientation:landscape)_and_(max-height:600px)]:justify-start [@media(orientation:landscape)_and_(max-height:600px)]:gap-4 [@media(orientation:landscape)_and_(max-height:600px)]:overflow-y-auto [@media(orientation:landscape)_and_(max-height:600px)]:px-6 [@media(orientation:landscape)_and_(max-height:600px)]:py-5 [@media(orientation:landscape)_and_(max-height:600px)]:pt-[calc(var(--mobileHeader)+20px)]";

const MonthFilter = ({
  contentRef,
  isOpen,
  onClose,
  setSelectedYear,
  setSelectedMonth,
}: Props) => {
  const searchParams = useSearchParams();

  const [tempYear, setTempYear] = useState<number>(getDefaultYear());
  const [tempMonth, setTempMonth] = useState<number>(MONTH_UNSELECTED);

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  useEffect(() => {
    if (isOpen) {
      if (year) setTempYear(Number(year));
      else setTempYear(getDefaultYear());
      if (month) setTempMonth(Number(month));
      else setTempMonth(MONTH_UNSELECTED);
    }
  }, [isOpen, year, month]);

  const onSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('modal');

    if (tempYear !== getDefaultYear()) params.set('year', tempYear.toString());
    else params.delete('year');
    if (tempMonth !== MONTH_UNSELECTED) params.set('month', tempMonth.toString());
    else params.delete('month');

    setSelectedYear(tempYear);
    setSelectedMonth(tempMonth);
    onClose(params);

    setTimeout(() => {
      contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const onInitialize = () => {
    setTempYear(getDefaultYear());
    setTempMonth(MONTH_UNSELECTED);
  };

  return (
    <Overlay isOpen={isOpen} onClose={() => onClose()}>
      <div
        className={cn(
          panelClass,
          isOpen
            ? "max-[479px]:scale-y-100 min-[480px]:visible min-[480px]:opacity-100"
            : "max-[479px]:scale-y-0 min-[480px]:invisible min-[480px]:opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "color-mix(in srgb, var(--theme-bg, #f5f5fa) 95%, transparent)" }}
      >
        <span className="mb-3 block text-center text-lg font-semibold leading-none text-grey-title">기간 선택</span>
        <div className="flex w-full flex-col rounded-[20px] bg-white/90 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <MonthSelector
            selectedYear={tempYear}
            setSelectedYear={setTempYear}
            selectedMonth={tempMonth}
            setSelectedMonth={setTempMonth}
          />
        </div>
        <button className="flex items-center justify-center gap-2 text-base text-theme" onClick={onInitialize} type="button">
          <MdRefresh />초기화
        </button>
        <div className="flex items-center gap-3">
          <button className="shrink-0 rounded-[14px] bg-white/90 px-5 py-1.5 text-base text-grey-title shadow-card min-[480px]:max-[1024px]:px-4 min-[480px]:max-[1024px]:py-1 min-[480px]:max-[1024px]:text-sm" onClick={() => onClose()} type="button">취소</button>
          <button className="shrink-0 rounded-[14px] bg-theme px-5 py-1.5 text-base text-white shadow-card min-[480px]:max-[1024px]:px-4 min-[480px]:max-[1024px]:py-1 min-[480px]:max-[1024px]:text-sm" onClick={onSubmit} type="button">확인</button>
        </div>
      </div>
    </Overlay>
  );
};

export default MonthFilter;
