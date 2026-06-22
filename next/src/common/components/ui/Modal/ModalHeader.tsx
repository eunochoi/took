'use client';

import { useRouter } from "next/navigation";
import { MdArrowBackIos } from 'react-icons/md';

interface ModalHeaderProps {
  className?: string;
  headerTitleText?: string;
  headerConfirmText?: string;
  onConfirm?: () => void;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const ModalHeader = ({ className, headerTitleText, headerConfirmText = '완료', onConfirm }: ModalHeaderProps) => {
  const router = useRouter();

  return (
    <div
      className={cx(
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
      {headerTitleText ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-grey-title">
          {headerTitleText}
        </span>
      ) : null}
      {onConfirm ? (
        <button
          className="flex items-center justify-center text-theme"
          onClick={onConfirm}
          type="button"
        >
          {headerConfirmText}
        </button>
      ) : null}
    </div>
  );
};
