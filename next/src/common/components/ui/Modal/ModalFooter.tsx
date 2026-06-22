'use client';

import { HTMLAttributes, forwardRef } from "react";

type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          "flex h-[var(--mobileHeader)] w-full shrink-0 items-center justify-center",
          className,
        )}
        {...props}
      />
    );
  },
);

ModalFooter.displayName = "ModalFooter";
