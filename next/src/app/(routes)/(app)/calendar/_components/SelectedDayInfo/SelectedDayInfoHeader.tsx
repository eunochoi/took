import type { Emotion } from '@/common/constants/emotions';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  date: string;
  emotion?: Emotion;
}

const SelectedDayInfoHeader = ({ date, emotion }: Props) => {
  const formattedDate = format(parseLocalDate(date), 'M월 d일 EEEE', { locale: ko });

  return (
    <header className="font-title flex items-stretch justify-between gap-4">
      <h2 className="text-lg font-semibold text-theme-text-primary">{formattedDate}</h2>
      {emotion && <span className='text-sm text-white rounded-full bg-theme-accent px-3 tracking-widest flex items-center'>{emotion?.nameKr}</span>}
      {/* {emotion && (
        <Image className="h-8 w-8 shrink-0 object-contain" src={emotion.src} alt={emotion.nameKr} />
      )} */}
    </header>
  );
};

export default SelectedDayInfoHeader;
