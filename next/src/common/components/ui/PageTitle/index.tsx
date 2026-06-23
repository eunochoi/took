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
      <span className="w-full font-bmjua text-[32px] text-grey-title min-[1025px]:text-4xl">{title}</span>
      {hasDescription && <span className="text-lg text-gray-500">{description}</span>}
    </div>
  );
};

export default PageTitle;
