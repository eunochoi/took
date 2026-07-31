'use client';

import { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

const desktopLayoutClass = "flex w-screen justify-center";
const desktopContentClass = "ml-[var(--sidebarWidth)] flex w-[calc(100vw_-_var(--sidebarWidth))] flex-col items-center justify-start";

const DesktopLayout = ({ modal, children }: Props) => {
  return (
    <div className={desktopLayoutClass}>
      <SideBar />
      <div className={desktopContentClass}>
        {modal}
        {children}
      </div>
    </div>
  );
};

export default DesktopLayout;
