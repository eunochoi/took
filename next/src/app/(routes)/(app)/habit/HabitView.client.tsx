'use client';

import HabitViewContent from "./_components/HabitViewContent";
import HabitViewToolbar from "./_components/HabitViewToolbar";

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout, { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";
import bottomCat from '/public/img/bottom-cat.png';

const HabitView = () => {
  usePrefetchPage();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { sortValue, onToggle } = useSortToggle({ sortKey: 'habit' });
  const { customHabitOrder } = useCustomHabitOrder();

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue]);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortValue],
    queryFn: () => authAction(() => getHabitList({ sortType: sortValue, customHabitOrder })),
  });

  const totalHabitCount = habits?.length ? habits?.length : 0;

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) {
      enqueueSnackbar(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`);
    }
    else {
      router.push('/inter/input/addHabit', { scroll: false });
    }
  };

  return (
    <AppPageLayout
      appPageTopArea={
        <div className={`bg-theme-accent-light ${APP_PAGE_CONTENT_PADDING_CLASS_NAME}`}>
          <AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />
          <Image src={bottomCat} alt="bottom-cat" className="ml-auto mt-auto block w-full tablet:w-2/3 desktop:w-2/3" />
        </div>
      }
      mainAreaClassName="flex-1 bg-theme-surface px-[4dvw] py-2 tablet:px-9 tablet:py-4 desktop:px-14 desktop:py-8"
      pageRef={pageRef}
      showScrollToTop
      toolbar={
        <HabitViewToolbar
          onToggle={onToggle}
          onAddHabit={onAddHabit}
          sortValue={sortValue}
        />
      }
      appPageMainArea={
        <HabitViewContent
          habits={habits}
          totalHabitCount={totalHabitCount}
          todayDoneHabitCount={todayDoneHabitCount}
          todayDoneHabitRate={todayDoneHabitRate}
        />
      }
    />
  );
}

export default HabitView;
