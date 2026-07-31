'use client';

import { Overlay } from "@/common/components/ui/Overlay";
import { cn } from "@/common/utils/cn";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  resetLabel?: ReactNode;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: () => void;
}

const panelBaseClass =
  "fixed -top-[3px] flex shrink-0 flex-col items-center justify-start overflow-hidden backdrop-blur-2xl";

const panelMobileClass =
  "max-tablet:max-h-[calc(100dvh-var(--mobileHeader))] max-tablet:w-full max-tablet:origin-top max-tablet:gap-5 max-tablet:overflow-y-auto max-tablet:overflow-x-hidden max-tablet:rounded-b-3xl max-tablet:px-6 max-tablet:pb-8 max-tablet:pt-8 max-tablet:shadow-theme-panel-mobile max-tablet:transition-transform max-tablet:duration-200 max-tablet:ease-in-out";

const panelFloatingClass =
  "tablet:left-1/2 tablet:top-[50dvh] tablet:z-[999] tablet:max-h-[80dvh] tablet:w-[400px] tablet:-translate-x-1/2 tablet:-translate-y-1/2 tablet:gap-5 tablet:rounded-theme tablet:px-7 tablet:py-6 tablet:shadow-theme-panel tablet:transition-[opacity,visibility] tablet:duration-200 desktop:w-[450px] desktop:gap-6 desktop:px-10 desktop:py-8";

const panelLandscapeClass =
  "landscape-short:max-h-[calc(100dvh-20px)] landscape-short:justify-start landscape-short:gap-4 landscape-short:overflow-y-auto landscape-short:px-6 landscape-short:py-6";

const panelActionButtonClass = "shrink-0 rounded-full px-5 py-1.5 text-base shadow-card";

export const SelectionPanel = ({
  isOpen,
  title,
  children,
  resetLabel,
  onClose,
  onReset,
  onSubmit,
}: Props) => {
  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      className="max-tablet:z-[98] tablet:z-[105]"
    >
      <div
        className={cn(
          "bg-theme-bg",
          panelBaseClass,
          panelMobileClass,
          panelFloatingClass,
          panelLandscapeClass,
          isOpen
            ? "max-tablet:scale-y-100 tablet:visible tablet:opacity-100"
            : "max-tablet:scale-y-0 tablet:invisible tablet:opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
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
          <button className={cn(panelActionButtonClass, "bg-theme-surface text-theme-text-primary")} onClick={onClose} type="button">취소</button>
          <button className={cn(panelActionButtonClass, "bg-theme-accent text-theme-text-on-accent")} onClick={onSubmit} type="button">확인</button>
        </div>
      </div>
    </Overlay>
  );
};
