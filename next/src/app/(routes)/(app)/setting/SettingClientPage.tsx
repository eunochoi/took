'use client';

import AppPageLayout from '@/common/components/layout/AppPageLayout';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { usePrefetchPage } from '@/common/hooks/usePrefetchPage';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import SettingPageContent from './_components/SettingPageContent';
import SettingPageTopSection from './_components/SettingPageTopSection';

const SettingClientPage = () => {
  usePrefetchPage();

  const router = useRouter();
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';

  return (
    <AppPageLayout
      topSection={<SettingPageTopSection />}
      showScrollToTop={false}
      mainSection={
        <SettingPageContent
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
