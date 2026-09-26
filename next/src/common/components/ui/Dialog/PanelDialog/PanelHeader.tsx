'use client';

import { cn } from "@/common/utils/cn";
import { MdArrowBackIos } from 'react-icons/md';
import { PANEL_HORIZONTAL_PADDING_CLASS } from './constants';

interface PanelHeaderProps {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
}

const panelHeaderClass = "relative flex h-[var(--panel-header-height)] w-full shrink-0 items-center justify-between";
const panelHeaderButtonClass = "text-xl flex items-center justify-center text-theme-accent";
const panelHeaderTitleClass = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-title text-base font-semibold text-theme-text-primary";

export const PanelHeader = ({
  title,
  onBack,
  backLabel = '패널 닫기',
}: PanelHeaderProps) => {
  return (
    <div
      className={cn(
        panelHeaderClass,
        PANEL_HORIZONTAL_PADDING_CLASS,
      )}
    >
      {onBack ? (
        <button
          aria-label={backLabel}
          className={panelHeaderButtonClass}
          onClick={onBack}
          type="button"
        >
          <MdArrowBackIos />
        </button>
      ) : <span />}
      {title ? (
        <span className={panelHeaderTitleClass}>
          {title}
        </span>
      ) : null}
    </div>
  );
};
