'use client';

import { cn } from "@/common/utils/cn";
import { MdArrowBackIos } from 'react-icons/md';

interface ModalHeaderProps {
  className?: string;
  title?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onBack?: () => void;
  backLabel?: string;
  isDisabled?: boolean;
}

const modalHeaderClass = "relative flex h-[var(--mobileHeader)] w-full shrink-0 items-center justify-between px-[4dvw] tablet:px-6 landscape-short:h-14";
const modalHeaderButtonClass = "flex items-center justify-center text-theme-accent";
const modalHeaderTitleClass = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-title text-base text-theme-text-primary";

export const ModalHeader = ({
  className,
  title,
  confirmText = '완료',
  onConfirm,
  onBack,
  backLabel = '모달 닫기',
  isDisabled = false,
}: ModalHeaderProps) => {
  return (
    <div
      className={cn(
        modalHeaderClass,
        className,
      )}
    >
      {onBack ? (
        <button
          aria-label={backLabel}
          className={modalHeaderButtonClass}
          onClick={onBack}
          type="button"
        >
          <MdArrowBackIos />
        </button>
      ) : <span />}
      {title ? (
        <span className={modalHeaderTitleClass}>
          {title}
        </span>
      ) : null}
      {onConfirm ? (
        <button
          className={modalHeaderButtonClass}
          disabled={isDisabled}
          onClick={onConfirm}
          type="button"
        >
          {confirmText}
        </button>
      ) : null}
    </div>
  );
};
