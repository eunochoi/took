const HomePageSkeleton = () => (
  <section
    className="pb-4 grid w-full min-w-0 flex-1 grid-cols-1 items-start gap-14 pt-3 animate-pulse motion-reduce:animate-none desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8"
    role="status"
    aria-label="홈 기록 불러오는 중"
  >
    <div className="flex min-w-0 flex-col gap-14 desktop:gap-20">
      <div className="h-64 rounded-xl bg-theme-border/70" aria-hidden="true" />
      <div className="h-64 rounded-xl bg-theme-border/70" aria-hidden="true" />
      <div className="h-48 rounded-xl bg-theme-border/70" aria-hidden="true" />
    </div>
    <div className="hidden min-w-0 flex-col gap-12 desktop:flex" aria-hidden="true">
      <div className="h-36 rounded-xl bg-theme-border/70" />
      <div className="h-32 rounded-xl bg-theme-border/70" />
    </div>
  </section>
);

export default HomePageSkeleton;
