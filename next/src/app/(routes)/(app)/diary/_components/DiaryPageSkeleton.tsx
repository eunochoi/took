const DiaryPageSkeleton = () => (
  <section className="flex w-full flex-col gap-4 p-2 animate-pulse motion-reduce:animate-none" role="status" aria-label="일기 목록 불러오는 중">
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="h-40 w-full rounded-xl bg-theme-border/70" aria-hidden="true" />
    ))}
  </section>
);

export default DiaryPageSkeleton;
