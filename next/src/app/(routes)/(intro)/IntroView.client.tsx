'use client';

import EmotionImage from '@/common/components/ui/EmotionImage';
import { MdLockOutline, MdLogin, MdPalette } from 'react-icons/md';

import { ScrollContainer } from '@/common/components/ui/ScrollContainer';
import Wordmark from '@/common/components/ui/Wordmark';
import { EMOTIONS } from '@/common/constants/emotions';
import IntroActionButtons from './_components/IntroActionButtons';
import IntroHero from './_components/IntroHero';
import IntroInfoCard from './_components/IntroInfoCard';
import IntroSection from './_components/IntroSection';
import { INTRO_IMAGES } from './_constants/images';

const HERO_IMAGES = [INTRO_IMAGES.calendar, INTRO_IMAGES.list, INTRO_IMAGES.habit];
const HOME_IMAGES = [INTRO_IMAGES.habitinfo1, INTRO_IMAGES.habitinfo2, INTRO_IMAGES.calendar];
const RECORD_IMAGES = [INTRO_IMAGES.calendar, INTRO_IMAGES.list, INTRO_IMAGES.list2, INTRO_IMAGES.zoom1];
const HABIT_IMAGES = [INTRO_IMAGES.habit, INTRO_IMAGES.habitbox, INTRO_IMAGES.habitinfo1, INTRO_IMAGES.habitinfo2];
const TRUST_IMAGES = [INTRO_IMAGES.login, INTRO_IMAGES.setting, INTRO_IMAGES.otherinfo1];
const RESPONSIVE_IMAGES = [INTRO_IMAGES.list, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list2];

const IntroView = () => {
  return (
    <ScrollContainer
      className="static-theme-blue h-[100dvh] w-[100dvw] bg-theme-bg font-title"
      showScrollFade={false}
      showScrollToTop
    >
      <IntroHero images={HERO_IMAGES} />

      <IntroSection
        background="background"
        imageClassName="h-[400px] desktop:h-[460px]"
        images={HOME_IMAGES}
        meta="일기와 습관 통계"
        text="감정 기록과 습관 실천 데이터를 한 화면에서 살펴보며 오늘의 상태를 빠르게 점검할 수 있습니다."
        title="홈에서 나의 흐름 확인"
      />

      <IntroSection
        background="surface"
        imageClassName="h-[420px] desktop:h-[460px]"
        images={RECORD_IMAGES}
        meta="캘린더와 리스트"
        reverse
        text="캘린더와 리스트 형식으로 감정 일기와 습관을 확인하고, 감정별 필터와 날짜 정렬로 스스로를 더 쉽게 돌아볼 수 있습니다."
        title="기록을 한눈에 보기"
      />

      <IntroSection
        background="background"
        imageClassName="h-[420px] desktop:h-[460px]"
        images={HABIT_IMAGES}
        meta="달력과 차트"
        text="월간 실천 여부는 달력으로, 연간 흐름은 차트로 확인해 꾸준함이 쌓이는 과정을 볼 수 있습니다."
        title="습관은 차분히 점검"
      />

      <IntroSection
        background="surface"
        imageClassName="h-[340px] desktop:h-[420px]"
        images={RESPONSIVE_IMAGES}
        meta="모바일, 태블릿, 데스크탑"
        reverse
        text="휴대폰과 태블릿에서는 모바일 흐름으로, 데스크탑에서는 더 넓은 화면에 맞춘 UI로 기록을 살펴봅니다."
        title="기기마다 편하게"
      />

      <section className="flex flex-col items-center gap-[22px] bg-theme-bg px-5 py-16 desktop:px-[min(7vw,112px)] desktop:py-24">
        <div className="flex w-full max-w-[620px] flex-col items-center gap-3 text-center desktop:max-w-[980px]">
          <h2 className="m-0 break-keep text-3xl capitalize leading-tight text-theme-text-primary desktop:text-4xl">
            필요한 기본 기능까지
          </h2>
          <span className="whitespace-nowrap text-base font-bold text-theme-accent">
            로그인, 테마, 보안
          </span>
        </div>

        <div className="grid w-[min(100%,520px)] grid-cols-1 gap-2.5 desktop:w-[min(100%,980px)] desktop:grid-cols-3 desktop:gap-3">
          <IntroInfoCard icon={<MdLogin className="h-6 w-6 text-theme-accent" aria-hidden="true" />} title="소셜 로그인" text="익숙한 계정으로 빠르게 시작합니다." />
          <IntroInfoCard icon={<MdPalette className="h-6 w-6 text-theme-accent" aria-hidden="true" />} title="테마 설정" text="색상과 글꼴을 내 취향에 맞춥니다." />
          <IntroInfoCard icon={<MdLockOutline className="h-6 w-6 text-theme-accent" aria-hidden="true" />} title="일기 보안" text="개인 기록을 더 안심하고 남길 수 있습니다." />
        </div>
      </section>

      <section className="flex flex-col items-center gap-5 bg-theme-surface px-5 py-16 desktop:gap-6 desktop:px-6 desktop:py-[82px]">
        <Wordmark className="text-5xl desktop:text-6xl" />
        <div aria-hidden="true" className="flex items-center gap-3">
          {[EMOTIONS[1], EMOTIONS[3], EMOTIONS[2]].map((emotion) => (
            <EmotionImage key={emotion.id} emotion={emotion} alt="" width={44} height={44} />
          ))}
        </div>
        <h2 className="m-0 break-keep text-center text-3xl font-bold capitalize leading-tight text-theme-text-primary desktop:text-4xl desktop:leading-[1.18]">
          툭! 오늘도 하나씩 :)
        </h2>
        <p className="m-0 flex flex-col gap-1 break-keep text-center text-lg leading-normal text-theme-text-secondary desktop:text-xl desktop:leading-[1.7]">
          <span>툭, 무심히 습관 발도장을 찍고</span>
          <span>더 나은 나에게 OK를 건네세요.</span>
        </p>
        <IntroActionButtons className="mt-3 max-w-[620px]" />
      </section>
    </ScrollContainer>
  );
};

export default IntroView;
