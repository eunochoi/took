export type TopButtonSize = 'auto' | 'default';

export const topButtonBaseClass =
  "shadow-theme-action flex h-8 items-center justify-center rounded-full bg-theme-accent text-sm font-medium capitalize text-theme-text-on-accent transition-all duration-200 ease-in-out";

export const topButtonSizeClass: Record<TopButtonSize, string> = {
  auto: "w-auto gap-2 px-2.5",
  default: "w-16",
};
