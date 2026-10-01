import type { Metadata } from 'next';

import SettingClientPage from './SettingClientPage';

export const metadata: Metadata = {
  title: '설정',
  description: '화면 테마와 글꼴 등 나에게 맞는 설정을 관리해요.',
};

const SettingServerPage = () => <SettingClientPage />;

export default SettingServerPage;
