'use server';

import type { Prisma } from '@prisma/client';
import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitData, HabitListParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatHabitData } from './utils';

export const getHabitList = async ({ sortType, priorityFirst = false, customHabitOrder = [] }: HabitListParams): Promise<ActionResult<HabitData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const orderIds = customHabitOrder.map((id) => Number(id)).filter((id) => Number.isFinite(id));
    const dateOrder = sortType === 'ASC' ? 'asc' : 'desc';
    const orderBy: Prisma.HabitOrderByWithRelationInput[] = priorityFirst && sortType !== 'CUSTOM'
      ? [{ priority: 'desc' }, { createdAt: dateOrder }, { id: 'asc' }]
      : [{ createdAt: dateOrder }, { id: 'asc' }];

    const habits = await prisma.habit.findMany({
      where: { email: auth.email },
      orderBy,
    });

    if (sortType === 'CUSTOM' && orderIds.length > 0) {
      const orderMap = new Map(orderIds.map((id, index) => [id, index]));
      habits.sort((a, b) => {
        const aOrder = orderMap.get(a.id);
        const bOrder = orderMap.get(b.id);

        if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime() || a.id - b.id;
      });
    }

    return { ok: true, data: habits.map(formatHabitData) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
