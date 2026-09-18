'use client';

import { cn } from "@/common/utils/cn";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  resetLabel?: ReactNode;
  onCancel: () => void;
  onReset?: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
}

const panelClass =
  "flex h-fit max-h-full min-h-0 w-full flex-col items-center justify-start gap-5 overflow-y-auto overflow-x-hidden px-6 pb-8 pt-8 backdrop-blur-2xl tablet:gap-5 tablet:px-7 tablet:py-6 desktop:gap-6 desktop:px-10 desktop:py-8 landscape-short:justify-start landscape-short:gap-4 landscape-short:px-6 landscape-short:py-6";
const panelActionButtonClass = "shrink-0 rounded-full px-5 py-1.5 text-base shadow-card";

export const SelectionPanel = ({
  title,
  children,
  resetLabel,
  onCancel,
  onReset,
  onSubmit,
  submitDisabled = false,
}: Props) => {
  return (
    <div className={panelClass}>
      <span className="mb-3 block text-center text-lg font-semibold leading-none text-theme-text-primary">{title}</span>
      <div className="flex w-full flex-col rounded-theme bg-theme-surface p-4 shadow-theme-floating">
        {children}
      </div>
      {resetLabel && onReset && (
        <button className="flex items-center justify-center gap-2 text-base text-theme-accent" onClick={onReset} type="button">
          {resetLabel}
        </button>
      )}
      <div className="flex items-center gap-3">
        <button className={cn(panelActionButtonClass, "bg-theme-surface text-theme-text-primary")} onClick={onCancel} type="button">취소</button>
        <button
          className={cn(panelActionButtonClass, "bg-theme-accent text-theme-text-on-accent")}
          disabled={submitDisabled}
          onClick={onSubmit}
          type="button"
        >
          확인
        </button>
      </div>
    </div>
  );
};
