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
  "flex h-fit max-h-full min-h-0 w-full flex-col gap-6 overflow-y-auto overflow-x-hidden px-6 pb-8 pt-8 tablet:px-7 tablet:py-6 desktop:px-10 desktop:py-8 landscape-short:gap-4 landscape-short:px-6 landscape-short:py-6";
const panelActionButtonClass = "min-h-10 shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50";

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
      <h2 className="font-title text-xl font-bold text-theme-text-primary">{title}</h2>
      <div className="w-full min-w-0">
        {children}
      </div>
      <div className="flex w-full flex-wrap items-center gap-3 border-t border-theme-border/60 pt-6">
        {resetLabel && onReset && (
          <button className={cn(panelActionButtonClass, "mr-auto flex items-center gap-1 bg-theme-bg text-theme-text-secondary")} onClick={onReset} type="button">
            {resetLabel}
          </button>
        )}
        <div className="ml-auto flex items-center gap-3">
          <button className={cn(panelActionButtonClass, "bg-theme-bg text-theme-text-secondary")} onClick={onCancel} type="button">취소</button>
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
    </div>
  );
};
