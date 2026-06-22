import { MdCheckBox, MdLockOutline, MdLogin, MdPalette } from 'react-icons/md';
import styled from 'styled-components';

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

const HERO_IMAGES = [INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_habit, INTRO_IMAGES.calendar];
const HOME_IMAGES = [INTRO_IMAGES.pc_habitinfo1, INTRO_IMAGES.pc_habitinfo2, INTRO_IMAGES.habitinfo1];
const RECORD_IMAGES = [INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_list2, INTRO_IMAGES.pc_zoom1];
const HABIT_IMAGES = [INTRO_IMAGES.pc_habit, INTRO_IMAGES.pc_habitinfo1, INTRO_IMAGES.pc_habitinfo2, INTRO_IMAGES.habitbox];
const TRUST_IMAGES = [INTRO_IMAGES.pc_login, INTRO_IMAGES.pc_setting, INTRO_IMAGES.login, INTRO_IMAGES.setting];
const RESPONSIVE_IMAGES = [INTRO_IMAGES.list, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list2];

const DesktopIntroView = () => {
  return (
    <Page>
      <Content>
        <HeroSection>
          <HeroContent>
            <LogoBox>
              <Logo size={64} />
            </LogoBox>
            <HeroTitle>TOOK! 오늘도 하나씩 :)</HeroTitle>
            <HeroText>
              툭, 무심히 습관 발도장을 찍고 더 나은 나에게 OK를 건네세요.
              TOOK은 가볍게 기록하는 소리인 툭과, 더 좋은 방향으로 나아가자는 TO OK의 의미를 함께 담았습니다.
            </HeroText>
            <IntroCtaButtons />
          </HeroContent>
          <IntroImageCarousel images={HERO_IMAGES} height={520} priorityFirst sizes="50vw" />
        </HeroSection>

        <IntroSection $bg="blue">
          <TextColumn>
            <SectionHeader>
              <SectionTitle>홈에서 나의 흐름 확인</SectionTitle>
              <SectionMeta>일기와 습관 통계</SectionMeta>
            </SectionHeader>
            <SectionText>
              감정의 흐름과 습관 실천 상태를 함께 보며 오늘의 컨디션과 꾸준함을 한 번에 점검할 수 있습니다.
            </SectionText>
          </TextColumn>
          <IntroImageCarousel images={HOME_IMAGES} height={460} sizes="46vw" />
        </IntroSection>

        <IntroSection $bg="white" $reverse>
          <TextColumn>
            <SectionHeader>
              <SectionTitle>기록을 한눈에 보기</SectionTitle>
              <SectionMeta>캘린더와 리스트</SectionMeta>
            </SectionHeader>
            <SectionText>
              캘린더에서는 날짜별 기록을, 리스트에서는 감정 필터와 정렬을 활용해 지나온 날들을 더 쉽게 돌아볼 수 있습니다.
            </SectionText>
          </TextColumn>
          <IntroImageCarousel images={RECORD_IMAGES} height={460} sizes="46vw" />
        </IntroSection>

        <IntroSection $bg="blue">
          <TextColumn>
            <SectionHeader>
              <SectionTitle>습관은 차분히 점검</SectionTitle>
              <SectionMeta>달력과 차트</SectionMeta>
            </SectionHeader>
            <SectionText>
              월간 달력과 연간 차트는 작은 실천이 어떻게 쌓이는지 보여줍니다. 완벽함보다 꾸준함에 집중할 수 있습니다.
            </SectionText>
          </TextColumn>
          <IntroImageCarousel images={HABIT_IMAGES} height={460} sizes="46vw" />
        </IntroSection>

        <TrustSection>
          <SectionHeader>
            <SectionTitle>필요한 기본 기능까지</SectionTitle>
            <SectionMeta>로그인, 테마, 보안</SectionMeta>
          </SectionHeader>
          <TrustGrid>
            <TrustCard>
              <MdLogin />
              <strong>소셜 로그인</strong>
              <span>익숙한 계정으로 빠르게 시작합니다.</span>
            </TrustCard>
            <TrustCard>
              <MdPalette />
              <strong>테마 설정</strong>
              <span>색상과 글꼴을 내 취향에 맞춥니다.</span>
            </TrustCard>
            <TrustCard>
              <MdLockOutline />
              <strong>일기 보안</strong>
              <span>개인 기록을 더 안심하고 남길 수 있습니다.</span>
            </TrustCard>
          </TrustGrid>
          <IntroImageCarousel images={TRUST_IMAGES} height={460} sizes="80vw" />
        </TrustSection>

        <IntroSection $bg="blue" $reverse>
          <TextColumn>
            <SectionHeader>
              <SectionTitle>기기마다 편하게</SectionTitle>
              <SectionMeta>모바일, 태블릿, 데스크탑</SectionMeta>
            </SectionHeader>
            <SectionText>
              휴대폰과 태블릿에서는 모바일 흐름을 유지하고, 데스크탑에서는 더 넓은 화면에 맞춘 배치로 기록을 살펴봅니다.
            </SectionText>
          </TextColumn>
          <IntroImageCarousel images={RESPONSIVE_IMAGES} height={420} sizes="46vw" />
        </IntroSection>

        <FinalSection>
          <FinalIcon><MdCheckBox /></FinalIcon>
          <FinalTitle>오늘도 툭, 더 나은 나에게 OK.</FinalTitle>
          <IntroCtaButtons />
        </FinalSection>
      </Content>
    </Page>
  );
};

export default DesktopIntroView;

const Page = styled.div`
  width: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
  background-color: ${INTRO_PAGE_BG};
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(420px, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 56px;
  min-height: 100dvh;
  padding: 72px min(7vw, 112px);
  background-color: white;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;

  > div:last-child {
    justify-content: flex-start;
  }
`;

const LogoBox = styled.div`
  margin-bottom: 4px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 52px;
  font-family: 'BMJUA';
  line-height: 1.18;
  word-break: keep-all;
`;

const HeroText = styled.p`
  margin: 0;
  color: rgb(var(--greyTitle));
  font-size: 21px;
  line-height: 1.7;
  word-break: keep-all;
`;

const IntroSection = styled.section<{ $bg: 'white' | 'blue'; $reverse?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 56px;
  padding: 96px min(7vw, 112px);
  background-color: ${({ $bg }) => ($bg === 'blue' ? INTRO_THEME_BG : 'white')};

  ${({ $reverse }) =>
    $reverse &&
    `
      > *:first-child {
        order: 2;
      }
    `}
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
`;

const SectionTitle = styled.h2`
  flex: 1;
  margin: 0;
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 36px;
  font-family: 'BMJUA';
  line-height: 1.25;
  word-break: keep-all;
`;

const SectionMeta = styled.span`
  color: ${INTRO_THEME_COLOR};
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
`;

const SectionText = styled.p`
  margin: 0;
  color: rgba(var(--greyTitle), 0.72);
  font-size: 18px;
  line-height: 1.75;
  word-break: keep-all;
`;

const TrustSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding: 96px min(7vw, 112px);
  background-color: white;
`;

const TrustGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: min(100%, 980px);
`;

const TrustCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 150px;
  padding: 20px 16px;
  border-radius: 16px;
  background-color: ${INTRO_THEME_BG};
  box-shadow: ${INTRO_CARD_SHADOW};

  svg {
    width: 30px;
    height: 30px;
    color: ${INTRO_THEME_COLOR};
  }

  strong {
    color: rgb(var(--greyTitle));
    font-size: 18px;
  }

  span {
    color: rgba(var(--greyTitle), 0.64);
    font-size: 16px;
    line-height: 1.5;
  }
`;

const FinalSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 82px 24px;
  background-color: white;
`;

const FinalIcon = styled.span`
  display: inline-flex;
  color: ${INTRO_THEME_COLOR};
  font-size: 36px;
`;

const FinalTitle = styled.h2`
  margin: 0;
  color: rgb(var(--greyTitle));
  font-size: 36px;
  font-family: 'BMJUA';
  line-height: 1.3;
  text-align: center;
  word-break: keep-all;
`;
