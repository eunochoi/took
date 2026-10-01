'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { MdCheckBox, MdChevronRight, MdMenuBook } from 'react-icons/md';

import cat from '/public/img/hiding-cat/hiding-cat-home.png';


import { AppSurfaceCard } from '@/common/components/ui/AppSurfaceCard';
import EmotionImage from '@/common/components/ui/EmotionImage';
import Wordmark from '@/common/components/ui/Wordmark';
import { EMOTIONS } from '@/common/constants/emotions';
import { HomeTopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import { cn } from '@/common/utils/cn';
import TodayRecordSection from './TodayRecordSection';

const GREETING_TEXT = {
  title: '오늘도 하나씩',
  sub: ['감정도 툭! 습관도 툭!', '조금 더 나은 나로 To OK.'],
};

const HomePageTopSection = ({ initialDate, loading = false }: { initialDate: string; loading?: boolean }) => {
  const today = format(new Date(initialDate), 'M월 d일 EEEE', { locale: ko });

  return (
    <>
      <section className={cn('flex flex-col gap-8', 'px-[5dvw] pt-[5dvw] tablet:px-9 tablet:pt-6 desktop:px-14')}>
        <div className="tablet:hidden"><Wordmark className="text-[48px]" /></div>
        <div className="flex flex-col p-2 gap-6 desktop:gap-8">
          <div className='flex flex-col gap-3'>
            <span className="m-0 text-xl font-semibold text-theme-accent-deep">{today}</span>
            <h1 className="-ml-1 flex gap-2 items-end m-0 h-10 desktop:h-12">
              <span className="text-4xl desktop:text-5xl font-bold text-theme-text-primary">{GREETING_TEXT.title}</span>
              <EmotionImage
                emotion={EMOTIONS[1]}
                alt="greeting emotion icon"
                className={cn('rotate-[5deg] h-14 w-auto animate-rotate-slow')} />
            </h1>
          </div>
          <div className="m-0 text-lg desktop:text-xl desktop:mb-4 leading-relaxed text-theme-text-secondary">
            <p>{GREETING_TEXT.sub[0]}</p>
            <p>{GREETING_TEXT.sub[1]}</p>
          </div>
        </div>
        <div className="desktop:hidden p-1">
          {loading ? (
            <div className="flex flex-col gap-3 animate-pulse motion-reduce:animate-none" role="status" aria-label="오늘의 기록 불러오는 중">
              <AppSurfaceCard className="flex min-h-12 items-center gap-3 !py-2 text-left text-sm shadow-none">
                <MdMenuBook className="shrink-0 text-xl text-theme-accent" aria-hidden="true" />
                <span className="flex-1">오늘의 감정 일기</span>
                <span className="h-4 w-20 rounded-lg bg-theme-skeleton" aria-hidden="true" />
                <MdChevronRight className="shrink-0 text-xl text-theme-text-tertiary" aria-hidden="true" />
              </AppSurfaceCard>
              <AppSurfaceCard className="flex min-h-12 items-center gap-3 !py-2 text-left text-sm shadow-none">
                <MdCheckBox className="shrink-0 text-xl text-theme-accent" aria-hidden="true" />
                <span className="flex-1">오늘의 습관</span>
                <span className="h-4 w-20 rounded-lg bg-theme-skeleton" aria-hidden="true" />
                <MdChevronRight className="shrink-0 text-xl text-theme-text-tertiary" aria-hidden="true" />
              </AppSurfaceCard>
            </div>
          ) : (
            <TodayRecordSection initialDate={initialDate} />
          )}
        </div>
      </section>
      <Image priority src={cat} alt="hiding-cat" sizes={TopSectionCatSize} className={HomeTopSectionCatClass} />
    </>

  );
};

export default HomePageTopSection;
