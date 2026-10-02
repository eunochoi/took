'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdLockOutline, MdLogin, MdPalette } from 'react-icons/md';

import { ScrollContainer } from '@/common/components/ui/ScrollContainer';
import Wordmark from '@/common/components/ui/Wordmark';
import { cn } from '@/common/utils/cn';
import { twMerge } from 'tailwind-merge';
import IntroActionButtons from './_components/IntroActionButtons';
import IntroHero from './_components/IntroHero';
import IntroSection from './_components/IntroSection';
import IntroVisual from './_components/IntroVisual';
import { introContainerClass, introDescriptionClass, introIconClass, introSectionClass, introTitleClass } from './_styles/classes';
import cat from '/public/img/hiding-cat/hiding-cat-home.png';
import introSection1 from '/public/img/intro/intro-section-1.png';
import introSection2 from '/public/img/intro/intro-section-2.png';
import introSection3 from '/public/img/intro/intro-section-3.png';


const featureItemClass = 'inline-flex items-center gap-2';

const IntroClientPage = () => (
  <ScrollContainer
    className="static-theme-blue h-[100dvh] w-full bg-theme-bg text-theme-text-primary"
    showScrollFade
    scrollFadeClassName="desktop:hidden"
  >
    <IntroHero />

    <IntroSection
      title="하루를 가볍게 남겨요"
      description={'오늘의 감정 일기를 남기고,\n작은 습관을 하나씩 체크해요.'}
    >
      <IntroVisual src={introSection1} alt="intro-section-1" />
    </IntroSection>

    <IntroSection
      reverse
      title="쌓인 하루를 돌아봐요"
      description={'하루하루의 기록이 쌓이면\n내가 어떤 시간을 보내왔는지 보여요.'}
    >
      <IntroVisual src={introSection2} alt="intro-section-2" />
    </IntroSection>

    <section className={cn(introSectionClass, 'bg-theme-surface')}>
      <div className={cn(introContainerClass, 'flex max-w-[760px] flex-col items-center gap-7 text-center')}>
        <h2 className="m-0 break-keep text-xl font-bold desktop:text-2xl">휴대폰 · 태블릿 · PC에서 함께</h2>
        <IntroVisual
          src={introSection3}
          className="!aspect-[2/1]"
          alt="intro-section-3"
        />
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-3 p-0 text-sm text-theme-text-secondary desktop:text-base">
          <li className={featureItemClass}><MdLogin className={introIconClass} aria-hidden="true" />간편 로그인</li>
          <li className={featureItemClass}><MdPalette className={introIconClass} aria-hidden="true" />다양한 커스텀 설정</li>
          <li className={featureItemClass}><MdLockOutline className={introIconClass} aria-hidden="true" />개인 일기 기록</li>
        </ul>
      </div>
    </section>

    <section className={twMerge(introSectionClass, 'bg-theme-accent-light !pb-0')}>
      <div className={cn(introContainerClass, 'flex flex-col items-center gap-10 text-center')}>
        <Wordmark className="text-5xl desktop:text-6xl" />
        <h2 className={introTitleClass}>툭, 남기다 보면<br />조금씩 괜찮아질 거예요.</h2>
        <p className={introDescriptionClass}>took — 하루를 툭, To OK.</p>
        <IntroActionButtons className="mt-2" />
      </div>
    </section>
    <footer className="bg-theme-accent-light flex flex-col items-center gap-4 px-6 py-8 text-sm text-theme-text-secondary">
      <nav aria-label="서비스 정책" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <Link href="/privacy" className="hover:underline focus-visible:outline-2 focus-visible:outline-theme-accent">
          개인정보처리방침
        </Link>
        <Link href="/account-deletion" className="hover:underline focus-visible:outline-2 focus-visible:outline-theme-accent">
          계정 삭제
        </Link>
      </nav>
      <p>eooooostudio</p>
    </footer>
    <div className='w-full bg-theme-accent-light'>
      <Image
        src={cat}
        alt="화면 아래에서 고개를 내민 블루 고양이"
        sizes="(min-width: 1196px) 622px, (min-width: 1024px) calc(60vw - 96px), (min-width: 480px) calc(100vw - 64px), calc(100vw - 40px)"
        className="ml-auto w-1/2 max-w-[300px]"
      />
    </div>
  </ScrollContainer>
);

export default IntroClientPage;
