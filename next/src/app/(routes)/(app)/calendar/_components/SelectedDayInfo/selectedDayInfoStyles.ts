export const selectedDayInfoStyles = {
  card: 'box-border flex w-full flex-col gap-3 rounded-theme bg-theme-surface p-3.5 shadow-theme-section backdrop-blur-xl tablet:p-4',
  header: {
    container: 'flex items-center justify-between gap-4 border-b border-theme-border/60 pb-3',
    title: 'text-lg font-semibold text-theme-text-primary',
    icon: 'h-9 w-9 shrink-0 text-theme-accent',
    description: 'mt-1 text-sm text-theme-text-tertiary',
    emotion: 'h-12 w-12 shrink-0 object-contain',
  },
  section: {
    frame: 'min-w-0 py-3 first:pt-0 last:pb-0',
    header: 'flex items-center justify-between gap-2 py-2',
    title: 'text-base font-semibold text-theme-text-primary',
    contentInset: 'pb-1',
  },
  habit: {
    completedStatus: 'text-xs desktop:text-sm font-semibold text-theme-accent',
    lockedStatus: 'flex items-center gap-1 text-xs desktop:text-sm text-theme-text-tertiary',
    list: 'flex flex-col gap-2',
    item:
      'flex w-full items-center justify-between transition-opacity',
    toggleButton: 'flex min-h-9 min-w-0 items-center gap-2.5 rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent',
    selector:
      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors duration-150 motion-reduce:transition-none',
    name: 'min-w-0 truncate text-sm',
    infoButton: 'flex h-6 w-6 shrink-0 items-center justify-center text-theme-text-disabled',
    expandButton: 'flex min-h-8 w-full items-center justify-center gap-1 text-xs desktop:text-sm font-semibold text-theme-accent',
    emptyMessage: 'text-center text-xs desktop:text-sm leading-relaxed text-theme-text-tertiary',
  },
  diary: {
    imageFrame: 'relative aspect-square w-full overflow-hidden',
    carouselWithIndicator:
      '[&>div:last-child]:absolute [&>div:last-child]:bottom-1 [&>div:last-child]:z-10',
    body: 'flex flex-col gap-2',
    bodyAfterMedia: 'pt-2',
    text: '[display:-webkit-box] overflow-hidden whitespace-pre-wrap break-words text-sm leading-relaxed text-theme-text-secondary [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',
    openButton: 'flex items-center self-end text-xs desktop:text-sm font-semibold text-theme-accent',
    futureState:
      'text-xs desktop:text-sm leading-relaxed text-theme-text-tertiary',
    emptyTitle: 'text-sm font-medium text-theme-text-primary',
    emptyDescription: 'mt-1 text-xs desktop:text-sm text-theme-text-tertiary',
    writeButton:
      'mt-3 flex min-h-9 items-center gap-1.5 rounded-full bg-theme-accent px-4 text-xs desktop:text-sm font-semibold text-theme-text-on-accent',
  },
} as const;
