import { AppSurfaceCard } from '@/common/components/ui/AppSection/card';
import { cn } from '@/common/utils/cn';
import type { ReactNode } from 'react';

interface Props {
  className?: string;
  description: string;
  icon: ReactNode;
  title: string;
}

const EmptyStateCard = ({ className, description, icon, title }: Props) => (
  <AppSurfaceCard className={cn('flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 py-10 text-center', className)}>
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-theme-accent/10 text-3xl text-theme-accent">
      {icon}
    </div>
    <div className="flex flex-col gap-1.5">
      <h2 className="m-0 text-lg font-bold text-theme-text-primary">{title}</h2>
      <p className="m-0 break-keep text-sm leading-relaxed text-theme-text-secondary">{description}</p>
    </div>
  </AppSurfaceCard>
);

export default EmptyStateCard;
