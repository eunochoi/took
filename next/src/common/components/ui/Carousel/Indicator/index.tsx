import { RefObject } from "react";
import { lightenColor } from "@/common/utils/lightenColor";
import { cn } from "@/common/utils/cn";

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
        const backgroundColor = current
          ? color ?? "var(--theme-color)"
          : color
            ? lightenColor(color, 15)
            : "color-mix(in srgb, var(--theme-color) 85%, white)";

        return (
          <button
            key={`indicator${i}`}
            className={cn(
              "m-[3px] h-2 rounded-lg transition-all duration-200 ease-in-out",
              current ? "w-5" : "w-2",
              type === "diary" && i === indicatorLength - 1 && "rounded-sm",
            )}
            onClick={() => {
              slideWrapperRef.current?.scrollTo({
                left: slideWrapperRef.current.clientWidth * i,
                behavior: "smooth",
              });
            }}
            style={{ backgroundColor }}
            type="button"
          />
        );
      })}
    </div>
  );
};

export default Indicator;
