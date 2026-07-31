'use client';

import { cn } from "@/common/utils/cn";
import { useRouter } from "next/navigation";
import { MdArrowBackIos } from 'react-icons/md';

interface ModalHeaderProps {
  className?: string;
  title?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const modalHeaderClass = "relative flex h-[var(--mobileHeader)] w-full shrink-0 items-center justify-between px-[4dvw] tablet:px-6";
const modalHeaderButtonClass = "flex items-center justify-center text-theme-accent";
const modalHeaderTitleClass = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-theme-text-primary";

export const ModalHeader = ({ className, title, confirmText = '완료', onConfirm }: ModalHeaderProps) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        modalHeaderClass,
        className,
      )}
    >
      <button
        className={modalHeaderButtonClass}
        onClick={() => router.back()}
        type="button"
      >
        <MdArrowBackIos />
      </button>
      {title ? (
        <span className={modalHeaderTitleClass}>
          {title}
        </span>
      ) : null}
      {onConfirm ? (
        <button
          className={modalHeaderButtonClass}
          onClick={onConfirm}
          type="button"
        >
          {confirmText}
        </button>
      ) : null}
    </div>
  );
};
