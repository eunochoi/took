'use client';

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { BG_TRANSITION_CLASS } from "@/common/constants/transitions";
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
  bottomSafeClassName?: string;
}

export const TOP_SECTION_WRAPPER_CLASS = "w-full px-[5dvw] pt-[5dvw] bg-theme-accent-light tablet:px-9 tablet:pt-6 desktop:px-14";

const AppPageLayout = ({ topSection, mainSection, pageRef, showScrollToTop = false, toolbar, bottomSectionClass, bottomSafeClassName }: Props) => {
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
        className="flex min-h-0 flex-1 flex-col items-center justify-start border-none"
        contentClassName="flex min-h-full flex-col items-center justify-start"
        scrollAreaClassName={cn("flex h-full w-full flex-col items-center justify-start")}
        showScrollFade
        showScrollToTop={showScrollToTop}
      >
        {/* top section */}
        {hasTopSection && <div className={twMerge(TOP_SECTION_WRAPPER_CLASS,
          BG_TRANSITION_CLASS)}>{topSection}</div>}
        {/* bottom section : toolbar + main */}
        <div className={twMerge(BG_TRANSITION_CLASS,
          "w-full h-auto flex flex-col",
          "flex-1 bg-theme-surface px-[5dvw] py-2 pb-0 tablet:px-9 tablet:py-4 desktop:px-14 desktop:pt-6 desktop:pb-24 ",
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
          <BottomSafe className={(twMerge(bottomSafeClassName), "desktop:hidden ")} />
        </div>
      </ScrollContainer>
    </div>
  );
};

export default AppPageLayout;
