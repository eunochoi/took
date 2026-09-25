'use client';

import ToolbarButton from '@/common/components/ui/ToolbarButton';
import { useRouter } from 'next/navigation';

import { FaGooglePlay } from 'react-icons/fa';
import { MdPrivacyTip } from "react-icons/md";

const SettingViewToolbar = () => {
  const router = useRouter();
  const onOpenStore = () => router.push('https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share');
  const onOpenPrivacy = () => router.push('/privacy');

  return (
    <>
      <ToolbarButton
        onClick={onOpenStore}>
        <FaGooglePlay size={18} className="shrink-0" aria-hidden="true" />
        PlayStore
      </ToolbarButton>
      <ToolbarButton
        aria-label="개인정보 처리방침"
        onClick={onOpenPrivacy}
      >
        <MdPrivacyTip size={18} />
      </ToolbarButton>
    </>
  );
};

export default SettingViewToolbar;
