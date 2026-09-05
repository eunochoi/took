'use client';

import { getHabitById } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Modal } from "../../ui/Modal";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";
import { StarRating } from "../../ui/StarRating";
import HabitMonthCalendar from "./HabitMonthCalendar";
import YearInfo from "./YearInfo";

interface Props {
  habitId: string;
  today: string;
}

const HabitInfoView = ({ habitId, today }: Props) => {
  const router = useRouter();
  const [chartDate, setChartDate] = useState<Date>(new Date());

  const { data: habitDataById, isError } = useQuery({
    queryKey: ['habit', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: habitId !== null,
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);

  return (
    <Modal
      ariaLabel="습관 정보"
      isOpen
      onClose={() => router.back()}
      overlayClassName="z-[99999]"
      variant={{ base: 'full', tablet: 'center-base', desktop: 'center-base' }}
    >
      <ModalHeader title='습관 정보' onBack={() => router.back()} />
      <ModalBody withScrollFade>
        <div className="flex w-full flex-col gap-12 px-4 py-4 pb-6 tablet:px-6 tablet:py-5 tablet:pb-7">
          <section className="flex w-full flex-col items-center gap-2">
            <StarRating rating={(habitDataById?.priority ?? 0) + 1} className="items-center justify-center text-lg" />
            <div className="break-words text-center text-2xl font-semibold uppercase text-theme-text-primary">
              {habitDataById?.name ?? '-'}
            </div>
          </section>

          <HabitMonthCalendar
            key={habitId}
            habitId={habitId}
            today={today}
          />

          <YearInfo
            displayDate={chartDate}
            habitId={habitId}
            setDisplayDate={setChartDate} />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default HabitInfoView;
