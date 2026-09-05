import type { Habit } from '@prisma/client';
import type { HabitSort } from '../../../types/sort';

export type IdParams = {
  id: string | number | null | undefined;
};

export type HabitListParams = {
  sortType: HabitSort;
  customHabitOrder?: number[];
};

export type HabitDateParams = {
  id: number;
  date: string;
};

export type HabitsByDateParams = {
  date: string;
};

export type HabitYearParams = {
  id: string | null;
  year: string;
};

export type HabitFormParams = {
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

export type HabitByDate = {
  id: number;
  name: string;
  priority: number;
  completed: boolean;
};

export type HabitsByDate = {
  habits: HabitByDate[];
  canEdit: boolean;
  isFuture: boolean;
};
