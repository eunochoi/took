'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

import bottomCat from '/public/img/bottom-cat.png';

import { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from '@/common/components/layout/AppPageLayout';
import EmotionImage from '@/common/components/ui/EmotionImage';
import Wordmark from '@/common/components/ui/Wordmark';
import { EMOTIONS } from '@/common/constants/emotions';
import { GRADIENT_CLASS } from '@/common/constants/pageStyle';
import { useSettingsContext } from '@/common/settings/useSettingsContext';
import { cn } from '@/common/utils/cn';
import TodayRecordSection from './TodayRecordSection';

const GREETING_TEXT = {
  title: '오늘도 하나씩',
  sub: ['감정도 툭, 습관도 툭!', '조금 더 나은 나로 To OK.'],
};

const HomeViewTopArea = ({ initialDate }: { initialDate: string }) => {
  const { emotionIcon } = useSettingsContext();
  const today = format(new Date(initialDate), 'M월 d일 EEEE', { locale: ko });

  return (
    <div className={cn('flex flex-col gap-8', GRADIENT_CLASS, APP_PAGE_CONTENT_PADDING_CLASS_NAME)}>
      <div className="tablet:hidden"><Wordmark className="text-[48px]" /></div>
      <div className="flex flex-col font-title p-2 gap-4 desktop:gap-8">
        <span className="m-0 text-2xl font-semibold text-theme-text-secondary">{today}</span>
        <h1 className="flex gap-4 items-center m-0 h-10 desktop:h-12">
          <span className="text-4xl desktop:text-5xl font-bold text-theme-text-primary">{GREETING_TEXT.title}</span>
          <EmotionImage
            emotion={EMOTIONS[1]}
            alt="greeting emotion icon"
            className={cn(emotionIcon.style === 'basic' ? 'mb-4' : 'mb-2',
              'rotate-[5deg] h-16 w-auto animate-rotate-slow')} />
        </h1>
        <div className="m-0 text-lg font-semibold desktop:text-xl desktop:mb-4 leading-relaxed text-theme-text-secondary">
          <p>{GREETING_TEXT.sub[0]}</p>
          <p>{GREETING_TEXT.sub[1]}</p>
        </div>
      </div>
      <div className="desktop:hidden p-1">
        <TodayRecordSection initialDate={initialDate} />
      </div>
      <Image src={bottomCat} alt="bottom-cat" className="ml-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </div>
  );
};

export default HomeViewTopArea;
