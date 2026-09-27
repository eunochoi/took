'use client';

import { AccountInfoSection } from "./AccountInfoSection";
import { ThemeSettingsSection } from "./ThemeSettingsSection";

import { cn } from "@/common/utils/cn";
import { AccountActionSection } from "./AccountActionSection";
import SettingPageLinks from "./SettingPageLinks";

interface Props {
  email: string;
  provider: string;
  createAt: string;
  onDeleteAccount: () => void;
}

const SettingPageContent = ({ email, provider, createAt, onDeleteAccount }: Props) => {
  return (
    <section className="pt-3 grid w-full gap-12 desktop:-mb-96 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:items-start desktop:gap-x-8 desktop:gap-y-0">
      <div className="flex min-w-0 flex-col gap-12 desktop:col-start-1 desktop:row-start-1">
        <ThemeSettingsSection />
        <AccountActionSection onDeleteAccount={onDeleteAccount} />
      </div>
      <div className={cn(
        "desktop:sticky desktop:top-[max(112px,calc(var(--page-toolbar-height,0px)+24px))] desktop:self-start",
        "flex min-w-0 flex-col gap-12 desktop:border-theme-border/60 desktop:col-start-2 desktop:row-start-1 desktop:row-span-2 desktop:border-l desktop:pl-8"
      )}>
        <SettingPageLinks />
        <AccountInfoSection
          email={email}
          provider={provider}
          createAt={createAt}
        />
      </div>
      {/* Keep the shared BottomSafe outside the grid while extending the sticky row into its space. */}
      <div aria-hidden="true" className="hidden desktop:col-span-2 desktop:row-start-2 desktop:block desktop:h-96" />
    </section>
  );
};

export default SettingPageContent;
