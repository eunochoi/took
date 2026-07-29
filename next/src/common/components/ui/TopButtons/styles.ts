export type TopButtonSize = 'auto' | 'default';

export const TOP_BUTTON_BASE_CLASS =
  "shadow-[0_2px_8px_rgb(var(--theme-shadow-color)/0.1)] flex h-8 items-center justify-center rounded-[999px] bg-theme-accent text-sm font-medium capitalize text-theme-text-on-accent transition-all duration-200 ease-in-out";

export const TOP_BUTTON_SIZE_CLASS: Record<TopButtonSize, string> = {
  auto: "w-auto gap-2 px-2.5",
  default: "w-16",
};
