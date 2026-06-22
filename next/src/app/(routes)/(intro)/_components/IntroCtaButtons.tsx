'use client';

import { useRouter } from 'next/navigation';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { MdInstallMobile, MdLanguage, MdOpenInNew } from 'react-icons/md';
import styled from 'styled-components';

import { SnackBarAction } from '@/common/utils/snackBar/SnackBarAction';
import { usePwaInstall } from '../_hooks/usePwaInstall';
import { INTRO_CARD_SHADOW, INTRO_THEME_BG, INTRO_THEME_COLOR } from '../_constants/theme';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share';

interface IntroCtaButtonsProps {
  tone?: 'light' | 'dark';
}

const IntroCtaButtons = ({ tone = 'light' }: IntroCtaButtonsProps) => {
  const router = useRouter();
  const { installPwa } = usePwaInstall();

  const startInWeb = () => {
    const action = () => (
      <SnackBarAction
        yesAction={() => {
          closeSnackbar('startInWeb');
          router.push('/login');
        }}
        noAction={() => closeSnackbar('startInWeb')}
      />
    );

    enqueueSnackbar(
      <div>
        <p>웹에서 계속 진행하시겠습니까?</p>
        <WarningText>실행 환경에 따라 레이아웃이 어긋날 수 있습니다.</WarningText>
        <WarningText>원활한 이용을 위해 앱 설치를 권장합니다.</WarningText>
      </div>,
      { key: 'startInWeb', persist: false, action, autoHideDuration: 3000 }
    );
  };

  return (
    <ButtonGroup>
      <CtaButton type="button" $tone={tone} onClick={startInWeb}>
        <MdLanguage />
        웹에서 실행
      </CtaButton>
      <CtaButton type="button" $tone={tone} onClick={installPwa}>
        <MdInstallMobile />
        PWA 설치
      </CtaButton>
      <CtaButton type="button" $tone={tone} onClick={() => router.push(PLAY_STORE_URL)}>
        <MdOpenInNew />
        Play Store
      </CtaButton>
    </ButtonGroup>
  );
};

export default IntroCtaButtons;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  width: 100%;
`;

const CtaButton = styled.button<{ $tone: 'light' | 'dark' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: rgb(var(--greyTitle));
  border: 1px solid rgba(140, 173, 226, 0.26);
  background-color: ${({ $tone }) => ($tone === 'dark' ? 'rgba(255, 255, 255, 0.78)' : INTRO_THEME_BG)};
  box-shadow: ${INTRO_CARD_SHADOW};
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: ${INTRO_THEME_COLOR};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 420px) {
    flex: 1 1 100%;
  }
`;

const WarningText = styled.p`
  margin-top: 8px;
  color: #DC7889;
  font-size: 16px;

  & + & {
    margin-top: 0;
  }
`;
