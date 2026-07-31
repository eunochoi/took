'use client';

import { ReactNode } from "react";
import { inputCardClass } from "../constants";

interface DiaryInputCardProps {
  children: ReactNode;
}

export const DiaryInputCard = ({ children }: DiaryInputCardProps) => {
  return (
    <div className={inputCardClass}>
      {children}
    </div>
  );
};
