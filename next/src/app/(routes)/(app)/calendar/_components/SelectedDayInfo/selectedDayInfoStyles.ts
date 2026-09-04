export const selectedDayInfoStyles = {
  card: 'box-border flex w-full flex-col gap-3 rounded-theme bg-theme-surface p-3.5 shadow-theme-section backdrop-blur-xl tablet:p-4',
  loading: 'flex min-h-[180px] items-center justify-center text-sm text-theme-text-tertiary',
  header: {
    container: 'flex items-center justify-between gap-4',
    title: 'text-lg font-semibold text-theme-text-primary',
    description: 'mt-1 text-sm text-theme-text-tertiary',
    emotion: 'h-12 w-12 shrink-0 object-contain',
  },
  section: {
    frame: 'overflow-hidden rounded-theme border border-theme-text-disabled/30',
    header: 'flex min-h-10 items-center justify-between gap-2 px-3',
    title: 'text-sm font-semibold text-theme-text-primary',
    contentInset: 'px-3 pb-3',
    mutedPanel: 'rounded-theme border border-theme-accent/30 bg-theme-bg/70',
  },
  habit: {
    completedStatus: 'text-xs font-semibold text-theme-accent',
    lockedStatus: 'flex items-center gap-1 text-xs text-theme-text-tertiary',
    list: 'flex flex-col gap-2',
    item:
      'flex min-h-10 w-full items-center justify-between gap-2 rounded-theme border border-theme-accent/30 bg-theme-bg/70 px-2.5 text-theme-text-primary transition-opacity',
    toggleButton: 'flex min-w-0 items-center gap-2 text-left',
    selector:
      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-theme-accent/70 text-base transition-colors',
    name: 'min-w-0 truncate text-sm',
    infoButton: 'flex h-8 w-8 shrink-0 items-center justify-center text-theme-text-disabled',
    expandButton: 'flex min-h-8 w-full items-center justify-center gap-1 text-xs font-semibold text-theme-accent',
    emptyState: 'flex min-h-16 items-center justify-center px-3 text-center text-xs text-theme-text-tertiary',
    footnote: 'mt-2 text-[10px] leading-relaxed text-theme-text-tertiary',
  },
  diary: {
    imageFrame: 'relative aspect-square w-full overflow-hidden',
    carouselWithIndicator:
      '[&>div:last-child]:absolute [&>div:last-child]:bottom-1 [&>div:last-child]:z-10',
    body: 'flex flex-col gap-2',
    bodyAfterMedia: 'pt-2',
    text: '[display:-webkit-box] overflow-hidden whitespace-pre-wrap break-words text-sm leading-relaxed text-theme-text-secondary [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',
    openButton: 'flex items-center self-end text-xs font-semibold text-theme-accent',
    futureState:
      'flex min-h-20 items-center justify-center px-3 text-center text-xs leading-relaxed text-theme-text-tertiary',
    emptyState: 'flex min-h-24 flex-col items-center justify-center px-3 py-3 text-center',
    emptyTitle: 'text-sm font-medium text-theme-text-primary',
    emptyDescription: 'mt-1 text-xs text-theme-text-tertiary',
    writeButton:
      'mt-3 flex min-h-9 items-center gap-1.5 rounded-full bg-theme-accent px-4 text-xs font-semibold text-theme-text-on-accent',
  },
} as const;
