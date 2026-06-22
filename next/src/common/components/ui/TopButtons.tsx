'use client';

import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  classname?: string;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const TopButtons = ({ children, className, classname }: Props) => {
  return (
    <div
      className={cx(
        "sticky left-0 right-0 top-0 z-[91] flex w-full shrink-0 items-center justify-end gap-1.5",
        "max-[479px]:h-[var(--mobileHeader)] max-[479px]:px-[4dvw]",
        "min-[480px]:max-[1024px]:h-[var(--mobileHeader)] min-[480px]:max-[1024px]:px-5",
        "min-[1025px]:h-[var(--desktopHeader)] min-[1025px]:px-12",
        "[&>button]:flex [&>button]:h-8 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-2xl [&>button]:bg-theme [&>button]:text-base [&>button]:font-medium [&>button]:capitalize [&>button]:text-white [&>button]:shadow-card [&>button]:transition-all [&>button]:duration-200 [&>button]:ease-in-out",
        "[&>button.auto]:w-auto [&>button.auto]:gap-2 [&>button.auto]:px-3.5 [&>button.large]:w-20 [&>button.normal]:w-16 [&>button.small]:w-12",
        "min-[1025px]:[&>button]:h-9 min-[1025px]:[&>button]:rounded-[18px] min-[1025px]:[&>button]:px-3.5 min-[1025px]:[&>button]:py-1",
        className,
        classname,
      )}
    >
      {children}
    </div>
  );
};

export default TopButtons;
