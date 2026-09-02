import type { Emotion } from '@/common/constants/emotions';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface Props {
  date: string;
  emotion?: Emotion;
}

const SelectedDayInfoHeader = ({ date, emotion }: Props) => {
  const formattedDate = format(parseLocalDate(date), 'M월 d일 EEEE', { locale: ko });

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-lg font-semibold text-theme-text-primary">{formattedDate}</h2>
          {emotion && (
            <span className="rounded-full bg-theme-accent/10 px-3 py-1 text-sm font-semibold text-theme-accent">
              {emotion.nameKr}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-theme-text-tertiary">습관과 감정 일기</p>
      </div>
      {emotion && (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-theme-bg p-1.5">
          <Image className="h-full w-full object-contain" src={emotion.src} alt={emotion.nameKr} />
        </div>
      )}
    </header>
  );
};

export default SelectedDayInfoHeader;
