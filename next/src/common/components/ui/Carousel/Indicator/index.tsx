import { cn } from "@/common/utils/cn";
import { RefObject } from "react";

interface IndicatorProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  indicatorLength: number;
  color?: string;
  type?: string;
}

const Indicator = ({ slideWrapperRef, page, indicatorLength, color, type }: IndicatorProps) => {
  return (
    <div className="my-1 flex h-auto w-full justify-center">
      {[...Array(indicatorLength)].map((_: any, i: number) => {
        const current = page === i;

        return (
          <button
            key={`indicator${i}`}
            className={cn(
              "m-[3px] h-2 rounded-lg transition-all duration-200 ease-in-out",
              current ? "bg-theme-accent w-5" : "bg-theme-accent/80 w-2",
              type === "diary" && i === indicatorLength - 1 && "rounded-sm",
            )}
            onClick={() => {
              slideWrapperRef.current?.scrollTo({
                left: slideWrapperRef.current.clientWidth * i,
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
