export type DateDataMap<T> = Record<string, T>;

export interface CalendarDateContentProps<T> {
  date: Date;
  dateData?: T;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}

export type DateContentRenderer<T> = (props: CalendarDateContentProps<T>) => JSX.Element;
