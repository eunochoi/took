import { ReactNode } from "react";

interface SettingSubsectionProps {
  title: string;
  children: ReactNode;
}

export const SettingSubsection = ({ title, children }: SettingSubsectionProps) => {
  return (
    <section className="subsection flex-row">
      <span className="mb-3 block text-lg font-semibold capitalize text-gray-500">{title}</span>
      {children}
    </section>
  );
};
