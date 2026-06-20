'use client';

import { authAction } from "@/common/actions/authAction";
import { getHabitById } from "@/common/actions/habit";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdCheckBox, MdOutlineStar } from "react-icons/md";
import styled from "styled-components";
import { Modal } from "../../ui/Modal";
import { SectionTitle, SectionTitleIcon } from "../../ui/SectionTitle";
import { HabitInputCard } from "./HabitInputCard";
import { HabitName } from "./HabitName";
import { HabitRating } from "./HabitRating";
import useSubmitHabit from "./utils/useSubmitHabit";

interface HabitInputProps {
  isEdit: boolean;
  habitId?: string;
}

const HabitInputView = ({ isEdit, habitId }: HabitInputProps) => {
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

  const { addHabit, editHabit } = useSubmitHabit();
  const onMutation = isEdit ? editHabit : addHabit;
  const submitText = isEdit ? '수정' : '추가';

  const onSubmit = () => {
    if (habitName.length > 0 && habitName.length <= 10) {
      if (isEdit && habitId) onMutation.mutate({ habitId, habitName, priority });
      else onMutation.mutate({ habitName, priority });
    }
    else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.', { variant: 'info' });
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);

  return (
    <Modal>
      <Modal.Header headerTitleText={`목표 습관 ${submitText}`} headerConfirmText={submitText} onConfirm={onSubmit} />
      <HabitInputContent ref={scrollContentRef}>
        <TopGradient className={isScrollable && scrolled ? 'visible' : ''} />
        <ContentWithPadding>
          <Section>
            <SectionTitle><SectionTitleIcon><MdCheckBox /></SectionTitleIcon>습관 이름</SectionTitle>
            <HabitInputCard>
              <HabitName habitName={habitName} setHabitName={setHabitName} />
            </HabitInputCard>
          </Section>
          <Section>
            <SectionTitle><SectionTitleIcon><MdOutlineStar /></SectionTitleIcon>우선순위</SectionTitle>
            <HabitInputCard>
              <HabitRating priority={priority} setPriority={setPriority} />
            </HabitInputCard>
          </Section>
          <SubText>*최대 생성 가능 개수 : 18개, 이름 길이 제한 : 1~10</SubText>
        </ContentWithPadding>
        <BottomGradient className={isScrollable ? 'visible' : ''} />
      </HabitInputContent>
    </Modal>
  );
};

export default HabitInputView;

const HabitInputContent = styled(Modal.Content)`
  width: 100%;
  align-items: stretch;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const ContentWithPadding = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 36px 4dvw 36px;

  @media (min-width: 480px) and (max-width: 1023px) {
    padding: 24px 24px;
  }
  @media (min-width: 1024px) {
    padding: 36px 24px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const GRADIENT_HEIGHT = 48;

const TopGradient = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: ${GRADIENT_HEIGHT}px;
  margin-bottom: -${GRADIENT_HEIGHT}px;
  z-index: 90;
  pointer-events: none;
  flex-shrink: 0;
  background: linear-gradient(
    to bottom,
    var(--theme-bg, #f5f5fa) 0%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  &.visible {
    opacity: 1;
  }
`;

const BottomGradient = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: ${GRADIENT_HEIGHT}px;
  z-index: 90;
  pointer-events: none;
  flex-shrink: 0;
  margin-top: auto;
  background: linear-gradient(
    to top,
    var(--theme-bg, #f5f5fa) 0%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  &.visible {
    opacity: 1;
  }
`;

const SubText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--greyTitle));
  font-size: 14px;
  opacity: 0.8;
`;
