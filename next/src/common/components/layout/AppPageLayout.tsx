'use client';

import { ReactNode, RefObject } from "react";

import { cn } from "@/common/utils/cn";
import { ScrollContainer } from "../ui/ScrollContainer";
import { PageContent, PageContentProps } from "./PageContent";

interface Props {
  afterContent?: ReactNode;
  children: ReactNode;
  contentProps?: PageContentProps;
  pageRef?: RefObject<HTMLDivElement>;
  showScrollToTop?: boolean;
  topButton?: ReactNode;
}

const AppPageLayout = ({ afterContent, children, contentProps, pageRef, showScrollToTop = false, topButton }: Props) => {
  return (
    <ScrollContainer
      ref={pageRef}
      className="flex h-[100dvh] flex-col items-center justify-start border-none outline-none"
      contentClassName="flex min-h-full flex-col items-center justify-start"
      fadeSizeClassName="h-[70px]"
      scrollAreaClassName="flex h-full w-full flex-col items-center justify-start"
      showScrollFade
      showScrollToTop={showScrollToTop}
    >
      {topButton && (
        <div className="sticky top-0 z-[91] flex h-[var(--mobileHeader)] w-full shrink-0 items-center justify-end gap-1.5 px-[4dvw] tablet:px-5 desktop:px-12">
          {topButton}
        </div>
      )}

      <PageContent {...contentProps} className={cn("desktop:max-w-[1200px]", contentProps?.className)}>
        {children}
      </PageContent>

      {afterContent}
    </ScrollContainer>
  );
};

export default AppPageLayout;
