'use client';

import { getHabitById } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Modal } from "../../ui/Modal";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";
import HabitInfoHeader from "./HabitInfoHeader";
import MonthInfo from "./MonthInfo";
import YearInfo from "./YearInfo";

interface Props {
  habitId: string;
  today: string;
}

const HabitInfoView = ({ habitId, today }: Props) => {
  const router = useRouter();
  const [isModalMounted, setIsModalMounted] = useState(true);
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
    <AnimatePresence onExitComplete={() => router.back()}>
      {isModalMounted && (
        <Modal
          ariaLabel="습관 정보"
          onClose={() => setIsModalMounted(false)}
          overlayClassName="z-[99999]"
          contentClassName="bg-theme-accent-light"
          variant={{ base: 'full', tablet: 'right', desktop: 'right' }}
        >
          <ModalHeader className="bg-theme-accent-light" title='습관 정보' onBack={() => setIsModalMounted(false)} />
          <ModalBody withScrollFade className="bg-theme-accent-light">
            <div className="flex w-full flex-col bg-theme-accent-light px-[4dvw] pb-6 tablet:px-6 tablet:pb-7">
              <HabitInfoHeader habitData={habitDataById} />

              <MonthInfo
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
      )}
    </AnimatePresence>
  );
};

export default HabitInfoView;
