import type { User } from '@prisma/client';

export type CurrentUser = Pick<
  User,
  'id' | 'email' | 'provider' | 'currentStreakDays' | 'longestStreakDays' | 'createdAt'
>;
