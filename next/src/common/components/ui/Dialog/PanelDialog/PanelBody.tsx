'use client';

import { ScrollContainer } from "@/common/components/ui/ScrollContainer";
import { ReactNode } from "react";
import { PANEL_HORIZONTAL_PADDING_CLASS } from './constants';

interface PanelBodyProps {
  children: ReactNode;
  showScrollFade?: boolean;
  showScrollToTop?: boolean;
}

export const PanelBody = ({
  children,
  showScrollFade = false,
  showScrollToTop = false,
}: PanelBodyProps) => {
  return (
    <ScrollContainer
      className="flex min-h-0 flex-1"
      contentClassName={PANEL_HORIZONTAL_PADDING_CLASS}
      showScrollFade={showScrollFade}
      showScrollToTop={showScrollToTop}
    >
      {children}
    </ScrollContainer>
  );
};
