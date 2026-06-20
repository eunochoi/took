'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitData, ListParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatHabitData } from './utils';

export const getHabitList = async ({ sort, customOrder = [] }: ListParams): Promise<ActionResult<HabitData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const orderIds = customOrder.map((id) => Number(id)).filter((id) => Number.isFinite(id));

    const habits = await prisma.habit.findMany({
      where: { email: auth.email },
      orderBy: sort === 'DESC'
        ? { createdAt: 'desc' }
        : sort === 'PRIORITY'
          ? [{ priority: 'desc' }, { createdAt: 'asc' }]
          : { createdAt: 'asc' },
    });

    if (sort === 'CUSTOM' && orderIds.length > 0) {
      const orderMap = new Map(orderIds.map((id, index) => [id, index]));
      habits.sort((a, b) => {
        const aOrder = orderMap.get(a.id);
        const bOrder = orderMap.get(b.id);

        if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
    }

    return { ok: true, data: habits.map(formatHabitData) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
