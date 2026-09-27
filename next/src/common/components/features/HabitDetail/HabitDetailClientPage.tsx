'use client';

import { getHabitById } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import HabitMenus from "@/common/components/ui/Habit/HabitMenus";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdMoreVert } from 'react-icons/md';

import { PanelDialog } from "../../ui/Dialog/PanelDialog";
import { PanelBody } from "../../ui/Dialog/PanelDialog/PanelBody";
import { PanelHeader } from "../../ui/Dialog/PanelDialog/PanelHeader";
import HabitInfoHeader from "./HabitInfoHeader";
import MonthInfo from "./MonthInfo";
import YearInfo from "./YearInfo";

interface Props {
  habitId: string;
  today: string;
}

const HabitDetailClientPage = ({ habitId, today }: Props) => {
  const router = useRouter();
  const [isDialogMounted, setIsDialogMounted] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [chartDate, setChartDate] = useState<Date>(new Date());

  const { data: habitDataById, isError } = useQuery({
    queryKey: ['habit', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: habitId !== null,
  });

  useEffect(() => {
    if (isError && isDialogMounted) notFound();
  }, [isError, isDialogMounted]);

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isDialogMounted && (
        <PanelDialog
          ariaLabel="습관 정보"
          onClose={() => setIsDialogMounted(false)}
        >
          <PanelHeader
            title="습관 정보"
            onBack={() => setIsDialogMounted(false)}
            rightAction={habitDataById && (
              <>
                <button
                  className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-theme-text-tertiary"
                  aria-label={`${habitDataById.name} 수정·삭제 메뉴`}
                  aria-expanded={isMenuOpen}
                  onClick={() => setMenuOpen((open) => !open)}
                  type="button"
                >
                  <MdMoreVert aria-hidden="true" />
                </button>
                <HabitMenus
                  habitId={habitDataById.id}
                  habitName={habitDataById.name}
                  priority={habitDataById.priority}
                  isMenuOpen={isMenuOpen}
                  setMenuOpen={setMenuOpen}
                  onDeleted={() => setIsDialogMounted(false)}
                />
              </>
            )}
          />
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

export default HabitDetailClientPage;
