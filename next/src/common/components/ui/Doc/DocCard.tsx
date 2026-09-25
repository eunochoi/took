import { cn } from '@/common/utils/cn';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement>;

const docCardClass = 'mx-auto w-full max-w-[720px] border-b border-theme-border/60';

const DocCard = ({ className, ...props }: Props) => {
  return <section className={cn(docCardClass, className)} {...props} />;
};

export default DocCard;
