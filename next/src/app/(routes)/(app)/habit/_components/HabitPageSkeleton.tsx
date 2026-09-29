const HabitPageSkeleton = () => (
  <section className="p-2 flex w-full flex-col gap-6 animate-pulse motion-reduce:animate-none" role="status" aria-label="습관 목록 불러오는 중">
    <div className="desktop:hidden h-24 w-full rounded-xl bg-theme-border/70" aria-hidden="true" />
    <div className="grid w-full grid-cols-2 gap-3" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="h-64 rounded-xl bg-theme-border/70" />
      ))}
    </div>
  </section>
);

export default HabitPageSkeleton;
