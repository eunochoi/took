import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  title: string;
  icon?: ReactNode;
}

const SelectedDaySectionHeader = ({ children, title, icon }: Props) => (
  <header className="flex items-center justify-between gap-2 py-2">
    <h3 className="flex items-center gap-2 text-base font-semibold text-theme-text-primary">
      {icon && <span aria-hidden="true" className="flex shrink-0 items-center text-2xl text-theme-accent">{icon}</span>}
      {title}
    </h3>
    {children}
  </header>
);

export default SelectedDaySectionHeader;
