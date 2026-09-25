'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
}

const HabitTodayProgressBar = ({ completedCount, rate, totalCount }: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const rateValue = Math.min(Math.max(Number(rate) || 0, 0), 100);

  return (
    <section className="flex w-full min-w-0 flex-col gap-4 my-4">
      <div className="flex w-full items-center justify-between gap-3">
        <div className='flex flex-col gap-2'>
          <h2 className="font-title text-lg font-semibold text-theme-text-primary">오늘의 습관 진척도</h2>
          <span className="pl-2 shrink-0 font-title text-base font-semibold text-theme-text-tertiary">
            {completedCount}/{totalCount} 완료
          </span>
        </div>
        <strong className='pr-2 text-theme-accent font-semibold text-5xl'>{rate}%</strong>
      </div>
      <div className='p-2'>
        <div
          className="h-5 w-full overflow-hidden rounded-full bg-theme-accent/15"
          role="progressbar"
          aria-label="오늘의 습관 진척도"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rateValue}
          aria-valuetext={`${completedCount}/${totalCount} 완료`}
        >
          <motion.div
            className="h-full w-full origin-left rounded-full bg-theme-accent"
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: rateValue / 100 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HabitTodayProgressBar;
