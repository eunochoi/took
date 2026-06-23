'use client';

import { checkHabit as checkHabitAction, deleteHabit as deleteHabitAction, getHabitRecentStatus, uncheckHabit as uncheckHabitAction } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { StarRating } from "@/common/components/ui/StarRating";
import { getTodayString } from "@/common/functions/getTodayString";
import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { ChangeEvent } from "react";
import { MdOutlineDeleteForever, MdOutlineEdit, MdOutlineInsertChart } from 'react-icons/md';

interface Props {
  name: string;
  id: number;
  priority: number;
}

const HabitBox = ({ name, id, priority }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const todayString = getTodayString();
  const currentDate = new Date();
  let recentDateArray = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  recentDateArray = recentDateArray.map((e, i) => subDays(e, i));

  const { data: recentDateStatus } = useQuery({
    queryKey: ['habit', name, 'recent'],
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

  const ontoggleHabit = async (e: ChangeEvent<HTMLInputElement>, dateString: string) => {
    try {
      if (e.currentTarget.checked === true) {
        await authAction(() => checkHabitAction({ habitId: id, date: dateString }));
      }
      else {
        await authAction(() => uncheckHabitAction({ habitId: id, date: dateString }));
      }

      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'habit'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'years'] });
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : '습관 체크 변경 실패');
    }
  };

  return (
    <div className="flex aspect-[0.8] w-full flex-col items-center justify-evenly rounded-3xl bg-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <StarRating rating={priority + 1} />
      <div className="flex h-auto w-full items-center justify-center text-center text-app font-medium text-grey-title">
        <span className="max-w-[90%] overflow-scroll whitespace-nowrap">{name}</span>
      </div>
      <div className="my-1.5 flex h-auto w-full items-center justify-evenly">
        {recentDateArray.map((date, i: number) => {
          return (
            <div key={`${date}-${name}`} className="flex h-full items-center justify-center">
              <label htmlFor={`${date}-${name}`} className="flex h-full flex-col items-center justify-between text-sm font-medium text-gray-500">
                <span className={i === 0 ? "text-theme" : "text-grey-title"}>{format(date, 'eee', { locale: ko })}</span>
                <span className="my-0.5">{format(date, 'd')}</span>
                <input
                  id={`${date}-${name}`}
                  className="peer absolute h-0 w-0 cursor-pointer opacity-0"
                  type="checkbox"
                  checked={!!recentDateStatus?.[i]}
                  onChange={(e) => {
                    ontoggleHabit(e, format(date, 'yyyy-MM-dd'));
                  }} />
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/5 peer-checked:[&>div]:bg-theme">
                  <div className="h-3 w-3 shrink-0 rounded-full transition-all duration-[400ms] ease-in-out" />
                </div>
              </label>
            </div>
          );
        })}
      </div>
      <div className="flex h-auto w-full items-center justify-center text-[#b9b9b9] [&>button]:mx-2 [&>button]:text-xl">
        <button onClick={() => router.push(`/inter/habitInfo?id=${id}`, { scroll: false })} type="button">
          <MdOutlineInsertChart />
        </button>
        <button onClick={() => router.push(`/inter/input/editHabit?id=${id}`, { scroll: false })} type="button">
          <MdOutlineEdit />
        </button>
        <button onClick={onDeleteHabit} type="button">
          <MdOutlineDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default HabitBox;
