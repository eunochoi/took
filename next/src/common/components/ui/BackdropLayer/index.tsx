'use client';

import { cn } from "@/common/utils/cn";
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BackdropLayer = ({ isOpen, onClose, children }: Props) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-[100dvh] w-[100dvw] bg-[rgba(75,75,75,0.05)] backdrop-blur-xl transition-[opacity,visibility] duration-300 ease-in-out",
        "max-[479px]:z-[98] min-[480px]:z-[105]",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
      )}
      onClick={onClose}
    >
      {children}
    </div>
  );
};
