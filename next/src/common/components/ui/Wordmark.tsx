import { cn } from "@/common/utils/cn";

interface Props {
  className?: string;
}

const Wordmark = ({ className }: Props) => (
  <span className={cn("inline-flex shrink-0 items-baseline gap-0.5 text-[36px] text-theme-text-primary", className)}>
    <span className="font-sans font-semibold leading-none tracking-[-0.045em]">to:ok</span>
    <span aria-hidden="true" className="h-[0.22em] w-[0.22em] rounded-full bg-theme-accent" />
  </span>
);

export default Wordmark;
