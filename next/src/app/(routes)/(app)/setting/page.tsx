'use client';


import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { format } from "date-fns";

import TopButton from '@/common/components/ui/TopButton';
import { useRouter } from 'next/navigation';
import { AccountInfoSection } from "./_components/AccountInfoSection";
import { ThemeSettingsSection } from "./_components/ThemeSettingsSection";

import { MdPrivacyTip } from "react-icons/md";
import { AccountActionSection } from "./_components/AccountActionSection";


const SettingPage = () => {
  usePrefetchPage();

  const router = useRouter();
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';


  return (
    <AppPageLayout
      title="설정"
      description="나에게 편안한 기록 공간을 만들어요"
      contentProps={{ className: "gap-6" }}
      showScrollToTop={false}
      topButton={<>
        <TopButton
          onClick={() => router.push('https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share')}>
          PlayStore
        </TopButton>
        <TopButton
          aria-label="개인정보 처리방침"
          onClick={() => router.push('/privacy')}
        >
          <MdPrivacyTip size={18} />
        </TopButton>
      </>}>


      <div className="grid w-full gap-6 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:grid-rows-[auto_1fr] desktop:items-start desktop:gap-x-8 desktop:gap-y-4">
        <div className="flex min-w-0 flex-col gap-6 desktop:row-span-2 desktop:grid desktop:grid-rows-subgrid desktop:self-stretch">
          <ThemeSettingsSection />
          <AccountActionSection onDeleteAccount={() => router.push('/account-deletion')} />
        </div>
        <AccountInfoSection
          email={email}
          provider={provider}
          createAt={createAt}
          className="desktop:col-start-2 desktop:row-start-1"
        />
      </div>
    </AppPageLayout >
  );
};

export default SettingPage;
