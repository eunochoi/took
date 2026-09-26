'use client';

import { getHabitById } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PanelDialog } from "../../ui/PanelDialog";
import { PanelBody } from "../../ui/PanelDialog/PanelBody";
import { PanelHeader } from "../../ui/PanelDialog/PanelHeader";
import HabitInfoHeader from "./HabitInfoHeader";
import MonthInfo from "./MonthInfo";
import YearInfo from "./YearInfo";

interface Props {
  habitId: string;
  today: string;
}

const HabitInfoClientPage = ({ habitId, today }: Props) => {
  const router = useRouter();
  const [isDialogMounted, setIsDialogMounted] = useState(true);
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
      {isDialogMounted && (
        <PanelDialog
          ariaLabel="습관 정보"
          onClose={() => setIsDialogMounted(false)}
        >
          <PanelHeader title='습관 정보' onBack={() => setIsDialogMounted(false)} />
          <PanelBody showScrollFade>
            <div className="flex w-full flex-col pb-6 tablet:pb-7">
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
          </PanelBody>
        </PanelDialog>
      )}
    </AnimatePresence>
  );
};

export default HabitInfoClientPage;
