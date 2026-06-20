'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitData, HabitInputParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatHabitData, parseHabitId } from './utils';

export const updateHabit = async ({ habitId, habitName, priority }: HabitInputParams): Promise<ActionResult<HabitData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const parsedHabitId = parseHabitId(habitId);
    if (!parsedHabitId || habitName == null || typeof habitName !== 'string' || !habitName.trim()) {
      return { ok: false, code: 'INVALID_HABIT_INPUT', message: 'habitId와 habitName은 필수이며 habitName은 비어있을 수 없습니다.' };
    }

    const habit = await prisma.habit.findFirst({
      where: { id: parsedHabitId, email: auth.email },
    });

    if (!habit) {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }

    const duplicateName = await prisma.habit.findFirst({
      where: {
        email: auth.email,
        name: habitName,
        id: { not: parsedHabitId },
      },
    });

    if (duplicateName) {
      return { ok: false, code: 'DUPLICATE_HABIT_NAME', message: '동일한 이름의 습관이 존재합니다.' };
    }

    const updatedHabit = await prisma.habit.update({
      where: { id: habit.id },
      data: { name: habitName, priority },
    });

    return { ok: true, data: formatHabitData(updatedHabit) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
