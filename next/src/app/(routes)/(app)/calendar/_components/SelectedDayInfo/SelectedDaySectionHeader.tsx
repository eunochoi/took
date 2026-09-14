import type { ReactNode } from 'react';
import { selectedDayInfoStyles } from './selectedDayInfoStyles';

interface Props {
  children?: ReactNode;
  title: string;
  icon?: ReactNode;
}

const SelectedDaySectionHeader = ({ children, title, icon }: Props) => (
  <header className={selectedDayInfoStyles.section.header}>
    <h3 className={selectedDayInfoStyles.section.title}>{icon}{title}</h3>
    {children}
  </header>
);

export default SelectedDaySectionHeader;
