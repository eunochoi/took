import HabitProgressRing from "./HabitProgressRing";

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
}

const HabitTodayProgress = ({ completedCount, rate, totalCount }: Props) => (
  <section className="flex w-full justify-between gap-4">
    <div className="flex flex-col justify-evenly min-w-0" >
      <header className="text-lg font-title font-semibold text-theme-text-primary">오늘의 습관</header>
      <div className="flex items-baseline">
        <span className="text-2xl text-theme-accent ">{completedCount}</span>
        <span className="ml-1 text-sm font-semibold text-theme-text-tertiary">/ {totalCount} 완료</span>
      </div>
    </div >

    <HabitProgressRing
      completedCount={completedCount}
      rate={rate}
      totalCount={totalCount}
      className="h-28 w-28 tablet:h-32 tablet:w-32"
    />
  </section>
);

export default HabitTodayProgress;
