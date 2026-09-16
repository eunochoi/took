'use client';

import { checkHabit as checkHabitAction, deleteHabit as deleteHabitAction, getHabitRecentStatus, uncheckHabit as uncheckHabitAction } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { getTodayString } from "@/common/functions/getTodayString";
import { SnackBarAction } from "@/common/providers/snackbar/SnackBarAction";
import { cn } from "@/common/utils/cn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useRef, useState } from "react";

import HabitBoxHeader from "./HabitBoxHeader";
import HabitBoxRecentDays from "./HabitBoxRecentDays";
import HabitBoxProgress from "./HabitBoxProgress";

interface Props {
  name: string;
  id: number;
  priority: number;
}

const HabitBox = ({ name, id, priority }: Props) => {
  const queryClient = useQueryClient();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const updatingRef = useRef(false);

  const todayString = getTodayString();

  const { data: recentDateStatus, isFetching } = useQuery({
    queryKey: ['habit', id, 'recent', todayString],
    queryFn: () => authAction(() => getHabitRecentStatus({ id, date: todayString })),
  });

  const onDeleteHabit = () => {
    const action = () => (
      <SnackBarAction
        yesAction={async () => {
          closeSnackbar('deleteHabit');
          try {
            await authAction(() => deleteHabitAction({ habitId: id }));
            queryClient.invalidateQueries({ queryKey: ['habits'] });
            queryClient.invalidateQueries({ queryKey: ['habit'] });
            queryClient.invalidateQueries({ queryKey: ['diary'] });
            queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] });
            queryClient.invalidateQueries({ queryKey: ['stats', 'habit'] });
            queryClient.invalidateQueries({ queryKey: ['stats', 'years'] });
            enqueueSnackbar('습관 항목 삭제 완료');
          } catch (error) {
            enqueueSnackbar(error instanceof Error ? error.message : '습관 항목 삭제 실패');
          }
        }}
        noAction={() => {
          closeSnackbar('deleteHabit');
        }} />
    );
    enqueueSnackbar(`습관 항목(${name})을 지우시겠습니까?`, { key: 'deleteHabit', persist: false, action, autoHideDuration: 3000 });
  };

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

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['habits'] }),
        queryClient.invalidateQueries({ queryKey: ['habit'] }),
        queryClient.invalidateQueries({ queryKey: ['diary'] }),
        queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] }),
        queryClient.invalidateQueries({ queryKey: ['stats', 'habit'] }),
        queryClient.invalidateQueries({ queryKey: ['stats', 'years'] }),
      ]);
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : '습관 체크 변경 실패');
    } finally {
      updatingRef.current = false;
      setUpdating(false);
    }
  };

  const controlsDisabled = isUpdating || isFetching || !recentDateStatus;

  return (
    <div className={cn("relative flex min-w-0 flex-col gap-5 rounded-theme bg-theme-surface p-3 shadow-theme-section sm:p-5", isMenuOpen && "z-10")}>
      <HabitBoxHeader
        id={id}
        name={name}
        priority={priority}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        onDeleteHabit={onDeleteHabit}
      />
      <HabitBoxRecentDays
        name={name}
        recentDateStatus={recentDateStatus}
        controlsDisabled={controlsDisabled}
        onToggleHabit={onToggleHabit}
      />
      <HabitBoxProgress
        name={name}
        recentDateStatus={recentDateStatus}
        controlsDisabled={controlsDisabled}
        onCompleteToday={() => onToggleHabit(true, todayString)}
      />
    </div>
  );
};

export default HabitBox;
