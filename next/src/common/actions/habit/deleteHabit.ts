'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { DeleteHabitParams } from './types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

export const deleteHabit = async ({ habitId }: DeleteHabitParams): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, email: auth.email },
    });

    if (!habit) {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }

    await prisma.habit.delete({
      where: { id: habit.id },
    });

    return { ok: true, data: '습관이 삭제되었습니다.' };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
