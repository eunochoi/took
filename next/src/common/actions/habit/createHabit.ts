'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import { MAX_HABIT_COUNT } from './constants';
import type { HabitData, HabitInputParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatHabitData } from './utils';

export const createHabit = async ({ habitName, priority }: HabitInputParams): Promise<ActionResult<HabitData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (habitName == null || typeof habitName !== 'string' || !habitName.trim()) {
      return { ok: false, code: 'INVALID_HABIT_NAME', message: 'habitName은 필수이며 비어있을 수 없습니다.' };
    }

    const user = await prisma.user.findUnique({
      where: { email: auth.email },
      select: { id: true },
    });

    if (!user) {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저가 존재하지 않습니다.' };
    }

    const existingHabit = await prisma.habit.findFirst({
      where: { userId: user.id, name: habitName },
    });

    if (existingHabit) {
      return { ok: false, code: 'DUPLICATE_HABIT_NAME', message: '같은 이름을 가진 습관이 이미 존재합니다.' };
    }

    const habitCount = await prisma.habit.count({
      where: { userId: user.id },
    });

    if (habitCount >= MAX_HABIT_COUNT) {
      return { ok: false, code: 'HABIT_LIMIT_EXCEEDED', message: '습관은 최대 18개까지 생성 가능합니다.' };
    }

    const habit = await prisma.habit.create({
      data: {
        userId: user.id,
        email: auth.email,
        name: habitName,
        priority,
      },
    });

    return { ok: true, data: formatHabitData(habit) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
