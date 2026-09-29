const CalendarPageSkeleton = () => (
  <section className="flex w-full flex-col gap-6 p-2 animate-pulse motion-reduce:animate-none" role="status" aria-label="달력 기록 불러오는 중">
    {Array.from({ length: 2 }, (_, index) => (
      <div key={index} className="aspect-square w-full max-w-[500px] rounded-xl bg-theme-border/70" aria-hidden="true" />
    ))}
  </section>
);

export default CalendarPageSkeleton;
