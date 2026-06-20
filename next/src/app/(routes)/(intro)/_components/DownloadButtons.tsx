'use client';

import { useRouter } from 'next/navigation';
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from 'notistack';
import { MdAndroid, MdInstallMobile } from 'react-icons/md';
import styled from 'styled-components';

import { SnackBarAction } from '@/common/utils/snackBar/SnackBarAction';
import { usePwaInstall } from '../_hooks/usePwaInstall';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share';

interface Props {
  variant?: 'outro';
}

const DownloadButtons = ({ variant }: Props) => {
  const router = useRouter();
  const { installPwa } = usePwaInstall();

  const goToPlayStore = () => {
    router.push(PLAY_STORE_URL);
  };

  const startInWeb = () => {
    const action = (snackbarId: SnackbarKey) => (
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
        <p style={{ fontSize: '16px', marginTop: '8px', color: '#DC7889' }}>
          🚨 실행 환경에 따라 레이아웃이 어긋날 수 있습니다.
        </p>
        <p style={{ fontSize: '16px', color: '#DC7889' }}>
          원할한 이용을 위해 앱을 설치해주세요.
        </p>
      </div>,
      { key: 'startInWeb', persist: false, action, autoHideDuration: 3000 }
    );
  };

  return (
    <>
      <ButtonGroup>
        <DownloadButton $variant={variant} onClick={goToPlayStore}>
          <MdAndroid className="icon" />Android
        </DownloadButton>
        <DownloadButton $variant={variant} onClick={installPwa}>
          <MdInstallMobile className="icon" />PWA
        </DownloadButton>
      </ButtonGroup>
      <WebLink $variant={variant} onClick={startInWeb}>
        웹에서 실행하기
      </WebLink>
    </>
  );
};

export default DownloadButtons;


const ButtonGroup = styled.div`
  display: flex;
`;

const DownloadButton = styled.button<{ $variant?: 'outline' | 'outro' }>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 6px;
  padding: 6px 24px;
  border-radius: 32px;
  font-size: 18px;
  color: rgb(var(--greyTitle));
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: #8CADE255;

  .icon {
    margin-right: 8px;
  }

  ${({ $variant }) =>
    $variant === 'outline' &&
    `
    background-color: transparent;
    border-color: #8CADE255;
    padding: 6px 32px;
  `}

  ${({ $variant }) =>
    $variant === 'outro' &&
    `
    background-color: rgba(255, 255, 255, 0.8);
    border-color: #8CADE255;
  `}
`;

const WebLink = styled.button<{ $variant?: 'outro' }>`
  font-size: 18px;
  padding: 0 4px;
  border-bottom: solid 2px #8CADE255;
  color: #8CADE2;

  ${({ $variant }) =>
    $variant === 'outro' &&
    `
    color: rgb(var(--greyTitle));
    border-color: rgb(var(--greyTitle));
  `}
`;
