import HabitProgressRing from "./HabitProgressRing";

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
}

const HabitTodayProgress = ({ completedCount, rate, totalCount }: Props) => (
  <section
    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"
    aria-labelledby="today-habit-progress-title"
  >
    <div className="min-w-0">
      <h2 id="today-habit-progress-title" className="text-base font-semibold text-theme-text-primary">
        오늘의 습관
      </h2>
      <p className="mt-1 text-sm text-theme-text-tertiary">
        {totalCount}개 중 {completedCount}개를 완료했어요.
      </p>
    </div>

    <HabitProgressRing
      completedCount={completedCount}
      rate={rate}
      totalCount={totalCount}
      className="h-24 w-24 tablet:h-28 tablet:w-28"
    />
  </section>
);

export default HabitTodayProgress;
