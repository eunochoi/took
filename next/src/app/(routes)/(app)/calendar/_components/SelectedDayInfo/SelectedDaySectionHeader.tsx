import type { ReactNode } from 'react';
import { selectedDayInfoStyles } from './selectedDayInfoStyles';

interface Props {
  children?: ReactNode;
  title: string;
  icon?: ReactNode;
}

const SelectedDaySectionHeader = ({ children, title, icon }: Props) => (
  <header className={selectedDayInfoStyles.section.header}>
    <h3 className={`flex items-center gap-2 ${selectedDayInfoStyles.section.title}`}>
      {icon && <span aria-hidden="true" className="flex shrink-0 items-center text-xl text-theme-accent">{icon}</span>}
      {title}
    </h3>
    {children}
  </header>
);

export default SelectedDaySectionHeader;
