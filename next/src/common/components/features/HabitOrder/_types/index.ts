import type { HabitData } from "@/common/actions/habit/types";

export type Habit = Pick<HabitData, 'id' | 'name' | 'priority' | 'createdAt'>;
export interface HabitItemProps {
  habit: Habit;
}
