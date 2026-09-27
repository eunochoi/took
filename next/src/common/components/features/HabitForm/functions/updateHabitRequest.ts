import { updateHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import type { HabitData } from '@/common/actions/habit';
import type { HabitIconKey } from '@/common/constants/habitIcons';

type UpdateHabitRequestParams = {
  habitId: string;
  name: string;
  priority: number;
  iconKey: HabitIconKey;
};

export const updateHabitRequest = async ({
  habitId,
  name,
  priority,
  iconKey,
}: UpdateHabitRequestParams): Promise<HabitData> =>
  authAction(() =>
    updateHabit({
      habitId,
      habitName: name,
      priority,
      iconKey,
    }),
  );
