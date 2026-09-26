'use client';

import { ButtonHTMLAttributes } from 'react';

type PanelSubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export const PanelSubmitButton = ({ children, ...props }: PanelSubmitButtonProps) => {
  return (
    <button
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-theme-accent px-5 font-title text-base font-semibold text-white shadow-theme-soft transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
