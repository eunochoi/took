'use client';

import { cn } from "@/common/utils/cn";
import { Overlay } from "../Overlay";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const modalContentClass = "flex h-full w-full flex-col overflow-hidden rounded-none bg-theme-bg transition-all duration-200 ease-in-out";
const modalDesktopClass = "min-[1025px]:h-[85dvh] min-[1025px]:max-h-[85%] min-[1025px]:w-[500px] min-[1025px]:rounded-2xl min-[1025px]:shadow-theme-modal";

export const RouteModal = ({ className, children }: Props) => {
  const router = useRouter();
  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Overlay
      isOpen
      onClose={closeModal}
      className="z-[99999] flex items-center justify-center"
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
    </Overlay>
  );
};
