'use client';

import type { DiaryData } from '@/common/types/diary';
import Image from "next/image";
import styled from "styled-components";
import Carousel from "../Carousel";
import DiaryCardShell from "./DiaryCardShell";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryHabits from "./DiaryHabits";
import useDiaryNavigation from "./hooks/useDiaryNavigation";

interface Props {
  diaryData: DiaryData;
}

// 캘린더 작은 카드
const DiaryInCalendar = ({ diaryData }: Props) => {
  const images = diaryData.Images ?? [];
  const { navigateToZoom } = useDiaryNavigation(diaryData.id);

  return (
    <Wrapper>
      <Carousel resetOnChange showIndicator={false}>
        <FirstSlide>
          <DiaryDateHeader diaryData={diaryData} />
          <TextWrapper onClick={navigateToZoom}>
            <Text>{diaryData.text}</Text>
            {images.length > 0 && (
              <MoreImagesText>{images.length} images ➝</MoreImagesText>
            )}
          </TextWrapper>
          <DiaryHabits habits={diaryData.Habits} />
        </FirstSlide>
        {images.map((img) => (
          <SlideImage
            onClick={navigateToZoom}
            key={img.id}
            src={img.src}
            alt="diary image"
            width={300}
            height={300}
            blurDataURL={img.src}
            placeholder="blur"
          />
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default DiaryInCalendar;

const Wrapper = styled(DiaryCardShell).attrs<{ $type?: 'small' }>({ $type: 'small' })``;

const FirstSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  padding-right: 14px;
`;

const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @media (min-width:1025px) {
    -webkit-line-clamp: 4;
  }

  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  line-height: 1.35;
  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  color: rgb(var(--greyTitle));
`;

const MoreImagesText = styled.button`
  align-self: flex-end;
  text-align: right;
  font-size: 16px;
  color: ${(props) => props.theme.themeColor ?? '#979FC7'};
`;

const SlideImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;
