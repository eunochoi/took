'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdCheckBox, MdChevronRight, MdMenuBook } from 'react-icons/md';

import { selectedDayInfoStyles } from '../../calendar/_components/SelectedDayInfo/selectedDayInfoStyles';

import { getDiaryByDate } from '@/common/actions/diary';
import { getTodayHabitStat } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { AppSurfaceCard } from '@/common/components/ui/AppSection/card';
import { getTodayString } from '@/common/functions/getTodayString';

const recordCardClass = 'flex min-h-14 items-center gap-3 border border-theme-border-muted text-left text-sm';

const TodayRecordSection = ({ initialDate }: { initialDate: string }) => {
  const router = useRouter();
  const [today, setToday] = useState(initialDate);

  useEffect(() => {
    const syncToday = () => setToday(getTodayString());
    syncToday();
    const interval = window.setInterval(syncToday, 30_000);
    window.addEventListener('focus', syncToday);
    document.addEventListener('visibilitychange', syncToday);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', syncToday);
      document.removeEventListener('visibilitychange', syncToday);
    };
  }, []);

  const diaryQuery = useQuery({
    queryKey: ['diary', 'date', today],
    queryFn: () => authAction(() => getDiaryByDate({ date: today })),
    staleTime: 60_000,
  });
  const habitQuery = useQuery({
    queryKey: ['habit', 'today-stat'],
    queryFn: () => authAction(getTodayHabitStat),
    staleTime: 60_000,
  });
  const completedCount = habitQuery.data?.todayDoneHabits ?? 0;
  const totalHabitCount = habitQuery.data?.createdHabits ?? 0;

  return (
    <div className="flex w-full min-w-0 flex-col gap-2.5 text-left">
      {diaryQuery.isError ? (
        <AppSurfaceCard className={recordCardClass} role="alert">
          <span className="flex-1 text-xs">일기를 불러오지 못했어요.</span>
          <button type="button" className="shrink-0 text-xs text-theme-accent" onClick={() => void diaryQuery.refetch()}>다시 시도</button>
        </AppSurfaceCard>
      ) : diaryQuery.isPending ? (
        <AppSurfaceCard className={recordCardClass} role="status"><span className="text-xs text-theme-text-secondary">일기 확인 중…</span></AppSurfaceCard>
      ) : (
        <AppSurfaceCard
          className={`${recordCardClass} cursor-pointer`}
          role="link"
          tabIndex={0}
          onClick={() => router.push('/calendar')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') router.push('/calendar');
          }}
        >
          <MdMenuBook className="shrink-0 text-xl text-theme-accent" />
          <span className="flex-1">오늘 일기</span>
          <span className={selectedDayInfoStyles.habit.completedStatus} aria-live="polite">{diaryQuery.data?.visible ? '작성 완료' : '아직 작성 전'}</span>
          <MdChevronRight className="shrink-0 text-xl text-theme-text-tertiary" />
        </AppSurfaceCard>
      )}
      <AppSurfaceCard
        className={`${recordCardClass} cursor-pointer`}
        role="link"
        tabIndex={0}
        onClick={() => router.push('/habit')}
        onKeyDown={(event) => {
          if (event.key === 'Enter') router.push('/habit');
        }}
      >
        <MdCheckBox className="shrink-0 text-xl text-theme-accent" />
        <span className="flex-1">오늘 습관</span>
          <span className={selectedDayInfoStyles.habit.completedStatus} aria-live="polite">
          {habitQuery.isError ? '조회 실패' : habitQuery.isPending ? '확인 중…' : `${completedCount} / ${totalHabitCount} 완료`}
        </span>
        <MdChevronRight className="shrink-0 text-xl text-theme-text-tertiary" />
      </AppSurfaceCard>
    </div>
  );
};

export default TodayRecordSection;
