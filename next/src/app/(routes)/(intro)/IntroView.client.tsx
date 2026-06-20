'use client';

import Image from 'next/image';
import styled from 'styled-components';

import Carousel from '@/common/components/ui/Carousel';
import Logo from '@/common/components/ui/Logo';
import DownloadButtons from './_components/DownloadButtons';
import FeatureSection from './_components/FeatureSection';
import { INTRO_IMAGES, SECTION_IMAGES } from './_constants/images';

const IntroView = () => {
  return (
    <Container>
      {/* 메인 소개 */}
      <Section $bg="white">
        <CenterBox>
          <Logo size={64} />
        </CenterBox>
        <Heading>
          <span>내일 더 나은 나로 나아가기 위해</span>
          <span>감정 일기와 습관 만들기를 시작하세요.</span>
        </Heading>
        <MediaCarousel>
          <Carousel objectFit="contain">
            {SECTION_IMAGES.intro.map((src, i) => (
              <Image key={`intro-${i}`} src={src} alt="intro" width={600} height={600} priority />
            ))}
          </Carousel>
        </MediaCarousel>
        <DownloadButtons />
        <CaptionGroup>
          <Caption>iOS 사용자의 경우 PWA를 설치하여 이용 가능합니다.</Caption>
          <Caption>*로그인 화면이 나타나지 않는 경우, 앱을 재실행 해주세요.</Caption>
        </CaptionGroup>
      </Section>

      {/* 감정 기능 */}
      <FeatureSection
        $bg="lightBlue"
        tag="#emotions"
        headings={['감정을 정리하고 기록하세요.', '긍정적 변화가 시작됩니다.']}
        captions={["'기쁨', '행복', '무난한 감정', '슬픔', '분노'", '5가지 감정 선택을 지원합니다.']}
        images={[INTRO_IMAGES.emotions]}
        showIndicator={false}
      />

      {/* 뷰 기능 */}
      <FeatureSection
        $bg="white"
        tag="#view feature"
        headings={['일기, 감정, 습관 목록을 한눈에!', '달력 뷰와 리스트 뷰를 이용하세요.']}
        captions={['리스트 뷰에서 감정별 모아보기와', '날짜별 오름/내림 차순 정렬을 지원합니다.']}
        images={SECTION_IMAGES.view}
      />

      {/* 습관 기능 */}
      <FeatureSection
        $bg="lightBlue"
        tag="#habit feature"
        headings={['완벽하지 않아도 괜찮습니다.', '부담없는 습관부터 시도하세요.']}
        captions={['습관 목록은 최대 18개까지 생성 가능하며', '최근 4일 동안만 완료 여부를 선택할 수 있습니다.']}
        images={[INTRO_IMAGES.habitbox]}
        showIndicator={false}
      />

      {/* 습관 뷰 기능 */}
      <FeatureSection
        $bg="white"
        tag="#habit view feature"
        headings={['습관이 형성되는 시간 21일!', '실천 결과를 확인하고 점검하세요.']}
        captions={['월간 습관 실천 여부는 달력 형태로', '연간 실천 여부는 그래프로 확인 가능합니다.']}
        images={SECTION_IMAGES.habit}
      />

      {/* 반응형 UI */}
      <Section $bg="lightBlue">
        <SectionTag>#Responsive UI</SectionTag>
        <Heading>
          <span>모바일, 데스크탑 PC, 태블릿 등</span>
          <span>다양한 환경에 최적화된 UI를 제공합니다.</span>
        </Heading>
        <HorizontalScroll>
          {SECTION_IMAGES.ui.map((src, i) => (
            <ScrollImage key={`ui-${i}`} src={src} alt="ui" width={500} height={500} priority />
          ))}
        </HorizontalScroll>
      </Section>

      {/* 마무리 */}
      <Section $bg="blue">
        <DownloadButtons variant="outro" />
        <CenterBox>
          <Logo size={64} />
        </CenterBox>
      </Section>
    </Container >
  );
};

export default IntroView;


const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
  background-color: #f3f7fc;
`;

const Section = styled.section<{ $bg?: 'white' | 'blue' | 'lightBlue' }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px 0;
  
  background-color: ${({ $bg }) => {
    if ($bg === 'white') return 'white';
    if ($bg === 'lightBlue') return '#f3f7fc';
    if ($bg === 'blue') return '#cbd9ea';
    return 'white';
  }};

  > * {
    margin: 24px 0;
  }

  @media (min-width: 480px) and (max-width: 1024px) {
    padding: 64px 0;
    > * {
      margin: 28px 0;
    }
  }

  @media (min-width: 1025px) {
    padding: 80px 0;
    > * {
      margin: 32px 0;
    }
  }
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionTag = styled.span`
  color: #8CADE2;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 22px;
  }

  @media (min-width: 1025px) {
    font-size: 28px;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span {
    font-size: 20px;
    color: rgb(var(--greyTitle));
    line-height: 1.4;

    @media (min-width: 480px) and (max-width: 1024px) {
      font-size: 24px;
    }

    @media (min-width: 1025px) {
      font-size: 28px;
      color: #5f5f5f;
      white-space: nowrap;
    }
  }
`;

const CaptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Caption = styled.span`
  color: grey;
  font-size: 16px;
  text-align: center;

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 18px;
  }

  @media (min-width: 1025px) {
    font-size: 20px;
  }
`;


const MediaCarousel = styled.div`
  height: 65dvh;
  width: 100%;
`;

const HorizontalScroll = styled.div`
  display: flex;
  align-items: center;
  width: 100dvw;
  overflow-x: scroll;
  padding: 18px 36px;

  @media (min-width: 1025px) {
    padding: 18px 72px;
  }
`;

const ScrollImage = styled(Image)`
  flex-shrink: 0;
  height: 300px;
  width: auto;
  margin: 0 9px;

  @media (min-width: 1025px) {
    height: 400px;
    margin: 0 18px;
  }
`;