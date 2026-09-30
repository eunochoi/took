import { prisma } from '../../../../../lib/prisma';

export const getSortedHabits = async (email: string) => prisma.habit.findMany({
  where: { email },
  orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
});
