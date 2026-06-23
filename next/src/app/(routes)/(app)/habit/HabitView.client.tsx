'use client';

import AppPage from "@/common/components/layout/AppPage";
import { authAction } from "@/common/auth/authAction";
import { getHabitList } from "@/common/actions/habit";
import PageTitle from "@/common/components/ui/PageTitle";
import TopButton from "@/common/components/ui/TopButtons/TopButton";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { MdAdd } from 'react-icons/md';
import HabitBox from "./_components/HabitBox";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useHabitToggle } from "./_hooks/useHabitToggle";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

interface Habit {
  id: number;
  name: string;
  priority: number;
}

const MAX_HABIT_COUNT = 18;

type SORT = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';
const SORT_TEXT: Record<SORT, string> = {
  ASC: 'old',
  DESC: 'new',
  PRIORITY: '★',
  CUSTOM: 'custom'
}

const HabitView = () => {
  usePrefetchPage();
  const router = useRouter();
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { toggleValue, onToggle } = useHabitToggle();
  const { customOrder } = useCustomHabitOrder();

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', toggleValue],
    queryFn: () => authAction(() => getHabitList({ sort: toggleValue, customOrder })),
  });

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) enqueueSnackbar(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`, { variant: 'info' })
    else router.push('/inter/input/addHabit', { scroll: false })
  }


  return (
    <AppPage
      contentVariant="normal"
      topButtons={
        <TopButton onClick={onToggle} size={toggleValue === 'CUSTOM' ? 'auto' : 'default'} >
          <span>{SORT_TEXT[toggleValue]}</span>
        </TopButton>
      }>
        <PageTitle
          title={`목표 습관 ${todayDoneHabitRate}% 완료`}
          description={`오늘의 목표 습관 ${todayDoneHabitCount}개를 실천하셨습니다 :)`}
          className="mb-7"
        />

        <div className="grid h-auto w-full shrink-0 grid-cols-2 grid-rows-[auto] gap-3 pb-2 min-[480px]:max-[1023px]:grid-cols-3 min-[1024px]:grid-cols-3">
          {habits?.map((habit: Habit) => <HabitBox key={habit.id} id={habit.id} name={habit.name} priority={habit.priority} />)}
          {(habits?.length ?? 0) < MAX_HABIT_COUNT && (
            <button
              className="flex aspect-[0.8] w-full shrink-0 items-center justify-center rounded-3xl bg-white/90 text-5xl text-theme shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
              onClick={onAddHabit}
              type="button"
            >
              <MdAdd />
            </button>
          )}
        </div>
    </AppPage >
  );
}

export default HabitView;
