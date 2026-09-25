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
const panelActionButtonClass = "min-h-10 shrink-0 px-2 text-base font-semibold";

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
      <div className="flex w-full items-center gap-3 border-t border-theme-border/60 pt-3">
        {resetLabel && onReset && (
          <button className="mr-auto flex min-h-10 items-center gap-1 text-sm text-theme-text-secondary" onClick={onReset} type="button">
            {resetLabel}
          </button>
        )}
        <div className="ml-auto flex items-center gap-3">
          <button className={cn(panelActionButtonClass, "text-theme-text-secondary")} onClick={onCancel} type="button">취소</button>
          <button
            className={cn(panelActionButtonClass, "border-b border-theme-accent text-theme-accent disabled:text-theme-text-disabled")}
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
