import { twMerge } from "tailwind-merge";

interface Props {
  accentColor?: string;
  className?: string;
}

const Wordmark = ({ accentColor, className }: Props) => (
  <span className={twMerge("inline-flex shrink-0 items-baseline gap-0.5 text-[36px] text-theme-text-primary", className)}>
    <span className="font-wordmark leading-none">to:ok</span>
    <span aria-hidden="true" className="h-[0.23em] w-[0.23em] rounded-full bg-theme-accent" style={accentColor ? { backgroundColor: accentColor } : undefined} />
  </span>
);

export default Wordmark;
