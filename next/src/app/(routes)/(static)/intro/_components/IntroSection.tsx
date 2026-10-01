import { ReactNode } from 'react';

import { cn } from '@/common/utils/cn';
import { twMerge } from 'tailwind-merge';
import { introContainerClass, introContentClass, introDescriptionClass, introSectionClass, introTitleClass } from '../_styles/classes';

interface IntroSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  reverse?: boolean;
}

const IntroSection = ({ title, description, children, reverse = false }: IntroSectionProps) => (
  <section className={twMerge(introSectionClass)}>
    <div className={cn(
      introContainerClass,
      'grid items-center gap-8 desktop:gap-16',
      reverse
        ? 'desktop:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'
        : 'desktop:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]',
    )}>
      <div className={cn(introContentClass, reverse && 'desktop:order-2 desktop:text-right')}>
        <h2 className={introTitleClass}>{title}</h2>
        <p className={introDescriptionClass}>{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

export default IntroSection;
