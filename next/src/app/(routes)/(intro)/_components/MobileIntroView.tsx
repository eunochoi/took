import { ReactNode } from 'react';
import { MdCheckBox, MdLockOutline, MdLogin, MdPalette } from 'react-icons/md';

import Logo from '@/common/components/ui/Logo';
import IntroCtaButtons from './IntroCtaButtons';
import IntroImageCarousel from './IntroImageCarousel';
import { INTRO_IMAGES } from '../_constants/images';
import {
  INTRO_PAGE_BG,
  INTRO_THEME_BG,
  INTRO_THEME_COLOR,
  INTRO_CARD_SHADOW,
} from '../_constants/theme';

const HERO_IMAGES = [INTRO_IMAGES.calendar, INTRO_IMAGES.list, INTRO_IMAGES.habit];
const HOME_IMAGES = [INTRO_IMAGES.habitinfo1, INTRO_IMAGES.habitinfo2, INTRO_IMAGES.calendar];
const RECORD_IMAGES = [INTRO_IMAGES.calendar, INTRO_IMAGES.list, INTRO_IMAGES.list2, INTRO_IMAGES.zoom1];
const HABIT_IMAGES = [INTRO_IMAGES.habit, INTRO_IMAGES.habitbox, INTRO_IMAGES.habitinfo1, INTRO_IMAGES.habitinfo2];
const TRUST_IMAGES = [INTRO_IMAGES.login, INTRO_IMAGES.setting, INTRO_IMAGES.otherinfo1];
const RESPONSIVE_IMAGES = [INTRO_IMAGES.list, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list2];

const MobileSection = ({ bg, title, meta, text, children }: { bg: 'white' | 'blue'; title: string; meta: string; text?: string; children: ReactNode }) => (
  <section className="flex flex-col items-center gap-[22px] px-5 py-16" style={{ backgroundColor: bg === 'blue' ? INTRO_THEME_BG : 'white' }}>
    <div className="flex w-full max-w-[620px] flex-col items-center gap-2.5 text-center">
      <h2 className="m-0 flex-1 break-keep font-bmjua text-3xl capitalize leading-tight text-grey-title">{title}</h2>
      <span className="whitespace-nowrap text-[15px] font-bold" style={{ color: INTRO_THEME_COLOR }}>{meta}</span>
    </div>
    {text && <p className="m-0 max-w-[620px] break-keep text-center text-base leading-[1.65] text-[rgba(var(--greyTitle),0.72)]">{text}</p>}
    {children}
  </section>
);

const InfoCard = ({ icon, title, text }: { icon: ReactNode; title: string; text: string }) => (
  <div className="grid grid-cols-[32px_1fr] gap-x-3 gap-y-1 rounded-2xl bg-white/80 p-4" style={{ boxShadow: INTRO_CARD_SHADOW }}>
    <span className="row-span-2 inline-flex h-7 w-7 text-[28px]" style={{ color: INTRO_THEME_COLOR }}>{icon}</span>
    <strong className="text-[17px] text-grey-title">{title}</strong>
    <span className="text-[15px] leading-normal text-[rgba(var(--greyTitle),0.64)]">{text}</span>
  </div>
);

const MobileIntroView = () => {
  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden" style={{ backgroundColor: INTRO_PAGE_BG }}>
      <main className="mx-auto flex w-full flex-col pb-12">
        <section className="flex flex-col items-center gap-7 bg-white px-5 pb-14 pt-12">
          <Logo size={52} />
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="m-0 break-keep font-bmjua text-[32px] capitalize leading-tight text-grey-title">TOOK! 오늘도 하나씩 :)</h1>
            <p className="m-0 flex flex-col gap-1 break-keep text-lg leading-normal text-grey-title">
              <span>툭, 무심히 습관 발도장을 찍고</span>
              <span>더 나은 나에게 OK를 건네세요.</span>
            </p>
            <p className="m-0 break-keep text-[15px] leading-[1.7] text-[rgba(var(--greyTitle),0.68)]">
              TOOK은 가볍게 기록하는 소리인 툭과, 더 좋은 방향으로 나아가자는 TO OK의 의미를 함께 담았습니다.
            </p>
          </div>
          <IntroCtaButtons />
          <IntroImageCarousel images={HERO_IMAGES} height={420} priorityFirst sizes="90vw" />
        </section>

        <MobileSection bg="blue" title="홈에서 나의 흐름 확인" meta="일기와 습관 통계" text="감정 기록과 습관 실천 데이터를 한 화면에서 살펴보며 오늘의 상태를 빠르게 점검할 수 있습니다.">
          <IntroImageCarousel images={HOME_IMAGES} height={400} sizes="86vw" />
        </MobileSection>

        <MobileSection bg="white" title="기록을 한눈에 보기" meta="캘린더와 리스트" text="캘린더와 리스트 형식으로 감정 일기와 습관을 확인하고, 감정별 필터와 날짜 정렬로 스스로를 더 쉽게 돌아볼 수 있습니다.">
          <IntroImageCarousel images={RECORD_IMAGES} height={420} sizes="86vw" />
        </MobileSection>

        <MobileSection bg="blue" title="습관은 차분히 점검" meta="달력과 차트" text="월간 실천 여부는 달력으로, 연간 흐름은 차트로 확인해 꾸준함이 쌓이는 과정을 볼 수 있습니다.">
          <IntroImageCarousel images={HABIT_IMAGES} height={420} sizes="86vw" />
        </MobileSection>

        <MobileSection bg="white" title="필요한 기본 기능까지" meta="로그인, 테마, 보안">
          <div className="grid w-[min(100%,520px)] grid-cols-1 gap-2.5">
            <InfoCard icon={<MdLogin />} title="소셜 로그인" text="익숙한 계정으로 빠르게 시작합니다." />
            <InfoCard icon={<MdPalette />} title="테마 설정" text="색상과 글꼴을 내 취향에 맞춥니다." />
            <InfoCard icon={<MdLockOutline />} title="일기 보안" text="개인 기록을 더 안심하고 남길 수 있습니다." />
          </div>
          <IntroImageCarousel images={TRUST_IMAGES} height={380} sizes="86vw" />
        </MobileSection>

        <MobileSection bg="blue" title="기기마다 편하게" meta="모바일, 태블릿, 데스크탑" text="휴대폰과 태블릿에서는 모바일 흐름으로, 데스크탑에서는 더 넓은 화면에 맞춘 UI로 기록을 살펴봅니다.">
          <IntroImageCarousel images={RESPONSIVE_IMAGES} height={340} sizes="86vw" />
        </MobileSection>

        <section className="flex flex-col items-center gap-5 bg-white px-5 py-16">
          <span className="inline-flex text-[32px]" style={{ color: INTRO_THEME_COLOR }}><MdCheckBox /></span>
          <h2 className="m-0 break-keep text-center font-bmjua text-[26px] leading-[1.35] text-grey-title">오늘도 툭, 더 나은 나에게 OK.</h2>
          <IntroCtaButtons />
        </section>
      </main>
    </div>
  );
};

export default MobileIntroView;
