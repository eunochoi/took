'use client';

import { ReactNode } from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Overlay = ({ isOpen, onClose, children }: OverlayProps) => {
  return (
    <div
      className={cx(
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
