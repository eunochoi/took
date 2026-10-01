const HomePageSkeleton = () => (
  <section
    className="pt-4 grid w-full min-w-0 flex-1 grid-cols-1 items-start gap-14 animate-pulse motion-reduce:animate-none desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8"
    role="status"
    aria-label="홈 기록 불러오는 중"
  >
    <div className="flex min-w-0 flex-col gap-14 desktop:gap-20">
      <div className="h-64 rounded-xl bg-theme-skeleton" aria-hidden="true" />
      <div className="h-64 rounded-xl bg-theme-skeleton" aria-hidden="true" />
      <div className="h-48 rounded-xl bg-theme-skeleton" aria-hidden="true" />
    </div>
    <div className="hidden min-w-0 flex-col gap-12 desktop:sticky desktop:top-[max(112px,calc(var(--page-toolbar-height,0px)+24px))] desktop:flex desktop:self-start desktop:border-l desktop:border-theme-border/60 desktop:pl-8" aria-hidden="true">
      <div className="h-36 rounded-xl bg-theme-skeleton" />
      <div className="h-32 rounded-xl bg-theme-skeleton" />
    </div>
  </section>
);

export default HomePageSkeleton;
