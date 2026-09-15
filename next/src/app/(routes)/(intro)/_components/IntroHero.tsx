import Logo from '@/common/components/ui/Logo';
import IntroActionButtons from './IntroActionButtons';
import IntroImageCarousel from './IntroImageCarousel';

interface Props {
  images: string[];
}

const heroSectionClass = "grid min-h-[90dvh] w-full overflow-hidden bg-theme-surface py-12 desktop:px-[100px] desktop:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)]";
const heroContentColumnClass = "contents desktop:flex desktop:flex-col desktop:items-start desktop:justify-center desktop:gap-6 desktop:px-14 desktop:py-16 desktop:text-left";
const heroContentClass = "order-1 flex flex-col items-center justify-center gap-6 px-6 py-12 text-center desktop:order-none desktop:items-start desktop:p-0 desktop:text-left";
const heroImageClass = "order-2 flex h-full w-full items-center justify-center desktop:order-none";
const heroActionsClass = "order-3 px-6 pb-12 pt-8 desktop:order-none desktop:justify-start desktop:p-0";

const IntroHero = ({ images }: Props) => {
  return (
    <section className={heroSectionClass}>
      <div className={heroContentColumnClass}>
        <div className={heroContentClass}>
          <div className="flex flex-col items-center gap-2 desktop:items-start">
            <Logo wrapperClassName="desktop:origin-left pb-2" logoClassName="w-60 h-auto" />
            <span className="rounded-full bg-theme-bg px-3 py-1 text-sm font-semibold tracking-[0.08em] text-theme-accent">
              EMOTION DIARY & HABIT TRACKER
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="m-0 break-keep text-4xl font-bold leading-[1.2] text-theme-text-primary desktop:text-6xl desktop:leading-[1.12]">
              오늘의 나를 가볍게, TOOK!
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
