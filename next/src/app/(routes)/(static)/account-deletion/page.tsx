import type { Metadata } from 'next';

import AccountDeletionClientPage from './AccountDeletionClientPage';

export const metadata: Metadata = {
  title: 'Took 계정 삭제',
  description: 'Took 계정과 관련 데이터의 삭제를 요청할 수 있습니다.',
};

const AccountDeletionPage = () => {
  return <AccountDeletionClientPage />;
};

export default AccountDeletionPage;
