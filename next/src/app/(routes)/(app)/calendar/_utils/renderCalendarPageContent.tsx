import { format } from "date-fns";
import Image from "next/image";

import { CalendarDateContentProps } from "@/common/components/ui/Calendar/types";
import { EMOTIONS } from "@/common/constants/emotions";

interface DiaryDateData {
  habitsCount: number;
  isVisible: boolean;
  emotionType: number;
}

const badgeClass =
  "flex h-[26px] w-[26px] items-center justify-center rounded-[50%_45%_55%_50%/60%_50%_50%_55%] text-base font-semibold text-white";

const badgeStyle = {
  backgroundColor: "color-mix(in srgb, var(--theme-color) 70%, white)",
};

export const renderCalendarPageContent = ({ date, dateData }: CalendarDateContentProps<DiaryDateData>) => {
  const {
    habitsCount = 0,
    isVisible: hasDiary = false,
    emotionType = -1,
  } = dateData || {};
  const hasHabit = habitsCount > 0;
  const formattedDate = format(date, 'd');
  const emotion = EMOTIONS[emotionType];

  if (hasDiary && emotion) {
    return (
      <div className="relative z-[2] w-full [&>img]:h-auto [&>img]:w-full">
        <Image src={emotion.src} alt={emotion.nameKr} />
        {habitsCount > 0 && (
          <div className={`${badgeClass} absolute -right-2.5 -top-2.5 z-10`} style={badgeStyle}>
            {habitsCount}
          </div>
        )}
      </div>
    );
  }
  if (!hasDiary && hasHabit) {
    return (
      <div className={`${badgeClass} scale-[1.3]`} style={badgeStyle}>
        {habitsCount}
      </div>
    );
  }
  return (<span className="date">{formattedDate}</span>);
};
