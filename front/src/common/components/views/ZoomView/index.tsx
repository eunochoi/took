'use client';
import { authAction } from "@/common/actions/authAction";
import { getDiaryById } from "@/common/actions/diary";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import styled from "styled-components";
import Carousel from "../../ui/Carousel";
import { Modal } from "../../ui/Modal";

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
  const formattedDate = date ? format(new Date(date), 'yyyy년 M월 d일') : '';
  const formattedDay = date ? format(new Date(date), 'eeee', { locale: ko }) : '';
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

  return <Modal>
    <Modal.Header headerTitleText={headerTitle} />
    <ZoomViewContent>
      <CarouselWrapper>
        <Carousel objectFit="contain">
          <TextSlide diaryData={diaryData} />
          {images?.map((e: ZoomViewImage) => (
            <InteractiveImage
              key={e.id}
              onClick={zoomToggle}
              className={zoomState}
              src={e.src}
              alt="zoomImage"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={e.src}
            />
          ))}
        </Carousel>
      </CarouselWrapper>
    </ZoomViewContent>
  </Modal>;
}

export default ZoomView;


const ZoomViewContent = styled(Modal.Content)`
  padding: 0 0 12px 0;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12px;
`;

const InteractiveImage = styled(Image)`
  cursor: pointer;
  /* SlideItem에서 object-fit 쓰니까 zoom일 때만 덮음 */
  
  &.zoom {
    object-fit: cover !important;
  }
`;
