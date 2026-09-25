'use client';

import { ReactNode } from "react";

import BottomNav from "@/common/components/ui/BottomNav";
import SideBar from "@/common/components/ui/SideBar";
import { cn } from "@/common/utils/cn";

interface Props {
  children: ReactNode;
}

const layoutClass = "flex w-screen justify-center pl-[var(--safe-left)] pr-[var(--safe-right)]";

const sideBarBaseClass = "hidden h-[100dvh] shrink-0 pt-[var(--safe-top)] pb-[var(--safe-bottom)]";
const sideBarTabletClass = "tablet:block tablet:w-32";
const sideBarDesktopClass = "desktop:w-[200px]";

const contentClass = "flex min-w-0 flex-1 flex-col items-center justify-start";

const bottomNavContainerClass = "pointer-events-none fixed bottom-[var(--safe-bottom)] left-[var(--safe-left)] right-[var(--safe-right)] z-[95] flex h-[var(--mobileNav)] items-center justify-center tablet:hidden";

const ResponsiveAppLayout = ({ children }: Props) => {
  return (
    <div className={layoutClass}>
      <div className={cn(sideBarBaseClass, sideBarTabletClass, sideBarDesktopClass)}>
        <SideBar />
      </div>

      <div className={contentClass}>
        {children}
      </div>

      <div className={bottomNavContainerClass}>
        <BottomNav />
      </div>
    </div>
  );
};

export default ResponsiveAppLayout;
