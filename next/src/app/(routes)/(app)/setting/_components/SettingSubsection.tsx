import { ReactNode } from "react";

interface SettingSubsectionProps {
  title: string;
  children: ReactNode;
}

export const SettingSubsection = ({ title, children }: SettingSubsectionProps) => {
  return (
    <section className="flex min-w-0 flex-col gap-3">
      <h2 className="text-lg font-semibold text-theme-text-primary">{title}</h2>
      <div className="flex min-w-0 flex-col gap-6 p-2">
        {children}
      </div>
    </section>
  );
};
