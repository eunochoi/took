'use client';

import styled from 'styled-components';

import useIsMobile from '@/common/functions/useIsMobile';
import DesktopIntroView from './_components/DesktopIntroView';
import MobileIntroView from './_components/MobileIntroView';

const IntroView = () => {
  const isMobile = useIsMobile();

  return (
    <Container>
      {isMobile === false ? <DesktopIntroView /> : <MobileIntroView />}
    </Container>
  );
};

export default IntroView;

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: auto;
  background-color: #f3f7fc;
`;
