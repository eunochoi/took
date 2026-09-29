const HabitBoxRecentSkeleton = () => (
  <div className="mt-auto flex flex-col gap-4 animate-pulse motion-reduce:animate-none" role="status" aria-label="최근 습관 기록 불러오는 중">
    <div className="grid grid-cols-4 justify-items-center" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="flex h-[68px] items-end">
          <span className="h-5 w-5 rounded-full bg-theme-border/70" />
        </div>
      ))}
    </div>
    <div className="h-10 w-full rounded-xl bg-theme-border/70" aria-hidden="true" />
  </div>
);

export default HabitBoxRecentSkeleton;
