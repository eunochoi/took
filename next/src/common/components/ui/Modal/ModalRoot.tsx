'use client';

import { cn } from "@/common/utils/cn";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const modalContainerClass = "fixed left-0 top-0 z-[99999] flex h-[100dvh] w-[100dvw] items-center justify-center backdrop-blur";
const modalContentClass = "flex h-full w-full flex-col overflow-hidden rounded-none bg-theme-bg transition-all duration-300 ease-in-out";
const modalDesktopClass = "min-[1025px]:h-[85dvh] min-[1025px]:max-h-[85%] min-[1025px]:w-[500px] min-[1025px]:rounded-[28px] min-[1025px]:shadow-[0_8px_32px_rgba(0,0,0,0.12)]";

export const ModalRoot = ({ className, children }: Props) => {
  const router = useRouter();
  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div
      className={modalContainerClass}
      onClick={closeModal}
    >
      <div
        className={cn(
          modalContentClass,
          modalDesktopClass,
          className,
        )}
        onClick={(e) => { e.stopPropagation(); }}
      >
        {children}
      </div>
    </div>
  );
};
