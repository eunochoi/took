const CalendarPageSkeleton = () => (
  <section className="pb-4 grid w-full min-w-0 gap-6 p-2 animate-pulse motion-reduce:animate-none desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:items-start desktop:gap-x-8" role="status" aria-label="달력 기록 불러오는 중">
    <div className="flex min-w-0 flex-col gap-6" aria-hidden="true">
      <div className="aspect-square w-full max-w-[500px] rounded-xl bg-theme-skeleton" />
      <div className="aspect-square w-full max-w-[500px] rounded-xl bg-theme-skeleton desktop:hidden" />
    </div>
    <div className="hidden min-w-0 flex-col gap-6 desktop:sticky desktop:top-[max(112px,calc(var(--page-toolbar-height,0px)+24px))] desktop:flex desktop:self-start desktop:border-l desktop:border-theme-border/60 desktop:pl-8" aria-hidden="true">
      <div className="h-36 rounded-xl bg-theme-skeleton" />
      <div className="h-36 rounded-xl bg-theme-skeleton" />
    </div>
  </section>
);

export default CalendarPageSkeleton;
