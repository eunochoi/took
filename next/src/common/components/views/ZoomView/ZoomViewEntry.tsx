import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from "@/common/constants/emotions";
import type { DiaryData } from "@/common/types/diary";
import { MdCheck } from "react-icons/md";

interface ZoomViewEntryProps {
  diaryData: DiaryData;
}

export const ZoomViewEntry = ({ diaryData }: ZoomViewEntryProps) => {
  const emotion = EMOTIONS[diaryData.emotion] ?? EMOTIONS[9];

  return (
    <article className="flex min-w-0 flex-col gap-6 landscape-short:gap-4" aria-label="일기">
      <div className="flex items-center gap-5">
        <EmotionImage
          className="h-20 w-20 shrink-0 object-contain landscape-short:h-14 landscape-short:w-14"
          emotion={emotion}
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
      {diaryData.Habits.length > 0 && (
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 px-2" aria-label="습관">
          {diaryData.Habits.map((habit) => (
            <button
              type="button"
              key={habit.id}
              className="inline-flex max-w-full items-center gap-1 text-left text-sm text-theme-text-secondary focus-visible:ring-2 focus-visible:ring-theme-accent"
            >
              <MdCheck className="shrink-0 text-theme-accent" aria-hidden="true" />
              <span className="truncate">{habit.name}</span>
            </button>
          ))}
        </div>
      )}
      <div className="whitespace-pre-wrap p-2 break-words text-base leading-[1.9] text-theme-text-primary">
        {diaryData.text}
      </div>
    </article>
  );
};
