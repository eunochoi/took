import type { Metadata } from 'next';

import IntroClientPage from './IntroClientPage';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '감정 일기와 습관 기록으로 나만의 속도로 하루를 쌓아가는 툭을 소개합니다.',
};

const IntroServerPage = () => <IntroClientPage />;

export default IntroServerPage;
