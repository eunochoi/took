'use client';

import { getHabitById } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";
import { ModalRoot } from "../../ui/Modal/ModalRoot";
import { StarRating } from "../../ui/StarRating";
import MonthInfo from "./MonthInfo";
import YearInfo from "./YearInfo";

interface Props {
  habitId: string;
}

const HabitInfoView = ({ habitId }: Props) => {
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [chartDate, setChartDate] = useState<Date>(new Date());

  const { data: habitDataById, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: habitId !== null,
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);

  return (
    <ModalRoot>
      <ModalHeader title='습관 정보' />
      <ModalBody withScrollFade>
        <div className="flex w-full flex-col gap-12 px-4 py-4 pb-6 min-[480px]:px-6 min-[480px]:py-5 min-[480px]:pb-7">
          <section className="flex w-full flex-col items-center gap-2">
            <StarRating rating={(habitDataById?.priority ?? 0) + 1} className="items-center justify-center text-lg" />
            <div className="break-words text-center text-[28px] font-semibold uppercase text-grey-title">
              {habitDataById?.name ?? '-'}
            </div>
          </section>

          <MonthInfo
            displayDate={calendarDate}
            habitId={habitId}
            setDisplayDate={setCalendarDate}
          />

          <YearInfo
            displayDate={chartDate}
            habitId={habitId}
            setDisplayDate={setChartDate} />
        </div>
      </ModalBody>
    </ModalRoot>
  );
};

export default HabitInfoView;
