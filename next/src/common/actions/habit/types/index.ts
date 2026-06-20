import type { Habit } from '@prisma/client';

export type IdParams = {
  id: string | number | null | undefined;
};

export type ListParams = {
  sort: string;
  customOrder?: number[];
};

export type HabitDateParams = {
  id: number;
  date: string;
};

export type HabitMonthParams = {
  id: string | null;
  month: string;
};

export type HabitYearParams = {
  id: string | null;
  year: string;
};

export type HabitInputParams = {
  habitId?: string | number | null;
  habitName: string;
  priority: number;
};

export type DeleteHabitParams = {
  habitId: number;
};

export type CheckHabitParams = {
  habitId: number;
  date: string;
};

export type HabitData = Omit<Habit, 'userId' | 'createdAt' | 'updatedAt'> & {
  UserId: number;
  createdAt: string;
  updatedAt: string;
};

export type TodayHabitStat = {
  createdHabits: number;
  todayDoneHabits: number;
};

export type HabitMonthlyStatus = {
  date: string;
  Habits: { name: string }[];
};
