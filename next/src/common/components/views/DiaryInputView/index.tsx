"use client";

import { authAction } from "@/common/auth/authAction";
import { createDiary, getDiaryById, updateDiary, type DiaryData } from "@/common/actions/diary";
import { uploadImages } from "@/common/actions/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineEditNote, MdOutlineEmojiEmotions, MdOutlineImage } from "react-icons/md";
import { EmotionSelector } from "../../ui/EmotionSelector";
import { Modal } from "../../ui/Modal";
import { SectionTitle, SectionTitleIcon } from "../../ui/SectionTitle";
import { DiaryInputCard } from "./DiaryInputCard";
import DiaryInputImages from "./DiaryInputImages";
import DiaryInputTextArea from "./DiaryInputTextarea";

const gradientStyle = (direction: "top" | "bottom"): CSSProperties => ({
  background: `linear-gradient(
    to ${direction},
    var(--theme-bg, #f5f5fa) 0%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
    transparent 100%
  )`,
});

interface DiaryInputProps {
  isEdit: boolean;
  diaryId?: string | null;
}

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const DiaryInputView = ({ isEdit, diaryId }: DiaryInputProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (diaryData) {
      setText(diaryData.text ?? "");
      setImages(diaryData.Images?.map((e) => e.src) ?? []);
      setEmotion(diaryData.emotion ?? 10);
    }
  }, [diaryData]);

  const onSubmit = async () => {
    if (isSubmitting) return;

    if (emotion < 0 || emotion > 9) {
      enqueueSnackbar('감정을 선택해주세요', { variant: 'info' });
      return;
    }
    if (text.length === 0) {
      enqueueSnackbar('내용을 입력해주세요', { variant: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);

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

      const diaryData = isEdit && diaryId
        ? await authAction(() => updateDiary({ text, images: finalImages, diaryId, emotion }))
        : await authAction(() => createDiary({ date, text, images: finalImages, emotion }));

      queryClient.setQueryData(['diary', 'date', diaryData.date], diaryData);
      queryClient.setQueryData(['diary', 'id', String(diaryData.id)], diaryData);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['diary', 'month'] }),
        queryClient.invalidateQueries({ queryKey: ['diary', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['stats'] }),
      ]);

      router.back();
      setTimeout(() => {
        enqueueSnackbar(isEdit ? '일기 수정 완료' : '일기 작성 완료', { variant: 'success' });
      }, 300);
    } catch (error) {
      console.error('일기 저장 실패:', error);
      enqueueSnackbar(isEdit ? '일기 수정 실패' : '일기 작성 실패', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);


  return (
    <Modal>
      <Modal.Header headerTitleText={headerTitle} headerConfirmText={submitText} onConfirm={onSubmit} />
      <Modal.Content ref={scrollContentRef} className="flex w-full flex-col items-stretch p-0">
        <div
          className={isScrollable && scrolled ? "pointer-events-none sticky inset-x-0 top-0 z-[90] h-12 shrink-0 opacity-100 transition-opacity duration-300 ease-in-out -mb-12" : "pointer-events-none sticky inset-x-0 top-0 z-[90] h-12 shrink-0 opacity-0 transition-opacity duration-300 ease-in-out -mb-12"}
          style={gradientStyle("bottom")}
        />
        <div className="flex w-full flex-col gap-6 px-[4dvw] py-9 min-[480px]:max-[1023px]:px-6 min-[480px]:max-[1023px]:py-6 min-[1024px]:px-6 min-[1024px]:py-9">
          <section className="flex w-full flex-col gap-3">
            <SectionTitle><SectionTitleIcon><MdOutlineEmojiEmotions /></SectionTitleIcon>하루의 감정</SectionTitle>
            <DiaryInputCard>
              <div className="h-full w-full">
                <EmotionSelector value={emotion} onChange={setEmotion} />
              </div>
            </DiaryInputCard>
          </section>
          <section className="flex w-full flex-col gap-3">
            <SectionTitle><SectionTitleIcon><MdOutlineEditNote /></SectionTitleIcon>하루의 기록</SectionTitle>
            <DiaryInputCard>
              <div className="h-[220px] w-full">
                <DiaryInputTextArea text={text} setText={setText} contentsRef={contentsRef} />
              </div>
            </DiaryInputCard>
          </section>
          <section className="flex w-full flex-col gap-3">
            <SectionTitle><SectionTitleIcon><MdOutlineImage /></SectionTitleIcon>사진</SectionTitle>
            <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={isSubmitting} />
          </section>
        </div>
        <div
          className={isScrollable ? "pointer-events-none sticky inset-x-0 bottom-0 z-[90] mt-auto h-12 shrink-0 opacity-100 transition-opacity duration-300 ease-in-out" : "pointer-events-none sticky inset-x-0 bottom-0 z-[90] mt-auto h-12 shrink-0 opacity-0 transition-opacity duration-300 ease-in-out"}
          style={gradientStyle("top")}
        />
      </Modal.Content>
    </Modal>
  );
}

export default DiaryInputView;
