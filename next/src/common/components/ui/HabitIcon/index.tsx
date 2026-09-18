import { getHabitIconKey, HABIT_ICONS } from '@/common/constants/habitIcons';
import { cn } from '@/common/utils/cn';

interface HabitIconProps {
  iconKey?: string | null;
  className?: string;
}

const HabitIcon = ({ iconKey, className }: HabitIconProps) => {
  const Icon = HABIT_ICONS[getHabitIconKey(iconKey)];

  return (
    <Icon
      className={cn('text-theme-accent', className)}
      aria-hidden="true"
      focusable="false"
    />
  );
};

export default HabitIcon;
