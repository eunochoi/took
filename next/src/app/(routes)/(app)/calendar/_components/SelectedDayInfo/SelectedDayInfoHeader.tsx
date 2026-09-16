import type { Emotion } from '@/common/constants/emotions';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { MdToday } from 'react-icons/md';
import { selectedDayInfoStyles } from './selectedDayInfoStyles';

interface Props {
  date: string;
  emotion?: Emotion;
}

const SelectedDayInfoHeader = ({ date, emotion }: Props) => {
  const formattedDate = format(parseLocalDate(date), 'M월 d일 EEEE', { locale: ko });

  return (
    <header className={selectedDayInfoStyles.header.container}>
      <div className="flex min-w-0 items-center gap-3">
        <MdToday className={selectedDayInfoStyles.header.icon} aria-hidden="true" />
        <div className="min-w-0">
          <h2 className={selectedDayInfoStyles.header.title}>{formattedDate}</h2>
          <p className={selectedDayInfoStyles.header.description}>습관과 감정 일기</p>
        </div>
      </div>
      {emotion && (
        <Image className={selectedDayInfoStyles.header.emotion} src={emotion.src} alt={emotion.nameKr} />
      )}
    </header>
  );
};

export default SelectedDayInfoHeader;
