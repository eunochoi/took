'use client';
import { getDiaryById } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Carousel from "../../ui/Carousel";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";
import { ModalRoot } from "../../ui/Modal/ModalRoot";

import { TextSlide } from "./TextSlide";
import { ZoomViewImage } from "./types";

interface ZoomViewProps {
  diaryId: string;
}

const ZoomView = ({ diaryId }: ZoomViewProps) => {
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

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  if (!diaryData) return null;

  return <ModalRoot>
    <ModalHeader title={headerTitle} />
    <ModalBody>
      <div className="h-full w-full">
        <Carousel objectFit="contain">
          <TextSlide diaryData={diaryData} />
          {images?.map((e: ZoomViewImage) => (
            <Image
              key={e.id}
              onClick={zoomToggle}
              className={zoomState === 'zoom' ? "cursor-pointer !object-cover" : "cursor-pointer"}
              src={e.src}
              alt="zoomImage"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={e.src}
            />
          ))}
        </Carousel>
      </div>
    </ModalBody>
  </ModalRoot>;
}

export default ZoomView;
