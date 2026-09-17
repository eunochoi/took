import type { HabitData } from '@/common/actions/habit/types';
import { StarRating } from '@/common/components/ui/StarRating';
import { format } from 'date-fns';

interface Props {
  habitData?: Pick<HabitData, 'name' | 'priority' | 'createdAt'>;
}

const HabitInfoHeader = ({ habitData }: Props) => {
  return (
    <section className="flex w-full flex-col items-center gap-3 pb-1">
      <h1 className="m-0 break-words text-center font-title text-4xl font-semibold tracking-tight text-theme-text-primary">
        {habitData?.name ?? '-'}
      </h1>
      <StarRating maxRating={3} rating={(habitData?.priority ?? 0) + 1} className="items-center justify-center !text-3xl" />
      {habitData && (
        <p className="text-center text-xs text-theme-text-secondary">
          생성일 : {format(new Date(habitData.createdAt), 'yyyy년 M월 d일')}
        </p>
      )}
    </section>
  );
};

export default HabitInfoHeader;
