'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import { formatDateInTimezone, getUserTimezone } from '../../utils/date/userTimezone';
import type { ActionResult } from '../types';
import type { HabitsByDate, HabitsByDateParams } from './types';
import { createAuthErrorResult, createServerErrorResult, validateDateFormat } from './utils';
import { getHabitDateAccess } from './utils/datePolicy';

export const getHabitsByDate = async ({ date }: HabitsByDateParams): Promise<ActionResult<HabitsByDate>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (!validateDateFormat(date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    const { canEdit, isFuture } = await getHabitDateAccess(date);
    if (isFuture) {
      return { ok: true, data: { habits: [], canEdit: false, isFuture: true } };
    }

    const diary = await prisma.diary.findFirst({
      where: { email: auth.email, date },
      select: {
        habits: {
          orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
          select: { id: true, name: true, priority: true, iconKey: true },
        },
      },
    });
    const completedHabits = diary?.habits ?? [];

    if (!canEdit) {
      return {
        ok: true,
        data: {
          habits: completedHabits.map((habit) => ({ ...habit, completed: true })),
          canEdit: false,
          isFuture: false,
        },
      };
    }

    const [timezone, habits] = await Promise.all([
      getUserTimezone(),
      prisma.habit.findMany({
        where: { email: auth.email },
        orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
        select: { id: true, name: true, priority: true, iconKey: true, createdAt: true },
      }),
    ]);
    const completedHabitIds = new Set(completedHabits.map((habit) => habit.id));

    return {
      ok: true,
      data: {
        habits: habits
          .filter((habit) => completedHabitIds.has(habit.id) || formatDateInTimezone(habit.createdAt, timezone) <= date)
          .map((habit) => ({
            id: habit.id,
            name: habit.name,
            priority: habit.priority,
            iconKey: habit.iconKey,
            completed: completedHabitIds.has(habit.id),
          })),
        canEdit: true,
        isFuture: false,
      },
    };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
