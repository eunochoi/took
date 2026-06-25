import { ReactNode } from 'react';
import { MdCheckBox, MdLockOutline, MdLogin, MdPalette } from 'react-icons/md';

import Logo from '@/common/components/ui/Logo';
import { INTRO_IMAGES } from '../_constants/images';
import {
  INTRO_CARD_SHADOW,
  INTRO_PAGE_BG,
  INTRO_THEME_BG,
  INTRO_THEME_COLOR,
} from '../_constants/theme';
import IntroCtaButtons from './IntroCtaButtons';
import IntroImageCarousel from './IntroImageCarousel';

const HERO_IMAGES = [INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_habit, INTRO_IMAGES.calendar];
const HOME_IMAGES = [INTRO_IMAGES.pc_habitinfo1, INTRO_IMAGES.pc_habitinfo2, INTRO_IMAGES.habitinfo1];
const RECORD_IMAGES = [INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_list2, INTRO_IMAGES.pc_zoom1];
const HABIT_IMAGES = [INTRO_IMAGES.pc_habit, INTRO_IMAGES.pc_habitinfo1, INTRO_IMAGES.pc_habitinfo2, INTRO_IMAGES.habitbox];
const TRUST_IMAGES = [INTRO_IMAGES.pc_login, INTRO_IMAGES.pc_setting, INTRO_IMAGES.login, INTRO_IMAGES.setting];
const RESPONSIVE_IMAGES = [INTRO_IMAGES.list, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list2];
const desktopSectionClass = "grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-14 px-[min(7vw,112px)] py-24";
const desktopSectionTextClass = "m-0 break-keep text-lg leading-[1.75] text-[rgba(var(--greyTitle),0.72)]";
const trustCardClass = "flex min-h-[150px] flex-col gap-2 rounded-2xl px-4 py-5";

interface IntroSectionBlockProps {
  bg: 'white' | 'blue';
  reverse?: boolean;
  title: string;
  meta: string;
  text: string;
  children: ReactNode;
}

const IntroSectionBlock = ({ bg, reverse, title, meta, text, children }: IntroSectionBlockProps) => (
  <section
    className={desktopSectionClass}
    style={{ backgroundColor: bg === 'blue' ? INTRO_THEME_BG : 'white' }}
  >
    <div className={reverse ? "order-2 flex flex-col justify-center gap-[18px]" : "flex flex-col justify-center gap-[18px]"}>
      <div className="flex items-baseline justify-between gap-[18px]">
        <h2 className="m-0 flex-1 break-keep font-bmjua text-4xl capitalize leading-tight text-grey-title">{title}</h2>
        <span className="whitespace-nowrap text-base font-bold" style={{ color: INTRO_THEME_COLOR }}>{meta}</span>
      </div>
      <p className={desktopSectionTextClass}>{text}</p>
    </div>
    {children}
  </section>
);

const TrustCard = ({ icon, title, text }: { icon: ReactNode; title: string; text: string }) => (
  <div className={trustCardClass} style={{ backgroundColor: INTRO_THEME_BG, boxShadow: INTRO_CARD_SHADOW }}>
    <span className="inline-flex h-[30px] w-[30px] text-[30px]" style={{ color: INTRO_THEME_COLOR }}>{icon}</span>
    <strong className="text-lg text-grey-title">{title}</strong>
    <span className="text-base leading-normal text-[rgba(var(--greyTitle),0.64)]">{text}</span>
  </div>
);

const DesktopIntroView = () => {
  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden" style={{ backgroundColor: INTRO_PAGE_BG }}>
      <main className="mx-auto flex w-full flex-col">
        <section className="grid min-h-[100dvh] grid-cols-[minmax(420px,0.9fr)_minmax(0,1.1fr)] items-center gap-14 bg-white px-[min(7vw,112px)] py-[72px]">
          <div className="flex flex-col items-start gap-[22px]">
            <div className="mb-1">
              <Logo size={64} />
            </div>
            <h1 className="m-0 break-keep font-bmjua text-[52px] capitalize leading-[1.18] text-grey-title">툭! 오늘도 하나씩 :)</h1>
            <p className="m-0 break-keep text-[21px] leading-[1.7] text-grey-title">
              툭, 무심히 습관 발도장을 찍고 더 나은 나에게 OK를 건네세요.
              TOOK은 가볍게 기록하는 소리인 툭과, 더 좋은 방향으로 나아가자는 TO OK의 의미를 함께 담았습니다.
            </p>
            <IntroCtaButtons className="justify-start" />
          </div>
          <IntroImageCarousel images={HERO_IMAGES} height={520} priorityFirst sizes="50vw" />
        </section>

        <IntroSectionBlock bg="blue" title="홈에서 나의 흐름 확인" meta="일기와 습관 통계" text="감정의 흐름과 습관 실천 상태를 함께 보며 오늘의 컨디션과 꾸준함을 한 번에 점검할 수 있습니다.">
          <IntroImageCarousel images={HOME_IMAGES} height={460} sizes="46vw" />
        </IntroSectionBlock>

        <IntroSectionBlock bg="white" reverse title="기록을 한눈에 보기" meta="캘린더와 리스트" text="캘린더에서는 날짜별 기록을, 리스트에서는 감정 필터와 정렬을 활용해 지나온 날들을 더 쉽게 돌아볼 수 있습니다.">
          <IntroImageCarousel images={RECORD_IMAGES} height={460} sizes="46vw" />
        </IntroSectionBlock>

        <IntroSectionBlock bg="blue" title="습관은 차분히 점검" meta="달력과 차트" text="월간 달력과 연간 차트는 작은 실천이 어떻게 쌓이는지 보여줍니다. 완벽함보다 꾸준함에 집중할 수 있습니다.">
          <IntroImageCarousel images={HABIT_IMAGES} height={460} sizes="46vw" />
        </IntroSectionBlock>

        <section className="flex flex-col items-center gap-[22px] bg-white px-[min(7vw,112px)] py-24">
          <div className="flex items-baseline justify-between gap-[18px]">
            <h2 className="m-0 flex-1 break-keep font-bmjua text-4xl capitalize leading-tight text-grey-title">필요한 기본 기능까지</h2>
            <span className="whitespace-nowrap text-base font-bold" style={{ color: INTRO_THEME_COLOR }}>로그인, 테마, 보안</span>
          </div>
          <div className="grid w-[min(100%,980px)] grid-cols-3 gap-3">
            <TrustCard icon={<MdLogin />} title="소셜 로그인" text="익숙한 계정으로 빠르게 시작합니다." />
            <TrustCard icon={<MdPalette />} title="테마 설정" text="색상과 글꼴을 내 취향에 맞춥니다." />
            <TrustCard icon={<MdLockOutline />} title="일기 보안" text="개인 기록을 더 안심하고 남길 수 있습니다." />
          </div>
          <IntroImageCarousel images={TRUST_IMAGES} height={460} sizes="80vw" />
        </section>

        <IntroSectionBlock bg="blue" reverse title="기기마다 편하게" meta="모바일, 태블릿, 데스크탑" text="휴대폰과 태블릿에서는 모바일 흐름을 유지하고, 데스크탑에서는 더 넓은 화면에 맞춘 배치로 기록을 살펴봅니다.">
          <IntroImageCarousel images={RESPONSIVE_IMAGES} height={420} sizes="46vw" />
        </IntroSectionBlock>

        <section className="flex flex-col items-center gap-7 bg-white px-6 py-[82px]">
          <span className="inline-flex text-4xl" style={{ color: INTRO_THEME_COLOR }}><MdCheckBox /></span>
          <h2 className="m-0 break-keep text-center font-bmjua text-4xl leading-[1.3] text-grey-title">오늘도 툭, 더 나은 나에게 OK.</h2>
          <IntroCtaButtons />
        </section>
      </main>
    </div>
  );
};

export default DesktopIntroView;
