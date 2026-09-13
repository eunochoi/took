import { selectedDayInfoStyles } from '../selectedDayInfoStyles';

interface Props {
  message: string;
}

const SelectedDayHabitEmptyState = ({ message }: Props) => (
  <p className={selectedDayInfoStyles.habit.emptyMessage}>{message}</p>
);

export default SelectedDayHabitEmptyState;
