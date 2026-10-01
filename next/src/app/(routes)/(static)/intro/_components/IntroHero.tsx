
import Wordmark from '@/common/components/ui/Wordmark';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { introContainerClass, introContentClass, introDescriptionClass, introSectionClass } from '../_styles/classes';
import IntroActionButtons from './IntroActionButtons';
import IntroVisual from './IntroVisual';
import cat from '/public/img/hiding-cat/hiding-cat-no-item.png';
import introHeroPic from '/public/img/intro/intro-hero.png';


const IntroHero = () => (
  <section className={cn(introSectionClass, '!bg-theme-accent-light relative')}>
    <div className={cn(introContainerClass, 'grid items-center gap-10 desktop:min-h-[560px] desktop:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] desktop:gap-16')}>
      <div className={cn(introContentClass, '!gap-10')}>
        <Wordmark className="text-6xl desktop:text-7xl" />
        <h1 className="m-0 break-keep text-4xl font-bold leading-tight tracking-tight text-theme-text-primary desktop:text-6xl">
          오늘을, <span className="text-theme-accent-text">툭!</span>
        </h1>
        <p className={introDescriptionClass}>
          {'감정과 습관을 가볍게 남기고\n쌓여가는 나의 하루를 돌아보세요.'}
        </p>
        <IntroActionButtons className="mt-2 desktop:items-start" />
      </div>
      <div className="relative">
        <IntroVisual
          priority
          src={introHeroPic}
          alt="hero-image"
        />
      </div>
    </div>
    <Image
      priority
      src={cat}
      alt="화면 아래에서 고개를 내민 블루 고양이"
      // sizes="(min-width: 1024px) 900px, 65vw"
      className="absolute bottom-0 right-0 w-1/2 max-w-[300px]"
    />
  </section>
);

export default IntroHero;
