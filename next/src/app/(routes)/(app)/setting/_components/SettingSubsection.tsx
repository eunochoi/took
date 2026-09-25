import { ReactNode } from "react";

interface SettingSubsectionProps {
  title: string;
  children: ReactNode;
}

export const SettingSubsection = ({ title, children }: SettingSubsectionProps) => {
  return (
    <section className="min-w-0 py-6 first:pt-0 last:pb-0">
      <h2 className="mb-3 text-lg font-semibold text-theme-text-primary">{title}</h2>
      <div className="p-2">
        {children}
      </div>
    </section>
  );
};
