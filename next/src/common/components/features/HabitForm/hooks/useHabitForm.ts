import { HABIT_PRIORITY_MIN } from '@/common/constants/habit';
import { DEFAULT_HABIT_ICON_KEY, type HabitIconKey } from '@/common/constants/habitIcons';
import { useState } from 'react';

export const useHabitForm = () => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(HABIT_PRIORITY_MIN);
  const [iconKey, setIconKey] = useState<HabitIconKey>(DEFAULT_HABIT_ICON_KEY);

  return {
    name,
    setName,
    priority,
    setPriority,
    iconKey,
    setIconKey,
  };
};
