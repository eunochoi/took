'use client';

import SettingViewContent from "./_components/SettingViewContent";
import SettingViewToolbar from "./_components/SettingViewToolbar";
import SettingViewTopArea from "./_components/SettingViewTopArea";

import AppPageLayout, { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { format } from "date-fns";

import { useRouter } from 'next/navigation';

const SettingPage = () => {
  usePrefetchPage();

  const router = useRouter();
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';

  return (
    <AppPageLayout
      contentWrapperClassName={APP_PAGE_CONTENT_PADDING_CLASS_NAME}
      appPageTopArea={<SettingViewTopArea />}
      showScrollToTop={false}
      toolbar={
        <SettingViewToolbar
          onOpenStore={() => router.push('https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share')}
          onOpenPrivacy={() => router.push('/privacy')}
        />
      }
      appPageMainArea={
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

export default SettingPage;
