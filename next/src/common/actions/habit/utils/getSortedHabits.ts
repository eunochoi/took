import type { Prisma } from '@prisma/client';
import { prisma } from '../../../../../lib/prisma';
import type { HabitListParams } from '../types';

export const getSortedHabits = async ({ sortType, priorityFirst = false, customHabitOrder = [] }: HabitListParams, email: string) => {
  const orderIds = customHabitOrder.map((id) => Number(id)).filter((id) => Number.isFinite(id));
  const dateOrder = sortType === 'ASC' ? 'asc' : 'desc';
  const orderBy: Prisma.HabitOrderByWithRelationInput[] = priorityFirst && sortType !== 'CUSTOM'
    ? [{ priority: 'desc' }, { createdAt: dateOrder }, { id: 'asc' }]
    : [{ createdAt: dateOrder }, { id: 'asc' }];

  const habits = await prisma.habit.findMany({
    where: { email },
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

  return habits;
};
