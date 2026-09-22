'use client';

import { ReactNode, RefObject, useEffect, useRef } from "react";

import { cn } from "@/common/utils/cn";
import { ScrollContainer } from "../ui/ScrollContainer";
import Wordmark from "../ui/Wordmark";
import AppPageTitle from "./AppPageTitle";
import { PageContent, PageContentProps } from "./PageContent";

interface Props {
  afterContent?: ReactNode;
  children: ReactNode;
  contentProps?: PageContentProps;
  pageRef?: RefObject<HTMLDivElement>;
  showScrollToTop?: boolean;
  showMobileLogo?: boolean;
  title?: string;
  description?: string;
  topButton?: ReactNode;
}

const AppPageLayout = ({ afterContent, children, contentProps, pageRef, showScrollToTop = false, showMobileLogo = false, title, description, topButton }: Props) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const hasToolbar = Boolean(topButton);

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
        <div className="flex w-full max-w-[650px] flex-1 flex-col px-[4dvw] pt-8 tablet:px-9 tablet:pt-6 desktop:max-w-[1080px] desktop:px-14">
          {showMobileLogo && <div className="mb-8 tablet:hidden"><Wordmark className="text-[48px]" /></div>}
          {title && <AppPageTitle title={title} description={description} />}
          {hasToolbar && (
            <div ref={toolbarRef} data-component="pageToolbar" className="sticky top-0 z-[91] -mx-[4dvw] mb-4 flex flex-wrap items-center gap-2 px-[4dvw] py-3 tablet:-mx-9 tablet:px-9 desktop:-mx-14 desktop:px-14">
              {topButton}
            </div>
          )}
          <PageContent {...contentProps} className={cn("min-w-0", contentProps?.className)}>
            {children}
          </PageContent>
        </div>
        {afterContent}
      </ScrollContainer>
    </div>
  );
};

export default AppPageLayout;
