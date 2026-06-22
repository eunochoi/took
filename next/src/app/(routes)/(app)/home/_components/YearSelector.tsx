'use client';

import { Overlay } from "@/common/components/ui/Overlay";
import { cn } from "@/common/utils/cn";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

const YearSelector = ({ isOpen, onClose, years, selectedYear, onSelectYear }: Props) => {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          "fixed -top-[3px] flex shrink-0 flex-col items-center justify-center overflow-hidden backdrop-blur-2xl",
          "max-[479px]:h-auto max-[479px]:max-h-[70dvh] max-[479px]:w-full max-[479px]:origin-top max-[479px]:gap-5 max-[479px]:rounded-b-[28px] max-[479px]:px-6 max-[479px]:pb-9 max-[479px]:pt-[calc(var(--mobileHeader)+24px)] max-[479px]:shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-[479px]:transition-transform max-[479px]:duration-300 max-[479px]:ease-in-out",
          "min-[480px]:max-[1024px]:left-1/2 min-[480px]:max-[1024px]:top-[50dvh] min-[480px]:max-[1024px]:z-[999] min-[480px]:max-[1024px]:max-h-[60dvh] min-[480px]:max-[1024px]:w-80 min-[480px]:max-[1024px]:-translate-x-1/2 min-[480px]:max-[1024px]:-translate-y-1/2 min-[480px]:max-[1024px]:gap-4 min-[480px]:max-[1024px]:rounded-[28px] min-[480px]:max-[1024px]:px-7 min-[480px]:max-[1024px]:py-6 min-[480px]:max-[1024px]:shadow-[0_4px_24px_rgba(0,0,0,0.1)] min-[480px]:max-[1024px]:transition-[opacity,visibility] min-[480px]:max-[1024px]:duration-300",
          "min-[1025px]:left-1/2 min-[1025px]:top-[50dvh] min-[1025px]:max-h-[60dvh] min-[1025px]:w-[400px] min-[1025px]:-translate-x-1/2 min-[1025px]:-translate-y-1/2 min-[1025px]:gap-6 min-[1025px]:rounded-[28px] min-[1025px]:px-10 min-[1025px]:py-8 min-[1025px]:shadow-[0_4px_24px_rgba(0,0,0,0.1)] min-[1025px]:transition-[opacity,visibility] min-[1025px]:duration-300",
          "[@media(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-20px)] [@media(orientation:landscape)_and_(max-height:600px)]:justify-start [@media(orientation:landscape)_and_(max-height:600px)]:gap-4 [@media(orientation:landscape)_and_(max-height:600px)]:overflow-y-auto [@media(orientation:landscape)_and_(max-height:600px)]:px-6 [@media(orientation:landscape)_and_(max-height:600px)]:py-5",
          isOpen
            ? "max-[479px]:scale-y-100 min-[480px]:opacity-100 min-[480px]:visible"
            : "max-[479px]:scale-y-0 min-[480px]:invisible min-[480px]:opacity-0",
        )}
        style={{ backgroundColor: "color-mix(in srgb, var(--theme-bg, #f5f5fa) 95%, transparent)" }}
      >
        <h3 className="shrink-0 text-lg font-semibold text-grey-title">연도 선택</h3>
        <div className="flex w-full flex-col rounded-[20px] bg-white/60 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <div className="grid w-full grid-cols-3 gap-2.5 overflow-y-auto p-1 max-[479px]:max-h-[calc(50dvh-120px)] min-[480px]:max-h-[300px] [@media(max-width:479px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-200px)] [@media(min-width:480px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-180px)]">
            {years.map((year) => {
              const selected = year === selectedYear;

              return (
                <button
                  key={year}
                  className={cn(
                    "rounded-[14px] px-2 py-3.5 text-base transition-all duration-200 ease-in-out hover:brightness-105",
                    selected ? "bg-theme font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]" : "font-normal text-grey-title",
                  )}
                  onClick={() => onSelectYear(year)}
                  style={selected ? undefined : { backgroundColor: "color-mix(in srgb, var(--theme-color) 40%, white)" }}
                  type="button"
                >
                  {year}년
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="shrink-0 rounded-[14px] bg-theme px-5 py-1.5 text-base text-white shadow-card min-[480px]:max-[1024px]:px-4 min-[480px]:max-[1024px]:py-1 min-[480px]:max-[1024px]:text-sm"
          onClick={onClose}
          type="button"
        >
          닫기
        </button>
      </div>
    </Overlay>
  );
};

export default YearSelector;
