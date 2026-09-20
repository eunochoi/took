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
    <header className="font-title flex items-center justify-between gap-4">
      <div className="flex flex-col min-w-0 items-start">
        <h2 className="text-lg font-semibold text-theme-text-primary">{formattedDate}</h2>
        <p className="mt-1 text-sm text-theme-text-tertiary">감정 일기와 습관</p>
      </div>
      {emotion && (
        <Image className="h-12 w-12 shrink-0 object-contain" src={emotion.src} alt={emotion.nameKr} />
      )}
    </header>
  );
};

export default SelectedDayInfoHeader;
