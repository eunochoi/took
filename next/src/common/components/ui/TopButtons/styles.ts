export type TopButtonSize = 'auto' | 'default';

export const TOP_BUTTON_BASE_CLASS =
  "flex h-8 items-center justify-center rounded-2xl bg-theme text-sm font-medium capitalize text-white shadow-card transition-all duration-200 ease-in-out min-[1025px]:h-9 min-[1025px]:rounded-[18px] min-[1025px]:px-3.5 min-[1025px]:py-1";

export const TOP_BUTTON_SIZE_CLASS: Record<TopButtonSize, string> = {
  auto: "w-auto gap-2 px-3.5",
  default: "w-16",
};
