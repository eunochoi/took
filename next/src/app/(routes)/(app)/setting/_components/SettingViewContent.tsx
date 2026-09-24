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
    <div className="grid w-full gap-6 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:grid-rows-[auto_1fr] desktop:items-start desktop:gap-x-8 desktop:gap-y-4">
      <div className="flex min-w-0 flex-col gap-6 desktop:row-span-2 desktop:grid desktop:grid-rows-subgrid desktop:self-stretch">
        <ThemeSettingsSection />
        <AccountActionSection onDeleteAccount={onDeleteAccount} />
      </div>
      <AccountInfoSection
        email={email}
        provider={provider}
        createAt={createAt}
        className="desktop:col-start-2 desktop:row-start-1"
      />
    </div>
  );
};

export default SettingViewContent;
