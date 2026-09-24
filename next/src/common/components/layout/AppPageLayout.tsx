'use client';

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/common/utils/cn";
import { ScrollContainer } from "../ui/ScrollContainer";
import { PageContent } from "./PageContent";


interface Props {
  appPageTopArea?: ReactNode;
  children: ReactNode;
  contentWrapperClassName?: string;
  pageRef?: RefObject<HTMLDivElement>;
  showScrollToTop?: boolean;
  toolbar?: ReactNode;
  mainAreaClassName?: string;
}

export const APP_PAGE_CONTENT_PADDING_CLASS_NAME = "px-[4dvw] pt-8 tablet:px-9 tablet:pt-6 desktop:px-14";

const AppPageLayout = ({ appPageTopArea, children, contentWrapperClassName, pageRef, showScrollToTop = false, toolbar, mainAreaClassName }: Props) => {
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
        <div className={cn("flex w-full flex-1 flex-col", contentWrapperClassName)}>
          {appPageTopArea}
          <div className={twMerge("w-full h-auto flex flex-col max-tablet:pb-[var(--mobileNav)] tablet:pb-9", mainAreaClassName)} >
            {hasToolbar && (
              <div ref={toolbarRef} data-component="pageToolbar" className={twMerge("sticky top-0 z-[91] mb-4 flex flex-wrap items-center gap-2 py-4")}>
                {toolbar}
              </div>
            )}
            <PageContent className="min-w-0">
              {children}
            </PageContent>
          </div>
        </div>
      </ScrollContainer>
    </div>
  );
};

export default AppPageLayout;
