import { ReactNode } from "react";
import { inputCardClass } from "../constants";

interface HabitInputCardProps {
  children: ReactNode;
}

export const HabitInputCard = ({ children }: HabitInputCardProps) => {
  return (
    <div className={inputCardClass}>
      {children}
    </div>
  );
};
