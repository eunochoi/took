'use client';

import { AccountInfoSection } from "./AccountInfoSection";
import { ThemeSettingsSection } from "./ThemeSettingsSection";

import { AccountActionSection } from "./AccountActionSection";

interface Props {
  email: string;
  provider: string;
  createAt: string;
  onDeleteAccount: () => void;
}

const SettingViewContent = ({ email, provider, createAt, onDeleteAccount }: Props) => {
  return (
    <div className="grid w-full gap-12 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:items-start desktop:gap-x-8">
      <div className="flex min-w-0 flex-col gap-12 desktop:col-start-1 desktop:row-start-1">
        <ThemeSettingsSection />
        <AccountActionSection onDeleteAccount={onDeleteAccount} />
      </div>
      <AccountInfoSection
        email={email}
        provider={provider}
        createAt={createAt}
        className="desktop:border-theme-border/60 desktop:col-start-2 desktop:row-start-1 desktop:border-l desktop:pl-8"
      />
    </div>
  );
};

export default SettingViewContent;
