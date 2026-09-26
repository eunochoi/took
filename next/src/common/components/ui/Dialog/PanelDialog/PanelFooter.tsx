'use client';

import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { PANEL_HORIZONTAL_PADDING_CLASS } from './constants';

type PanelFooterProps = HTMLAttributes<HTMLDivElement>;
const panelFooterClass = "flex h-auto w-full shrink-0 items-center justify-center mb-[max(1rem,env(safe-area-inset-bottom))] mt-3";

export const PanelFooter = forwardRef<HTMLDivElement, PanelFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          panelFooterClass,
          PANEL_HORIZONTAL_PADDING_CLASS,
          className,
        )}
        {...props}
      />
    );
  },
);

PanelFooter.displayName = "PanelFooter";
