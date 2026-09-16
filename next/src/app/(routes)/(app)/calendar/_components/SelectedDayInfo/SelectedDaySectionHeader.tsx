import type { ReactNode } from 'react';
import { selectedDayInfoStyles } from './selectedDayInfoStyles';

interface Props {
  children?: ReactNode;
  title: string;
}

const SelectedDaySectionHeader = ({ children, title }: Props) => (
  <header className={selectedDayInfoStyles.section.header}>
    <h3 className={selectedDayInfoStyles.section.title}>{title}</h3>
    {children}
  </header>
);

export default SelectedDaySectionHeader;
