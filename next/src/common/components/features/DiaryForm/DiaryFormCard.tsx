import type { ReactNode } from 'react';

const inputCardClass =
  "flex w-full shrink-0 flex-col items-stretch gap-4 rounded-theme bg-theme-surface p-4 shadow-card";

interface DiaryFormCardProps {
  children: ReactNode;
}

export const DiaryFormCard = ({ children }: DiaryFormCardProps) => {
  return (
    <div className={inputCardClass}>
      {children}
    </div>
  );
};
