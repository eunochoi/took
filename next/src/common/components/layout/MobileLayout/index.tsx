'use client';

import { ReactNode } from "react";
import MobileNav from "./MobileNav";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

const MobileLayout = ({ modal, children }: Props) => {
  return (
    <div className="flex w-[100dvw] flex-col items-center justify-start min-[480px]:max-[1024px]:ml-[25dvw] min-[480px]:max-[1024px]:w-[75dvw]">
      {modal}
      {children}
      <MobileNav />
    </div>
  );
};

export default MobileLayout;
