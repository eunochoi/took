'use client';

import { cn } from "@/common/utils/cn";
import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const overlayClass = "fixed left-0 top-0 h-[100dvh] w-[100dvw] bg-theme-overlay/5 backdrop-blur-xl transition-[opacity,visibility] duration-200 ease-in-out";

export const Overlay = ({ isOpen, onClose, children, className }: Props) => {
  return (
    <div
      className={cn(
        overlayClass,
        isOpen ? "visible opacity-100" : "invisible opacity-0",
        className,
      )}
      onClick={onClose}
    >
      {children}
    </div>
  );
};
