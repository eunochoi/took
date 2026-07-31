import { ReactNode } from "react";

import { cn } from "@/common/utils/cn";

interface PageTitleProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

const PageTitle = ({ title, description, className }: PageTitleProps) => {
  const hasDescription = description !== undefined && description !== null && description !== "";

  return (
    <div className={cn("mt-4 flex flex-col items-start justify-center", hasDescription && "gap-2", className)}>
      <span className="w-full font-title font-bold text-3xl text-theme-accent desktop:text-4xl">{title}</span>
      {hasDescription && <span className="text-base text-theme-text-secondary">{description}</span>}
    </div>
  );
};

export default PageTitle;
