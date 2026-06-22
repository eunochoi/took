'use client';

import { HTMLAttributes, forwardRef } from "react";

type ModalContentProps = HTMLAttributes<HTMLDivElement>;

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          "flex w-full grow flex-col items-center justify-start overflow-y-auto",
          "max-[479px]:px-[4dvw] max-[479px]:py-3",
          "min-[480px]:max-[1023px]:px-6 min-[480px]:max-[1023px]:py-3",
          "min-[1024px]:px-6 min-[1024px]:py-4",
          className,
        )}
        {...props}
      />
    );
  },
);

ModalContent.displayName = 'ModalContent';
