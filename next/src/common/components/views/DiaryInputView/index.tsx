"use client";

import { authAction } from "@/common/auth/authAction";
import { getDiaryById, type DiaryData } from "@/common/actions/diary";
import { uploadImages } from "@/common/actions/image";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { notFound, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineEditNote, MdOutlineEmojiEmotions, MdOutlineImage } from "react-icons/md";
import styled from "styled-components";
import { EmotionSelector } from "../../ui/EmotionSelector";
import { Modal } from "../../ui/Modal";
import { SectionTitle, SectionTitleIcon } from "../../ui/SectionTitle";
import { DiaryInputCard } from "./DiaryInputCard";
import DiaryInputImages from "./DiaryInputImages";
import DiaryInputTextArea from "./DiaryInputTextarea";
import useSubmitDiary from './hooks/useSubmitDiary';

interface DiaryInputProps {
  isEdit: boolean;
  diaryId?: string | null;
}

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const DiaryInputView = ({ isEdit, diaryId }: DiaryInputProps) => {

  const { addDiary, editDiary } = useSubmitDiary();
  const submitAction = isEdit ? editDiary : addDiary;
  const submitText = isEdit ? '수정' : '추가';

  const param = useSearchParams();


  const contentsRef = useRef<HTMLElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
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

  const { data: diaryData, isError } = useQuery<DiaryData | null>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => authAction(() => getDiaryById({ id: diaryId })),
    enabled: diaryId !== null && isEdit === true
  });

  const dateFromParam = param.get('date');
  const date: string = diaryData?.date ?? (dateFromParam || format(new Date(), 'yyyy-MM-dd'));

  const dateForDisplay = parseLocalDate(date);
  const headerTitle = format(dateForDisplay, 'yyyy.M.dd (eee)');

  const [text, setText] = useState<string>(diaryData?.text ?? "");
  const [images, setImages] = useState<Array<string | File>>(diaryData?.Images?.map((e) => e.src) ?? []);
  const [emotion, setEmotion] = useState<number>(diaryData?.emotion ?? 10);

  useEffect(() => {
    if (diaryData) {
      setText(diaryData.text ?? "");
      setImages(diaryData.Images?.map((e) => e.src) ?? []);
      setEmotion(diaryData.emotion ?? 10);
    }
  }, [diaryData]);

  const onSubmit = async () => {
    if (emotion < 0 || emotion > 9) {
      enqueueSnackbar('감정을 선택해주세요', { variant: 'info' });
      return;
    }
    if (text.length === 0) {
      enqueueSnackbar('내용을 입력해주세요', { variant: 'error' });
      return;
    }

    try {
      // File / URL 나눠서
      const fileImages = images.filter((img): img is File => img instanceof File);
      const stringImages = images.filter((img): img is string => typeof img === 'string');

      let uploadedImageUrls: string[] = [];

      // 새 파일만 업로드
      if (fileImages.length > 0) {
        const imageFormData = new FormData();
        fileImages.forEach(file => {
          imageFormData.append("image", file);
        });

        uploadedImageUrls = await authAction(() => uploadImages(imageFormData));
      }

      // 기존 URL + 업로드된 URL 합침
      const finalImages = [...stringImages, ...uploadedImageUrls];

      if (isEdit && diaryId) {
        submitAction.mutate({ text, images: finalImages, diaryId, emotion });
      } else {
        submitAction.mutate({ date, text, images: finalImages, emotion });
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      enqueueSnackbar('이미지 업로드 중 오류가 발생했습니다.', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError])


  return (
    <Modal>
      <Modal.Header headerTitleText={headerTitle} headerConfirmText={submitText} onConfirm={onSubmit} />
      <DiaryInputContent ref={scrollContentRef}>
        <TopGradient className={isScrollable && scrolled ? 'visible' : ''} />
        <ContentWithPadding>
          <Section>
            <SectionTitle><SectionTitleIcon><MdOutlineEmojiEmotions /></SectionTitleIcon>하루의 감정</SectionTitle>
            <DiaryInputCard>
              <EmotionRadioSelectors>
                <EmotionSelector value={emotion} onChange={setEmotion} />
              </EmotionRadioSelectors>
            </DiaryInputCard>
          </Section>
          <Section>
            <SectionTitle><SectionTitleIcon><MdOutlineEditNote /></SectionTitleIcon>하루의 기록</SectionTitle>
            <DiaryInputCard>
              <DiaryInputTextarea>
                <DiaryInputTextArea text={text} setText={setText} contentsRef={contentsRef} />
              </DiaryInputTextarea>
            </DiaryInputCard>
          </Section>
          <Section>
            <SectionTitle><SectionTitleIcon><MdOutlineImage /></SectionTitleIcon>사진</SectionTitle>
            <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={submitAction.isPending} />
          </Section>
        </ContentWithPadding>
        <BottomGradient className={isScrollable ? 'visible' : ''} />
      </DiaryInputContent>
    </Modal>
  );
}

export default DiaryInputView;

const DiaryInputContent = styled(Modal.Content)`
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

const EmotionRadioSelectors = styled.div`
  width: 100%;
  height: 100%;
`;
const DiaryInputTextarea = styled.div`
  width: 100%;
  height: 220px;
`;
