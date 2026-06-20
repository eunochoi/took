export interface Habit {
  id: number;
  name: string;
  priority: number;
}
export interface HabitItemProps {
  habit: Habit;
}