import { cn } from '@/common/utils/cn';
import { selectedDayInfoStyles } from '../selectedDayInfoStyles';

interface Props {
  message: string;
}

const SelectedDayHabitEmptyState = ({ message }: Props) => (
  <div className={cn(selectedDayInfoStyles.section.mutedPanel, selectedDayInfoStyles.habit.emptyState)}>
    {message}
  </div>
);

export default SelectedDayHabitEmptyState;
