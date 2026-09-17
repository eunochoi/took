import Image from 'next/image';

import Wordmark from '@/common/components/ui/Wordmark';
import { EMOTIONS } from '@/common/constants/emotions';
import IntroActionButtons from './IntroActionButtons';
import IntroImageCarousel from './IntroImageCarousel';

interface Props {
  images: string[];
}

const heroSectionClass = "grid min-h-[90dvh] w-full overflow-hidden bg-theme-surface py-12 px-5 desktop:gap-8 desktop:px-[min(6vw,96px)] desktop:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)]";
const heroContentColumnClass = "contents desktop:flex desktop:flex-col desktop:items-start desktop:justify-center desktop:gap-6 desktop:px-6 desktop:py-16 desktop:text-left";
const heroContentClass = "order-1 flex flex-col items-center justify-center gap-7 px-1 py-8 text-center desktop:order-none desktop:items-start desktop:p-0 desktop:text-left";
const heroImageClass = "order-2 flex h-full w-full items-center justify-center desktop:order-none";
const heroActionsClass = "order-3 px-6 pb-12 pt-8 desktop:order-none desktop:justify-start desktop:p-0";

const IntroHero = ({ images }: Props) => {
  return (
    <section className={heroSectionClass}>
      <div className={heroContentColumnClass}>
        <div className={heroContentClass}>
          <div className="flex flex-col items-center gap-2 desktop:items-start">
            <Wordmark className="mb-3 text-5xl desktop:text-6xl" />
            <span className="rounded-full bg-theme-bg px-3 py-1 text-sm font-semibold tracking-[0.08em] text-theme-accent">
              EMOTION DIARY & HABIT TRACKER
            </span>
          </div>

          <div aria-hidden="true" className="flex items-center gap-3">
            {[EMOTIONS[0], EMOTIONS[3], EMOTIONS[2]].map((emotion) => (
              <Image key={emotion.id} src={emotion.src} alt="" width={44} height={44} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="m-0 break-keep text-4xl font-bold tracking-tight leading-[1.2] text-theme-text-primary desktop:text-6xl desktop:leading-[1.12]">
              오늘의 나를<br />가볍게, 툭!
            </h1>
            <p className="m-0 flex flex-col gap-1 break-keep text-lg leading-[1.7] text-theme-text-secondary desktop:text-xl">
              <span>감정과 습관을 부담 없이 기록하고</span>
              <span>더 나은 나에게 작은 OK를 건네세요.</span>
            </p>
          </div>
        </div>

        <IntroActionButtons className={heroActionsClass} />
      </div>

      <div className={heroImageClass}>
        <IntroImageCarousel
          className="h-[360px] desktop:h-[560px]"
          images={images}
          priorityFirst
          sizes="(min-width: 1024px) 52vw, 88vw"
        />
      </div>
    </section>
  );
};

export default IntroHero;
