'use server';

import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitData, HabitListParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatHabitData } from './utils';
import { getSortedHabits } from './utils/getSortedHabits';

export const getHabitList = async ({ sortType, priorityFirst = false, customHabitOrder = [] }: HabitListParams): Promise<ActionResult<HabitData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habits = await getSortedHabits({ sortType, priorityFirst, customHabitOrder }, auth.email);

    return { ok: true, data: habits.map(formatHabitData) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
