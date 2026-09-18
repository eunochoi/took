import { createHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import type { HabitData } from '@/common/actions/habit';
import type { HabitIconKey } from '@/common/constants/habitIcons';

type CreateHabitRequestParams = {
  name: string;
  priority: number;
  iconKey: HabitIconKey;
};

export const createHabitRequest = async ({
  name,
  priority,
  iconKey,
}: CreateHabitRequestParams): Promise<HabitData> =>
  authAction(() =>
    createHabit({
      habitName: name,
      priority,
      iconKey,
    }),
  );
