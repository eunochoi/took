'use client';

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/common/utils/cn";
import { BottomSafe } from "../ui/BottomSafe";
import { ScrollContainer } from "../ui/ScrollContainer";
import { EnterMotion } from "./EnterMotion";

interface Props {
  topSection?: ReactNode;
  mainSection: ReactNode;
  pageRef?: RefObject<HTMLDivElement>;
  showScrollToTop?: boolean;
  toolbar?: ReactNode;
  bottomSectionClass?: string;
}

export const TOP_SECTION_WRAPPER_CLASS = "w-full px-[5dvw] pt-[5dvw] tablet:px-9 tablet:pt-6 desktop:px-14 bg-theme-accent-light bg-[linear-gradient(to_bottom,rgb(var(--theme-accent-light))_0%,transparent_20%),linear-gradient(to_top_right,rgb(var(--theme-accent)/0.15)_0%,rgb(var(--theme-accent-light))_100%)]";

const AppPageLayout = ({ topSection, mainSection, pageRef, showScrollToTop = false, toolbar, bottomSectionClass }: Props) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const hasToolbar = Boolean(toolbar);
  const hasTopSection = Boolean(topSection);

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
        scrollAreaClassName={cn("flex h-full w-full flex-col items-center justify-start")}
        showScrollFade
        showScrollToTop={showScrollToTop}
      >
        {/* top section */}
        {hasTopSection && <div className={TOP_SECTION_WRAPPER_CLASS}>{topSection}</div>}
        {/* bottom section : toolbar + main */}
        <div className={twMerge(
          "w-full h-auto flex flex-col",
          "flex-1 bg-theme-surface px-[5dvw] py-2 pb-0 tablet:px-9 tablet:py-4 desktop:px-14 desktop:py-8",
          bottomSectionClass)} >
          {/* bottom section container for max width */}
          <div className="flex flex-col w-full tablet:max-w-[500px] desktop:max-w-[900px] mx-auto">
            {/* toolbar section */}
            {hasToolbar && (
              <div ref={toolbarRef} data-component="pageToolbar" className={twMerge("sticky top-0 z-[91] mb-4 -mx-1 flex flex-wrap items-center gap-2 py-4")}>
                {toolbar}
              </div>
            )}
            {/* main section */}
            <EnterMotion>
              {mainSection}
            </EnterMotion>
          </div>
          <BottomSafe />
        </div>
      </ScrollContainer>
    </div>
  );
};

export default AppPageLayout;
