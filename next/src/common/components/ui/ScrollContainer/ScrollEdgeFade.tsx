import { cn } from "@/common/utils/cn";

interface Props {
  className?: string;
  edge: 'top' | 'bottom';
  visible: boolean;
}

const gradientClass = {
  top: "mask-scroll-fade-top",
  bottom: "mask-scroll-fade-bottom",
} as const;

export const ScrollEdgeFade = ({ className, edge, visible }: Props) => {
  return (
    <div
      className={cn(
        "pointer-events-none bg-theme-accent-light transition-[opacity,background-color] duration-1000 ease-in-out",
        visible ? "opacity-100" : "opacity-0",
        gradientClass[edge],
        className,
      )}
    />
  );
};
