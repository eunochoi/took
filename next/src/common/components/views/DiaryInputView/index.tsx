"use client";

import { createDiary, getDiaryById, updateDiary, type DiaryData } from "@/common/actions/diary";
import { uploadImages } from "@/common/actions/image";
import { authAction } from "@/common/auth/authAction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { MdOutlineEditNote, MdOutlineEmojiEmotions, MdOutlineImage } from "react-icons/md";
import { EmotionSelector } from "../../ui/EmotionSelector";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";
import { ModalRoot } from "../../ui/Modal/ModalRoot";
import { SectionTitle, SectionTitleIcon } from "../../ui/SectionTitle";
import { DiaryInputCard } from "./DiaryInputCard";
import DiaryInputImages from "./DiaryInputImages";
import DiaryInputTextArea from "./DiaryInputTextarea";

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
      enqueueSnackbar('감정을 선택해주세요');
      return;
    }
    if (text.length === 0) {
      enqueueSnackbar('내용을 입력해주세요');
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
        enqueueSnackbar(isEdit ? '일기 수정 완료' : '일기 작성 완료');
      }, 300);
    } catch (error) {
      console.error('일기 저장 실패:', error);
      enqueueSnackbar(isEdit ? '일기 수정 실패' : '일기 작성 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);


  return (
    <ModalRoot>
      <ModalHeader title={headerTitle} confirmText={submitText} onConfirm={onSubmit} />
      <ModalBody withScrollFade className="flex w-full flex-col items-stretch">
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
      </ModalBody>
    </ModalRoot>
  );
}

export default DiaryInputView;
