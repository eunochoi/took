import { DiaryHabits } from "@/common/components/ui/Diary/DiaryHabits";
import { EMOTIONS } from "@/common/constants/emotions";
import type { DiaryData } from "@/common/types/diary";
import Image from "next/image";

interface ZoomViewEntryProps {
  diaryData: DiaryData;
}

export const ZoomViewEntry = ({ diaryData }: ZoomViewEntryProps) => {
  const emotion = EMOTIONS[diaryData.emotion] ?? EMOTIONS[9];

  return (
    <article className="flex min-w-0 flex-col gap-6 landscape-short:gap-4" aria-label="일기">
      <div className="flex items-center gap-5">
        <Image
          className="h-20 w-20 shrink-0 object-contain landscape-short:h-14 landscape-short:w-14"
          src={emotion.src}
          alt=""
          width={80}
          height={80}
        />
        <div className="font-title">
          <p className="text-sm text-theme-accent-text">오늘의 마음</p>
          <h2 className="mt-1 text-2xl font-medium text-theme-text-primary landscape-short:text-xl">
            {emotion.nameKr}
          </h2>
        </div>
      </div>
      {diaryData.Habits.length > 0 && <DiaryHabits habits={diaryData.Habits} showCount={false} />}
      <div className="whitespace-pre-wrap break-words text-base leading-[1.9] text-theme-text-primary">
        {diaryData.text}
      </div>
    </article>
  );
};
