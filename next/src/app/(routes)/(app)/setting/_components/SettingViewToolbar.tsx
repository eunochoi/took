'use client';

import ToolbarButton from '@/common/components/ui/ToolbarButton';

import { MdPrivacyTip, MdShop } from "react-icons/md";

interface Props {
  onOpenStore: () => void;
  onOpenPrivacy: () => void;
}

const SettingViewToolbar = ({ onOpenStore, onOpenPrivacy }: Props) => {
  return (
    <>
      <ToolbarButton
        onClick={onOpenStore}>
        <MdShop size={18} className="shrink-0" aria-hidden="true" />
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
