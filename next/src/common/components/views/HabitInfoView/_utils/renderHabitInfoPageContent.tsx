import { CalendarDateContentProps } from "@/common/components/ui/Calendar/types";
import { cn } from "@/common/utils/cn";
import { format } from "date-fns";

export const renderHabitInfoPageContent = ({ date, dateData: isDone }: CalendarDateContentProps<boolean>) => {
  const formattedDate = format(date, 'd');

  return (
    <div className={cn("flex h-7 w-7 items-center justify-center rounded-full text-sm text-theme-text-primary", isDone && "bg-theme-accent text-theme-text-on-accent")}>
      {formattedDate}
    </div>
  );
};
