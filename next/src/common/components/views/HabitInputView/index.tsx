'use client';

import { authAction } from "@/common/auth/authAction";
import { createHabit, getHabitById, updateHabit } from "@/common/actions/habit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { MdCheckBox, MdOutlineStar } from "react-icons/md";
import { Modal } from "../../ui/Modal";
import { SectionTitle, SectionTitleIcon } from "../../ui/SectionTitle";
import { HabitInputCard } from "./HabitInputCard";
import { HabitName } from "./HabitName";
import { HabitRating } from "./HabitRating";

const gradientStyle = (direction: "top" | "bottom"): CSSProperties => ({
  background: `linear-gradient(
    to ${direction},
    var(--theme-bg, #f5f5fa) 0%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
    transparent 100%
  )`,
});

interface HabitInputProps {
  isEdit: boolean;
  habitId?: string;
}

const HabitInputView = ({ isEdit, habitId }: HabitInputProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const checkScroll = useCallback(() => {
    const scrollEl = scrollContentRef.current;
    if (!scrollEl) return;
    const hasScroll = scrollEl.scrollHeight > scrollEl.clientHeight;
    setIsScrollable(hasScroll);
    setScrolled(scrollEl.scrollTop > 0);
  }, []);

  useEffect(() => {
    const scrollEl = scrollContentRef.current;
    if (!scrollEl) return;
    checkScroll();
    scrollEl.addEventListener('scroll', checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(scrollEl);
    return () => {
      scrollEl.removeEventListener('scroll', checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

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
        setTimeout(() => enqueueSnackbar(successMessage, { variant: 'success' }), 300);
      } catch (error) {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    }
    else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.', { variant: 'info' });
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);

  return (
    <Modal>
      <Modal.Header headerTitleText={`목표 습관 ${submitText}`} headerConfirmText={submitText} onConfirm={onSubmit} />
      <Modal.Content ref={scrollContentRef} className="flex w-full flex-col items-stretch p-0">
        <div
          className={isScrollable && scrolled ? "pointer-events-none sticky inset-x-0 top-0 z-[90] h-12 shrink-0 opacity-100 transition-opacity duration-300 ease-in-out -mb-12" : "pointer-events-none sticky inset-x-0 top-0 z-[90] h-12 shrink-0 opacity-0 transition-opacity duration-300 ease-in-out -mb-12"}
          style={gradientStyle("bottom")}
        />
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
        <div
          className={isScrollable ? "pointer-events-none sticky inset-x-0 bottom-0 z-[90] mt-auto h-12 shrink-0 opacity-100 transition-opacity duration-300 ease-in-out" : "pointer-events-none sticky inset-x-0 bottom-0 z-[90] mt-auto h-12 shrink-0 opacity-0 transition-opacity duration-300 ease-in-out"}
          style={gradientStyle("top")}
        />
      </Modal.Content>
    </Modal>
  );
};

export default HabitInputView;
