'use client';
import { getDiaryById } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { EMOTIONS } from "@/common/constants/emotions";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Carousel from "../../ui/Carousel";
import { Modal } from "../../ui/Modal";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";

import { TextSlide } from "./TextSlide";
import { ZoomViewImage } from "./types";

interface ZoomViewProps {
  diaryId: string;
}

const ZoomView = ({ diaryId }: ZoomViewProps) => {
  const router = useRouter();
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => authAction(() => getDiaryById({ id: diaryId })),
    enabled: diaryId !== null
  });

  const date = diaryData?.date;  // yyyy-MM-dd
  const dateForDisplay = date ? parseLocalDate(date) : null;
  const formattedDate = dateForDisplay ? format(dateForDisplay, 'yyyy년 M월 d일') : '';
  const formattedDay = dateForDisplay ? format(dateForDisplay, 'eeee', { locale: ko }) : '';
  const headerTitle = date ? `${formattedDate} ${formattedDay}` : '';
  const images = diaryData?.Images;
  const hasImages = (images?.length ?? 0) > 0;

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  if (!diaryData) return null;

  const emotion = EMOTIONS[diaryData.emotion];
  const imageSlides = images?.map((image: ZoomViewImage) => (
    <Image
      key={image.id}
      onClick={zoomToggle}
      className={zoomState === 'zoom' ? "h-full w-full cursor-pointer object-cover" : "h-full w-full cursor-pointer object-contain"}
      src={image.src}
      alt="zoomImage"
      width={400}
      height={400}
      placeholder="blur"
      blurDataURL={image.src}
    />
  ));

  return <Modal
    ariaLabel={headerTitle}
    isOpen
    onClose={() => router.back()}
    overlayClassName="z-[99999]"
    variant={{ base: 'full', tablet: 'center-base', desktop: 'center-zoom' }}
  >
    <div className="flex min-h-0 flex-1 flex-col desktop:hidden">
      <ModalHeader title={headerTitle} onBack={() => router.back()} />
      <ModalBody contentMode="fill">
        <Carousel>
          <TextSlide diaryData={diaryData} />
          {imageSlides}
        </Carousel>
      </ModalBody>
    </div>
    <div className="hidden h-full min-h-0 w-full desktop:flex">
      <aside className="flex h-full w-[450px] shrink-0 flex-col bg-white border-r border-theme-border-muted">
        <ModalHeader title={headerTitle} onBack={() => router.back()} />
        <div className="min-h-0 flex-1">
          <TextSlide diaryData={diaryData} showEmotion={hasImages} />
        </div>
      </aside>
      <section className="h-full min-w-0 flex-1 overflow-hidden">
        <Carousel>
          {hasImages ? imageSlides : (
            <Image
              className="h-80 w-80 object-contain"
              src={emotion?.src}
              alt={emotion?.nameKr || '감정'}
              width={160}
              height={160}
            />
          )}
        </Carousel>
      </section>
    </div>
  </Modal>;
}

export default ZoomView;
