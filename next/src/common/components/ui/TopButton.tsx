import { ReactNode } from "react";

const topButtonClass = "shadow-theme-modal flex w-auto items-center justify-center gap-1.5 rounded-xl border border-transparent bg-theme-accent px-3 py-3 font-sans text-sm font-medium leading-snug text-theme-text-on-accent transition-colors disabled:cursor-not-allowed disabled:opacity-50";

interface Props {
  'aria-label'?: string;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}

const TopButton = ({ 'aria-label': ariaLabel, children, onClick, disabled = false, title }: Props) => (
  <button
    aria-label={ariaLabel}
    className={topButtonClass}
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
  >
    {children}
  </button>
);

export default TopButton;
