'use client';

import { useRouter } from 'next/navigation';
import { MdAndroid, MdDeleteForever, MdLogout, MdLowPriority } from 'react-icons/md';

import AppPage from "@/common/components/layout/AppPage";
import { AppCard, AppSection, AppSectionTitle } from "@/common/components/ui/AppSection";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { format } from "date-fns";

import { FontSizeSelector } from "./_components/FontSizeSelector";
import { FontTypeSelector } from "./_components/FontTypeSelector";
import { SettingItem } from "./_components/SettingItem";
import { ThemeColorSelector } from "./_components/ThemeColorSelector";
import { onDeleteAccount } from "./_functions/onDeleteAccount";
import { onLogout } from "./_functions/onLogout";

const SettingPage = () => {
  usePrefetchPage();
  const router = useRouter();

  const dev = process.env.NODE_ENV === 'development';
  const protocol = dev ? 'http://' : 'https://';
  const introURL = `${protocol}${process.env.NEXT_PUBLIC_DOMAIN}/intro`;
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';

  return (
    <AppPage
      contentVariant="normal"
      contentProps={{ $gap: 56 }}
      topButtons={<>
        <a href="https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer" >
          <button className="auto"><MdAndroid /></button>
        </a>
        <a href={introURL}
          target="_blank"
          rel="noopener noreferrer" >
          <button className="normal">intro</button>
        </a>
      </>}>
      <AppSection>
        <AppSectionTitle>계정 정보</AppSectionTitle>
        <AppCard>
          <section className="flex flex-col gap-3 px-5 py-4">
            <SettingItem settingItemKey="이메일" settingItemValue={<span>{email}</span>}></SettingItem>
            <SettingItem settingItemKey="계정 타입" settingItemValue={<span>{provider}</span>}></SettingItem>
            <SettingItem settingItemKey="가입일" settingItemValue={<span>{createAt}</span>}></SettingItem>
          </section>
        </AppCard>
      </AppSection>

      <AppSection>
        <AppSectionTitle>앱 설정</AppSectionTitle>
        <AppCard>
          <section className="flex flex-col gap-3 px-5 py-4">
            <span className="block text-[22px] font-medium capitalize text-gray-500">테마 색상</span>
            <ThemeColorSelector />
          </section>
        </AppCard>
        <AppCard>
          <section className="flex flex-col gap-3 px-5 py-4">
            <span className="block text-[22px] font-medium capitalize text-gray-500">폰트</span>
            <SettingItem
              settingItemKey="다이어리 글씨 크기"
              settingItemValue={<FontSizeSelector />} />
            <SettingItem
              settingItemKey="폰트 타입"
              settingItemValue={<FontTypeSelector />} />
          </section>
        </AppCard>
        <AppCard>
          <section className="flex flex-col gap-3 px-5 py-4">
            <span className="block text-[22px] font-medium capitalize text-gray-500">습관</span>
            <SettingItem
              settingItemKey="습관 순서 커스텀"
              settingItemValue={
                <button onClick={() => {
                  router.push('/inter/habitOrder', { scroll: false })
                }}>
                  <MdLowPriority />
                </button>} />
          </section>
        </AppCard>
      </AppSection>

      <AppSection>
        <AppSectionTitle>계정 관리</AppSectionTitle>
        <AppCard>
          <section className="flex flex-col gap-3 px-5 py-4">
            <SettingItem
              settingItemKey="로그아웃"
              settingItemValue={
                <button onClick={onLogout}>
                  <MdLogout />
                </button>} />
            <SettingItem
              settingItemKey="회원 탈퇴"
              settingItemValue={
                <button onClick={onDeleteAccount}>
                  <MdDeleteForever />
                </button>} />
          </section>
        </AppCard>
      </AppSection>
    </AppPage >
  );
}

export default SettingPage;
