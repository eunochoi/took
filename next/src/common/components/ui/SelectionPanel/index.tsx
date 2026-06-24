'use client';

import { BackdropLayer } from "@/common/components/ui/BackdropLayer";
import { cn } from "@/common/utils/cn";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  title: string;
  minHeightClassName: string;
  children: ReactNode;
  resetLabel?: ReactNode;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: () => void;
}

const panelBaseClass =
  "fixed -top-[3px] flex shrink-0 flex-col items-center justify-start overflow-hidden backdrop-blur-2xl";

const panelMobileClass =
  "max-[479px]:max-h-[calc(100dvh-var(--mobileHeader))] max-[479px]:w-full max-[479px]:origin-top max-[479px]:gap-5 max-[479px]:overflow-y-auto max-[479px]:overflow-x-hidden max-[479px]:rounded-b-[28px] max-[479px]:px-6 max-[479px]:pb-6 max-[479px]:pt-[calc(var(--mobileHeader)+24px)] max-[479px]:shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-[479px]:transition-transform max-[479px]:duration-300 max-[479px]:ease-in-out";

const panelFloatingClass =
  "min-[480px]:left-1/2 min-[480px]:top-[50dvh] min-[480px]:z-[999] min-[480px]:max-h-[80dvh] min-[480px]:w-[400px] min-[480px]:-translate-x-1/2 min-[480px]:-translate-y-1/2 min-[480px]:gap-5 min-[480px]:rounded-[28px] min-[480px]:px-7 min-[480px]:py-6 min-[480px]:shadow-[0_4px_24px_rgba(0,0,0,0.1)] min-[480px]:transition-[opacity,visibility] min-[480px]:duration-300 min-[1025px]:w-[450px] min-[1025px]:gap-6 min-[1025px]:px-10 min-[1025px]:py-8";

const panelLandscapeClass =
  "[@media(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-20px)] [@media(orientation:landscape)_and_(max-height:600px)]:justify-start [@media(orientation:landscape)_and_(max-height:600px)]:gap-4 [@media(orientation:landscape)_and_(max-height:600px)]:overflow-y-auto [@media(orientation:landscape)_and_(max-height:600px)]:px-6 [@media(orientation:landscape)_and_(max-height:600px)]:py-5 [@media(orientation:landscape)_and_(max-height:600px)]:pt-[calc(var(--mobileHeader)+20px)]";

const panelActionButtonClass = "shrink-0 rounded-[14px] px-5 py-1.5 text-base shadow-card";

export const SelectionPanel = ({
  isOpen,
  title,
  minHeightClassName,
  children,
  resetLabel,
  onClose,
  onReset,
  onSubmit,
}: Props) => {
  return (
    <BackdropLayer isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          panelBaseClass,
          panelMobileClass,
          panelFloatingClass,
          panelLandscapeClass,
          minHeightClassName,
          isOpen
            ? "max-[479px]:scale-y-100 min-[480px]:visible min-[480px]:opacity-100"
            : "max-[479px]:scale-y-0 min-[480px]:invisible min-[480px]:opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "color-mix(in srgb, var(--theme-bg, #f5f5fa) 95%, transparent)" }}
      >
        <span className="mb-3 block text-center text-lg font-semibold leading-none text-grey-title">{title}</span>
        <div className="flex w-full flex-col rounded-[20px] bg-white/90 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          {children}
        </div>
        {resetLabel && onReset && (
          <button className="flex items-center justify-center gap-2 text-base text-theme" onClick={onReset} type="button">
            {resetLabel}
          </button>
        )}
        <div className="flex items-center gap-3">
          <button className={cn(panelActionButtonClass, "bg-white/90 text-grey-title")} onClick={onClose} type="button">취소</button>
          <button className={cn(panelActionButtonClass, "bg-theme text-white")} onClick={onSubmit} type="button">확인</button>
        </div>
      </div>
    </BackdropLayer>
  );
};
