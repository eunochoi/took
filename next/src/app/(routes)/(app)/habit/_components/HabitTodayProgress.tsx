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
      <header className="text-xl font-title font-semibold text-theme-text-primary">오늘의 습관</header>
      <p className="mt-1 text-base text-theme-text-tertiary">
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
