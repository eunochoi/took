import type { Metadata } from 'next';

import LoginClientPage from './LoginClientPage';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Google 계정으로 로그인하고 툭에서 감정 일기와 습관 기록을 시작해요.',
};

const LoginServerPage = () => <LoginClientPage />;

export default LoginServerPage;
