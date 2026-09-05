import { ReactNode } from "react";

type TopButtonSize = 'auto' | 'default';

interface Props {
  'aria-label'?: string;
  children: ReactNode;
  onClick: () => void;
  size?: TopButtonSize;
  disabled?: boolean;
  title?: string;
}

const TopButton = ({ 'aria-label': ariaLabel, children, onClick, size = 'default', disabled = false, title }: Props) => (
  <button
    aria-label={ariaLabel}
    className={`shadow-theme-action flex h-8 items-center justify-center rounded-full bg-theme-accent text-sm font-medium text-theme-text-on-accent disabled:cursor-not-allowed disabled:opacity-50 ${size === 'auto' ? 'w-auto px-2.5' : 'w-16'}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
  >
    {children}
  </button>
);

export default TopButton;
