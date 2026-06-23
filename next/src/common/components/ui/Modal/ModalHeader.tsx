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

export const ModalHeader = ({ className, title, confirmText = '완료', onConfirm }: ModalHeaderProps) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "relative flex h-[var(--mobileHeader)] w-full shrink-0 items-center justify-between",
        "max-[479px]:px-[4dvw] min-[480px]:px-6",
        className,
      )}
    >
      <button
        className="flex items-center justify-center text-theme"
        onClick={() => router.back()}
        type="button"
      >
        <MdArrowBackIos />
      </button>
      {title ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-grey-title">
          {title}
        </span>
      ) : null}
      {onConfirm ? (
        <button
          className="flex items-center justify-center text-theme"
          onClick={onConfirm}
          type="button"
        >
          {confirmText}
        </button>
      ) : null}
    </div>
  );
};
