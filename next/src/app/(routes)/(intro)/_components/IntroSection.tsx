import { cn } from '@/common/utils/cn';
import IntroImageCarousel from './IntroImageCarousel';

const sectionBaseClass = "flex flex-col items-center gap-[22px] px-5 py-12 desktop:grid desktop:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] desktop:gap-12 desktop:px-[min(10vw,160px)] desktop:py-16";
const sectionContentBaseClass = "flex w-full max-w-[620px] flex-col items-center gap-5 text-center";
const sectionContentDesktopClass = "desktop:max-w-none desktop:items-start desktop:gap-4 desktop:text-left";
const sectionTitleClass = "m-0 break-keep text-3xl font-semibold capitalize leading-tight text-theme-text-primary desktop:text-4xl";
const sectionBodyClass = "m-0 max-w-[620px] break-keep text-balance text-center text-base leading-[1.65] text-theme-text-secondary desktop:max-w-none desktop:text-left desktop:text-lg desktop:leading-[1.75]";

interface IntroSectionProps {
  background: 'surface' | 'background';
  imageClassName: string;
  images: string[];
  meta: string;
  reverse?: boolean;
  text: string;
  title: string;
}

const IntroSection = ({
  background,
  imageClassName,
  images,
  meta,
  reverse = false,
  text,
  title,
}: IntroSectionProps) => (
  <section
    className={cn(
      sectionBaseClass,
      background === 'surface' ? 'bg-theme-surface' : 'bg-theme-accent-light',
    )}
  >
    <div
      className={cn(
        sectionContentBaseClass,
        sectionContentDesktopClass,
        reverse && 'desktop:order-2',
      )}
    >
      <span className="rounded-full bg-theme-accent/10 px-3 py-1 text-sm font-semibold text-theme-accent">{meta}</span>
      <h2 className={sectionTitleClass}>{title}</h2>
      <p className={sectionBodyClass}>{text}</p>
    </div>

    <IntroImageCarousel
      className={imageClassName}
      images={images}
      sizes="(min-width: 1024px) 46vw, 86vw"
    />
  </section>
);

export default IntroSection;
