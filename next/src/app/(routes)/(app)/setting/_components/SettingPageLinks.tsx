'use client';

import { useRouter } from 'next/navigation';

import { FaGooglePlay } from 'react-icons/fa';
import { MdPrivacyTip } from "react-icons/md";
import { SettingSubsection } from "./SettingSubsection";

const SettingPageLinks = () => {
  const router = useRouter();
  const onOpenStore = () => router.push('https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share');
  const onOpenPrivacy = () => router.push('/privacy');

  return (
    <SettingSubsection title="관련 링크">
      <button
        type="button"
        onClick={onOpenStore}
        className="flex w-full items-center justify-between gap-2 text-left text-base text-theme-text-secondary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-theme-accent"
      >
        <span>PlayStore</span>
        <FaGooglePlay className="shrink-0 text-xl text-theme-accent" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onOpenPrivacy}
        className="flex w-full items-center justify-between gap-2 text-left text-base text-theme-text-secondary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-theme-accent"
      >
        <span>개인정보 처리방침</span>
        <MdPrivacyTip className="shrink-0 text-xl text-theme-accent" aria-hidden="true" />
      </button>
    </SettingSubsection>
  );
};

export default SettingPageLinks;
