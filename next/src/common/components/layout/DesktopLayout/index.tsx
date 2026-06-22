'use client';

import { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

const DesktopLayout = ({ modal, children }: Props) => {
  return (
    <div className="flex w-screen justify-center">
      <SideBar />
      <div className="ml-[var(--sidebarWidth)] flex w-[calc(100vw_-_var(--sidebarWidth))] flex-col items-center justify-start">
        {modal}
        {children}
      </div>
    </div>
  );
};

export default DesktopLayout;
