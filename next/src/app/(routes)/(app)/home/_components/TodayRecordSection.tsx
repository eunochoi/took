'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdCheckBox, MdChevronRight, MdMenuBook } from 'react-icons/md';

import { getDiaryByDate } from '@/common/actions/diary';
import { getTodayHabitStat } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { AppSurfaceCard } from '@/common/components/ui/AppSurfaceCard';
import { AppSection, AppSectionHeader, AppSectionTitle } from '@/common/components/ui/AppSection';
import { getTodayString } from '@/common/functions/getTodayString';
import { useRouter } from 'next/navigation';

const recordStatusClass = 'text-sm text-theme-accent desktop:text-sm';
const recordCardClass = 'flex min-h-12 items-center gap-3 text-left text-sm shadow-none !py-2';

const TodayRecordSection = ({ initialDate }: { initialDate: string }) => {
  const [today, setToday] = useState(initialDate);
  const router = useRouter();

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
  const hasDiary = diaryQuery.data?.visible === true;

  const openTodayDiary = () => {
    if (diaryQuery.isPending) return;
    if (diaryQuery.isError) {
      void diaryQuery.refetch();
      return;
    }

    const diary = diaryQuery.data;
    router.push(diary?.visible ? `/diary/${diary.id}` : `/diary/new?date=${today}`, { scroll: false });
  };

  return (
    <AppSection className="min-w-0 text-left">
      <div className='hidden desktop:block'>
        <AppSectionHeader >
          <AppSectionTitle>오늘의 기록</AppSectionTitle>
        </AppSectionHeader>
      </div>
      <div className="flex flex-col gap-3">
        <AppSurfaceCard
          className={recordCardClass}
          onClick={openTodayDiary}
        >
          <MdMenuBook className="shrink-0 text-xl text-theme-accent" />
          <span className="flex-1 font-base">오늘의 감정 일기</span>
          <span className={recordStatusClass} aria-live="polite">
            {diaryQuery.isError ? '다시 시도' : diaryQuery.isPending ? '확인 중…' : hasDiary ? '일기 확인하기' : '일기 작성하기'}
          </span>
          <MdChevronRight className="shrink-0 text-xl text-theme-text-tertiary" />
        </AppSurfaceCard>

        <AppSurfaceCard
          className={recordCardClass}
          onClick={() => router.push('/habit')}
        >
          <MdCheckBox className="shrink-0 text-xl text-theme-accent" />
          <span className="flex-1 font-base">오늘의 습관</span>
          <span className={recordStatusClass} aria-live="polite">
            {habitQuery.isError ? '조회 실패' : habitQuery.isPending ? '확인 중…' : `${completedCount} / ${totalHabitCount} 완료`}
          </span>
          <MdChevronRight className="shrink-0 text-xl text-theme-text-tertiary" />
        </AppSurfaceCard>
      </div>
    </AppSection>
  );
};

export default TodayRecordSection;
