import Image from 'next/image';

import Wordmark from '@/common/components/ui/Wordmark';
import IntroActionButtons from './IntroActionButtons';
import bottomCat from '/public/img/bottom-cat.png';

const heroSectionClass = "flex min-h-[80dvh] w-full flex-col overflow-hidden bg-theme-surface px-5 pt-12 desktop:flex-row desktop:gap-8 desktop:px-[min(6vw,96px)]";
const heroContentClass = "flex flex-col items-start justify-center gap-12 px-1 py-6 text-start desktop:w-auto desktop:items-start desktop:gap-16 desktop:px-6 desktop:py-16 desktop:text-left";
const heroImageClass = "mt-auto flex items-end justify-center tablet:justify-center desktop:flex-1 desktop:shrink-0";

const IntroHero = () => {
  return (
    <section className={heroSectionClass}>
      <div className={heroContentClass}>
        <div className="flex flex-col w-full items-start gap-2">
          <Wordmark className="mb-3 text-7xl desktop:8xl" />
          <span className="rounded-full bg-theme-bg px-3 py-1 border border-theme-accent/30 text-xs font-semibold tracking-[0.08em] text-theme-accent">
            EMOTION DIARY & HABIT TRACKER
          </span>
        </div>

        <div className="flex flex-col gap-6 w-full p-2">
          <h1 className="m-0 break-keep text-2xl font-bold tracking-tight leading-[1.2] text-theme-text-primary desktop:text-5xl desktop:leading-[1.12]">
            감정도 툭! 습관도 툭!<br />조금 더 나은 나로 To OK
          </h1>
          <p className="m-0 flex flex-col break-keep text-lg text-theme-text-secondary desktop:text-xl">
            <span>습관과 감정을 기록하고</span>
            <span>나만의 속도로 하루를 쌓아가요.</span>
          </p>
        </div>
        <IntroActionButtons className="p-0 desktop:justify-start" />
      </div>
      <div className={heroImageClass}>
        <Image priority src={bottomCat} alt="bottom-cat" sizes="(min-width: 1024px) 40vw, (min-width: 480px) 66vw, calc(100vw - 40px)" className="tablet:w-2/3 desktop:w-full" />
      </div>
    </section>
  );
};

export default IntroHero;
