import { cn } from "@/common/utils/cn";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  edge: 'top' | 'bottom';
  visible: boolean;
}

const bg = "rgb(var(--theme-bg))";

const gradientStyle = (edge: Props["edge"]): CSSProperties => ({
  background: `linear-gradient(
    to ${edge === "top" ? "bottom" : "top"},
    ${bg} 0%,
    rgb(var(--theme-bg) / 0.2) 65%,
    transparent 100%
  )`,
});

export const ScrollEdgeFade = ({ className, edge, visible }: Props) => {
  return (
    <div
      className={cn(
        "pointer-events-none transition-opacity duration-200 ease-in-out",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={gradientStyle(edge)}
    />
  );
};
