'use client';

import AppPageLayout from '@/common/components/layout/AppPageLayout';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { usePrefetchPage } from '@/common/hooks/usePrefetchPage';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import SettingViewContent from './_components/SettingViewContent';
import SettingViewToolbar from './_components/SettingViewToolbar';
import SettingViewTopSection from './_components/SettingViewTopSection';

const SettingClientPage = () => {
  usePrefetchPage();

  const router = useRouter();
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';

  return (
    <AppPageLayout
      topSection={<SettingViewTopSection />}
      showScrollToTop={false}
      toolbar={<SettingViewToolbar />}
      mainSection={
        <SettingViewContent
          email={email}
          provider={provider}
          createAt={createAt}
          onDeleteAccount={() => router.push('/account-deletion')}
        />
      }
    />
  );
};

export default SettingClientPage;
