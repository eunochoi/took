'use client';

import { ReactNode, RefObject, useEffect, useRef } from "react";

import { cn } from "@/common/utils/cn";
import { ScrollContainer } from "../ui/ScrollContainer";
import { PageContent, PageContentProps } from "./PageContent";

interface Props {
  afterContent?: ReactNode;
  appPageTopArea?: ReactNode;
  beforeToolbar?: ReactNode;
  children: ReactNode;
  contentWrapperClassName?: string;
  contentProps?: PageContentProps;
  pageRef?: RefObject<HTMLDivElement>;
  showScrollToTop?: boolean;
  toolbar?: ReactNode;
}

export const APP_PAGE_CONTENT_PADDING_CLASS_NAME = "px-[4dvw] pt-8 tablet:px-9 tablet:pt-6 desktop:px-14";

const AppPageLayout = ({ afterContent, appPageTopArea, beforeToolbar, children, contentWrapperClassName, contentProps, pageRef, showScrollToTop = false, toolbar }: Props) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const hasToolbar = Boolean(toolbar);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) {
      layoutRef.current?.style.setProperty('--page-toolbar-height', '0px');
      return;
    }
    const observer = new ResizeObserver(() => {
      layoutRef.current?.style.setProperty('--page-toolbar-height', `${toolbar.getBoundingClientRect().height}px`);
    });
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, [hasToolbar]);

  return (
    <div ref={layoutRef} className="flex h-[100dvh] w-full min-w-0 flex-col">
      <ScrollContainer
        ref={pageRef}
        className="flex min-h-0 flex-1 flex-col items-center justify-start border-none outline-none"
        contentClassName="flex min-h-full flex-col items-center justify-start"
        scrollAreaClassName="flex h-full w-full flex-col items-center justify-start"
        showScrollFade
        showScrollToTop={showScrollToTop}
      >
        <div className={cn("flex w-full max-w-[650px] flex-1 flex-col desktop:max-w-[1080px]", contentWrapperClassName)}>
          {appPageTopArea ?? beforeToolbar}
          {hasToolbar && (
            <div ref={toolbarRef} data-component="pageToolbar" className="sticky top-0 z-[91] mb-4 flex flex-wrap items-center gap-2 py-3">
              {toolbar}
            </div>
          )}
          <PageContent {...contentProps} className={cn("min-w-0", contentProps?.className)}>
            {children}
          </PageContent>
        </div>
      </ScrollContainer>
      {afterContent}
    </div>
  );
};

export default AppPageLayout;
