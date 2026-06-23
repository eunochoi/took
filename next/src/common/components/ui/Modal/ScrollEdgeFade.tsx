import { cn } from "@/common/utils/cn";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  edge: 'top' | 'bottom';
  visible: boolean;
}

const gradientStyle = (edge: Props['edge']): CSSProperties => ({
  background: `linear-gradient(
    to ${edge === 'top' ? 'bottom' : 'top'},
    var(--theme-bg, #f5f5fa) 0%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
    transparent 100%
  )`,
});

export const ScrollEdgeFade = ({ className, edge, visible }: Props) => {
  return (
    <div
      className={cn(
        "pointer-events-none transition-opacity duration-300 ease-in-out",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={gradientStyle(edge)}
    />
  );
};
