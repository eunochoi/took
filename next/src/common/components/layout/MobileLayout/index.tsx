'use client';

import { ReactNode } from "react";
import MobileNav from "./MobileNav";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

const mobileLayoutClass = "flex w-[100dvw] flex-col items-center justify-start tablet:max-desktop:ml-[25dvw] tablet:max-desktop:w-[75dvw]";

const MobileLayout = ({ modal, children }: Props) => {
  return (
    <div className={mobileLayoutClass}>
      {modal}
      {children}
      <MobileNav />
    </div>
  );
};

export default MobileLayout;
