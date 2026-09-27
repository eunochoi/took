import type { HabitData } from '@/common/actions/habit/types';
import HabitIcon from '@/common/components/ui/HabitIcon';
import { StarRating } from '@/common/components/ui/StarRating';
import { format } from 'date-fns';

interface Props {
  habitData?: Pick<HabitData, 'name' | 'priority' | 'createdAt' | 'iconKey'>;
}

const HabitInfoHeader = ({ habitData }: Props) => {
  return (
    <header className="flex w-full min-w-0 flex-col gap-4 py-6">
      <div className="flex flex-col min-w-0 justify-center items-center gap-4">
        <HabitIcon iconKey={habitData?.iconKey} className="shrink-0 text-4xl" />
        <h1 className="m-0 min-w-0 break-words font-title text-3xl font-semibold leading-tight text-theme-text-primary">
          {habitData?.name ?? '-'}
        </h1>
      </div>
      {habitData && (
        <div className="flex flex-col flex-wrap items-center gap-x-5 gap-y-2 text-sm text-theme-text-secondary">
          <span className="flex items-center gap-2">
            우선순위
            <StarRating maxRating={3} rating={habitData.priority + 1} className="gap-0.5 text-base text-theme-accent" />
          </span>
          <span>생성일 {format(new Date(habitData.createdAt), 'yyyy년 M월 d일')}</span>
        </div>
      )}
    </header>
  );
};

export default HabitInfoHeader;
