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

const HERO_IMAGES = [INTRO_IMAGES.calendar, INTRO_IMAGES.list, INTRO_IMAGES.habit];
const HOME_IMAGES = [INTRO_IMAGES.habitinfo1, INTRO_IMAGES.habitinfo2, INTRO_IMAGES.calendar];
const RECORD_IMAGES = [INTRO_IMAGES.calendar, INTRO_IMAGES.list, INTRO_IMAGES.list2, INTRO_IMAGES.zoom1];
const HABIT_IMAGES = [INTRO_IMAGES.habit, INTRO_IMAGES.habitbox, INTRO_IMAGES.habitinfo1, INTRO_IMAGES.habitinfo2];
const TRUST_IMAGES = [INTRO_IMAGES.login, INTRO_IMAGES.setting, INTRO_IMAGES.otherinfo1];
const RESPONSIVE_IMAGES = [INTRO_IMAGES.list, INTRO_IMAGES.pc_list, INTRO_IMAGES.pc_calendar, INTRO_IMAGES.pc_list2];

const MobileIntroView = () => {
  return (
    <Page>
      <Content>
        <HeroSection>
          <Logo size={52} />
          <HeroCopy>
            <Title>TOOK! 오늘도 하나씩 :)</Title>
            <SubTitle>
              <span>툭, 무심히 습관 발도장을 찍고</span>
              <span>더 나은 나에게 OK를 건네세요.</span>
            </SubTitle>
            <Description>
              TOOK은 가볍게 기록하는 소리인 툭과, 더 좋은 방향으로 나아가자는 TO OK의 의미를 함께 담았습니다.
            </Description>
          </HeroCopy>
          <IntroCtaButtons />
          <IntroImageCarousel images={HERO_IMAGES} height={420} priorityFirst sizes="90vw" />
        </HeroSection>

        <IntroSection $bg="blue">
          <SectionHeader>
            <SectionTitle>홈에서 나의 흐름 확인</SectionTitle>
            <SectionMeta>일기와 습관 통계</SectionMeta>
          </SectionHeader>
          <SectionText>
            감정 기록과 습관 실천 데이터를 한 화면에서 살펴보며 오늘의 상태를 빠르게 점검할 수 있습니다.
          </SectionText>
          <IntroImageCarousel images={HOME_IMAGES} height={400} sizes="86vw" />
        </IntroSection>

        <IntroSection $bg="white">
          <SectionHeader>
            <SectionTitle>기록을 한눈에 보기</SectionTitle>
            <SectionMeta>캘린더와 리스트</SectionMeta>
          </SectionHeader>
          <SectionText>
            캘린더와 리스트 형식으로 감정 일기와 습관을 확인하고, 감정별 필터와 날짜 정렬로 스스로를 더 쉽게 돌아볼 수 있습니다.
          </SectionText>
          <IntroImageCarousel images={RECORD_IMAGES} height={420} sizes="86vw" />
        </IntroSection>

        <IntroSection $bg="blue">
          <SectionHeader>
            <SectionTitle>습관은 차분히 점검</SectionTitle>
            <SectionMeta>달력과 차트</SectionMeta>
          </SectionHeader>
          <SectionText>
            월간 실천 여부는 달력으로, 연간 흐름은 차트로 확인해 꾸준함이 쌓이는 과정을 볼 수 있습니다.
          </SectionText>
          <IntroImageCarousel images={HABIT_IMAGES} height={420} sizes="86vw" />
        </IntroSection>

        <IntroSection $bg="white">
          <SectionHeader>
            <SectionTitle>필요한 기본 기능까지</SectionTitle>
            <SectionMeta>로그인, 테마, 보안</SectionMeta>
          </SectionHeader>
          <InfoGrid>
            <InfoCard>
              <MdLogin />
              <strong>소셜 로그인</strong>
              <span>익숙한 계정으로 빠르게 시작합니다.</span>
            </InfoCard>
            <InfoCard>
              <MdPalette />
              <strong>테마 설정</strong>
              <span>색상과 글꼴을 내 취향에 맞춥니다.</span>
            </InfoCard>
            <InfoCard>
              <MdLockOutline />
              <strong>일기 보안</strong>
              <span>개인 기록을 더 안심하고 남길 수 있습니다.</span>
            </InfoCard>
          </InfoGrid>
          <IntroImageCarousel images={TRUST_IMAGES} height={380} sizes="86vw" />
        </IntroSection>

        <IntroSection $bg="blue">
          <SectionHeader>
            <SectionTitle>기기마다 편하게</SectionTitle>
            <SectionMeta>모바일, 태블릿, 데스크탑</SectionMeta>
          </SectionHeader>
          <SectionText>
            휴대폰과 태블릿에서는 모바일 흐름으로, 데스크탑에서는 더 넓은 화면에 맞춘 UI로 기록을 살펴봅니다.
          </SectionText>
          <IntroImageCarousel images={RESPONSIVE_IMAGES} height={340} sizes="86vw" />
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

export default MobileIntroView;

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
  padding-bottom: 48px;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 48px 20px 56px;
  background-color: white;
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  line-height: 1.25;
  word-break: keep-all;
`;

const SubTitle = styled.p`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  color: rgb(var(--greyTitle));
  font-size: 18px;
  line-height: 1.5;
  word-break: keep-all;
`;

const Description = styled.p`
  margin: 0;
  color: rgba(var(--greyTitle), 0.68);
  font-size: 15px;
  line-height: 1.7;
  word-break: keep-all;
`;

const IntroSection = styled.section<{ $bg: 'white' | 'blue' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding: 64px 20px;
  background-color: ${({ $bg }) => ($bg === 'blue' ? INTRO_THEME_BG : 'white')};
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 620px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  flex: 1;
  margin: 0;
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 30px;
  font-family: 'BMJUA';
  line-height: 1.25;
  word-break: keep-all;
`;

const SectionMeta = styled.span`
  color: ${INTRO_THEME_COLOR};
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
`;

const SectionText = styled.p`
  max-width: 620px;
  margin: 0;
  color: rgba(var(--greyTitle), 0.72);
  font-size: 16px;
  line-height: 1.65;
  text-align: center;
  word-break: keep-all;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  width: min(100%, 520px);
`;

const InfoCard = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 4px 12px;
  padding: 16px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.82);
  box-shadow: ${INTRO_CARD_SHADOW};

  svg {
    grid-row: span 2;
    width: 28px;
    height: 28px;
    color: ${INTRO_THEME_COLOR};
  }

  strong {
    color: rgb(var(--greyTitle));
    font-size: 17px;
  }

  span {
    color: rgba(var(--greyTitle), 0.64);
    font-size: 15px;
    line-height: 1.5;
  }
`;

const FinalSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 64px 20px;
  background-color: white;
`;

const FinalIcon = styled.span`
  display: inline-flex;
  color: ${INTRO_THEME_COLOR};
  font-size: 32px;
`;

const FinalTitle = styled.h2`
  margin: 0;
  color: rgb(var(--greyTitle));
  font-size: 26px;
  font-family: 'BMJUA';
  line-height: 1.35;
  text-align: center;
  word-break: keep-all;
`;
