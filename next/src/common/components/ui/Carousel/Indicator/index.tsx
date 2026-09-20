import { cn } from "@/common/utils/cn";
import { RefObject } from "react";

interface IndicatorProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  indicatorLength: number;
  type?: string;
  gap?: boolean;
  position?: 'overlay' | 'below';
}

const Indicator = ({
  slideWrapperRef,
  page,
  indicatorLength,
  type,
  gap = false,
  position = 'overlay',
}: IndicatorProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 justify-center py-1.5",
        position === 'overlay' && "absolute inset-x-0 bottom-1 z-10",
      )}
    >
      {[...Array(indicatorLength)].map((_: any, i: number) => {
        const current = page === i;
        return (
          <button
            key={`indicator${i}`}
            className={cn(
              "m-[3px] h-2 rounded-theme transition-all duration-200 ease-in-out",
              current ? "bg-theme-accent w-5" : "bg-theme-accent/80 w-2",
              type === "diary" && i === indicatorLength - 1 && "rounded-sm",
            )}
            onClick={() => {
              slideWrapperRef.current?.scrollTo({
                left: (slideWrapperRef.current.clientWidth + (gap ? 16 : 0)) * i,
                behavior: "smooth",
              });
            }}
            type="button"
          />
        );
      })}
    </div>
  );
};

export default Indicator;
