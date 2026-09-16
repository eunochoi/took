import { cn } from "@/common/utils/cn";

interface Props {
  className?: string;
  size?: "default" | "large";
}

const Wordmark = ({ className, size = "default" }: Props) => (
  <span className={cn("inline-flex shrink-0 items-baseline gap-0.5 text-theme-text-primary", className)}>
    <span className={cn(
      "font-sans font-semibold leading-none tracking-[-0.045em]",
      size === "large" ? "text-[48px]" : "text-[36px]",
    )}>to:ok</span>
    <span aria-hidden="true" className={cn("rounded-full bg-theme-accent", size === "large" ? "h-2.5 w-2.5" : "h-2 w-2")} />
  </span>
);

export default Wordmark;
