'use client';

import { ReactNode } from "react";

interface DiaryInputCardProps {
  children: ReactNode;
}

export const DiaryInputCard = ({ children }: DiaryInputCardProps) => {
  return (
    <div className="flex w-full shrink-0 flex-col items-stretch gap-4 rounded-2xl bg-white/90 p-4 shadow-card">
      {children}
    </div>
  );
};
