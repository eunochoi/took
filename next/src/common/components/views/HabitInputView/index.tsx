'use client';

import { authAction } from "@/common/auth/authAction";
import { createHabit, getHabitById, updateHabit } from "@/common/actions/habit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { MdCheckBox, MdOutlineStar } from "react-icons/md";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";
import { ModalRoot } from "../../ui/Modal/ModalRoot";
import { SectionTitle, SectionTitleIcon } from "../../ui/SectionTitle";
import { HabitInputCard } from "./HabitInputCard";
import { HabitName } from "./HabitName";
import { HabitRating } from "./HabitRating";

interface HabitInputProps {
  isEdit: boolean;
  habitId?: string;
}

const HabitInputView = ({ isEdit, habitId }: HabitInputProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: habitData, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: isEdit === true && !!habitId
  });

  const [habitName, setHabitName] = useState<string>(habitData?.name ?? '');
  const [priority, setPriority] = useState<number>(habitData?.priority ?? 0);

  useEffect(() => {
    if (habitData) {
      setHabitName(habitData.name ?? '');
      setPriority(habitData.priority ?? 0);
    }
  }, [habitData]);

  const submitText = isEdit ? '수정' : '추가';

  const onSubmit = async () => {
    if (habitName.length > 0 && habitName.length <= 10) {
      const successMessage = isEdit ? '습관 항목 수정 완료' : '습관 항목 생성 완료';
      const errorMessage = isEdit ? '습관 항목 수정 실패' : '습관 항목 생성 실패';

      try {
        if (isEdit && habitId) {
          await authAction(() => updateHabit({ habitId, habitName, priority }));
        }
        else {
          await authAction(() => createHabit({ habitName, priority }));
        }

        queryClient.invalidateQueries({ queryKey: ['habits'] });
        queryClient.invalidateQueries({ queryKey: ['habit'] });
        router.back();
        setTimeout(() => enqueueSnackbar(successMessage), 300);
      } catch (error) {
        enqueueSnackbar(errorMessage);
      }
    }
    else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.');
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);

  return (
    <ModalRoot>
      <ModalHeader title={`목표 습관 ${submitText}`} confirmText={submitText} onConfirm={onSubmit} />
      <ModalBody withScrollFade className="flex w-full flex-col items-stretch">
        <div className="flex w-full flex-col gap-6 px-[4dvw] py-9 min-[480px]:max-[1023px]:px-6 min-[480px]:max-[1023px]:py-6 min-[1024px]:px-6 min-[1024px]:py-9">
          <section className="flex w-full flex-col gap-3">
            <SectionTitle><SectionTitleIcon><MdCheckBox /></SectionTitleIcon>습관 이름</SectionTitle>
            <HabitInputCard>
              <HabitName habitName={habitName} setHabitName={setHabitName} />
            </HabitInputCard>
          </section>
          <section className="flex w-full flex-col gap-3">
            <SectionTitle><SectionTitleIcon><MdOutlineStar /></SectionTitleIcon>우선순위</SectionTitle>
            <HabitInputCard>
              <HabitRating priority={priority} setPriority={setPriority} />
            </HabitInputCard>
          </section>
          <span className="flex items-center justify-center text-sm text-grey-title opacity-80">*최대 생성 가능 개수 : 18개, 이름 길이 제한 : 1~10</span>
        </div>
      </ModalBody>
    </ModalRoot>
  );
};

export default HabitInputView;
