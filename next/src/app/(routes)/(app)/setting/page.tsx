'use client';

import { MdAndroid } from 'react-icons/md';

import AppPage from "@/common/components/layout/AppPage";
import PageTitle from "@/common/components/ui/PageTitle";
import TopButtonLink from "@/common/components/ui/TopButtons/TopButtonLink";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { format } from "date-fns";

import TopButton from '@/common/components/ui/TopButtons/TopButton';
import { useRouter } from 'next/navigation';
import { AccountInfoSection } from "./_components/AccountInfoSection";
import { AccountManageSection } from "./_components/AccountManageSection";
import { ThemeSettingsSection } from "./_components/ThemeSettingsSection";

const SettingPage = () => {
  usePrefetchPage();

  const router = useRouter();
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';


  return (
    <AppPage
      contentVariant="normal"
      contentProps={{ $gap: 24 }}
      topButtons={<>
        <TopButtonLink
          size="auto"
          href="https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer">
          <MdAndroid />
        </TopButtonLink>
        <TopButton
          size="default"
          onClick={() => router.push('/')}
        >
          intro
        </TopButton>
      </>}>

      <PageTitle title="앱 설정" />

      <ThemeSettingsSection />
      <AccountInfoSection email={email} provider={provider} createAt={createAt} />
      <AccountManageSection />

    </AppPage >
  );
};

export default SettingPage;
