export const PICKER_CONTENT_CLASS = 'flex w-full flex-col gap-6 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 tablet:px-7 tablet:py-6 desktop:px-10 desktop:py-8 landscape-short:gap-4 landscape-short:px-6 landscape-short:py-6';
export const PICKER_TITLE_CLASS = 'font-title text-xl font-bold text-theme-text-primary';
export const PICKER_BODY_CLASS = 'w-full min-w-0';
export const PICKER_ACTIONS_CLASS = 'flex w-full flex-wrap items-center gap-3 border-t border-theme-border/60 pt-6';
export const PICKER_ACTION_GROUP_CLASS = 'ml-auto flex items-center gap-3';

const PICKER_BUTTON_CLASS = 'min-h-10 shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50';

export const PICKER_CANCEL_BUTTON_CLASS = `${PICKER_BUTTON_CLASS} text-theme-text-secondary`;
export const PICKER_CONFIRM_BUTTON_CLASS = `${PICKER_BUTTON_CLASS} bg-theme-accent text-theme-text-on-accent`;
export const PICKER_RESET_BUTTON_CLASS = `${PICKER_BUTTON_CLASS} mr-auto flex items-center gap-1 text-theme-text-secondary`;
