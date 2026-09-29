'use client';

import { checkHabit as checkHabitAction, getHabitRecentStatus, uncheckHabit as uncheckHabitAction } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { showNotice } from '@/common/components/ui/Notice/notice';
import { getTodayString } from "@/common/functions/getTodayString";
import { cn } from "@/common/utils/cn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { MdCheck } from "react-icons/md";
import HabitBoxHeader from "./HabitBoxHeader";
import HabitBoxRecentDays from "./HabitBoxRecentDays";
import HabitBoxRecentSkeleton from "./HabitBoxRecentSkeleton";

interface Props {
  name: string;
  id: number;
  priority: number;
  iconKey: string;
}

const HabitBox = ({ name, id, priority, iconKey }: Props) => {
  const queryClient = useQueryClient();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const updatingRef = useRef(false);

  const todayString = getTodayString();

  const { data: recentDateStatus, isError, refetch } = useQuery({
    queryKey: ['habit', id, 'recent', todayString],
    queryFn: () => authAction(() => getHabitRecentStatus({ id, date: todayString })),
  });
  const todayCompleted = !!recentDateStatus?.[0];


  const onToggleHabit = async (checked: boolean, dateString: string) => {
    if (updatingRef.current) return;
    updatingRef.current = true;
    setUpdating(true);
    try {
      if (checked) {
        await authAction(() => checkHabitAction({ habitId: id, date: dateString }));
      }
      else {
        await authAction(() => uncheckHabitAction({ habitId: id, date: dateString }));
      }

      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ['habit', 'today-stat'], exact: true }),
        queryClient.invalidateQueries({ queryKey: ['habit', 'date'] }),
        queryClient.invalidateQueries({ queryKey: ['habit', 'id', String(id)] }),
        queryClient.invalidateQueries({ queryKey: ['diary'] }),
        queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] }),
        queryClient.invalidateQueries({ queryKey: ['stats', 'habit'] }),
        queryClient.invalidateQueries({ queryKey: ['stats', 'years'] }),
      ]);
      const result = await refetch();
      if (result.isError) {
        showNotice('습관 기록을 다시 불러오지 못했어요.');
      }
    } catch (error) {
      showNotice(error instanceof Error ? error.message : '습관 체크 변경 실패');
    } finally {
      updatingRef.current = false;
      setUpdating(false);
    }
  };

  const controlsDisabled = isUpdating || !recentDateStatus;

  return (
    <article className={cn("relative mx-auto flex h-full w-full min-w-0 flex-col gap-4 bg-theme-surface px-2 py-4 desktop:px-4 desktop:py-6", isMenuOpen && "z-10")}>
      <HabitBoxHeader
        id={id}
        name={name}
        priority={priority}
        iconKey={iconKey}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      />
      {recentDateStatus === undefined && !isError ? (
        <HabitBoxRecentSkeleton />
      ) : recentDateStatus === undefined ? (
        <div className="flex min-h-[124px] flex-col items-center justify-center gap-3 text-center text-sm text-theme-text-secondary">
          <span>최근 기록을 불러오지 못했어요.</span>
          <button type="button" className="text-theme-accent" onClick={() => { void refetch(); }}>다시 시도</button>
        </div>
      ) : (
        <>
          <HabitBoxRecentDays
            name={name}
            recentDateStatus={recentDateStatus}
            controlsDisabled={controlsDisabled}
            onToggleHabit={onToggleHabit}
          />
          <button
            type="button"
            disabled={controlsDisabled || todayCompleted}
            onClick={() => onToggleHabit(true, todayString)}
            className={cn(
              "w-full min-h-10 mt-auto self-start rounded-xl px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed",
              todayCompleted ? "bg-theme-bg text-theme-text-secondary" : "bg-theme-accent/75 text-theme-text-on-accent",
            )}
          >
            {todayCompleted ? <span className="flex justify-center items-center gap-2"><MdCheck className="shrink-0" />오늘 완료했어요</span> : '오늘 완료하기'}
          </button>
        </>
      )}
    </article>
  );
};

export default HabitBox;
