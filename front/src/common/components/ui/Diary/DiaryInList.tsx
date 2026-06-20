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

// 리스트 큰 카드
const DiaryInList = ({ diaryData }: Props) => {
  const { Images: images } = diaryData;
  const hasImages = images.length >= 1;
  const { navigateToZoom } = useDiaryNavigation(diaryData.id);

  return (
    <Wrapper>
      <DiaryDateHeader diaryData={diaryData} />
      <Content onClick={navigateToZoom}>
        {hasImages && (
          <CarouselContainer>
            <Carousel>
              {images.map((img) => (
                <CarouselImage
                  key={img.id}
                  src={img.src}
                  width={400}
                  height={400}
                  alt="diary image"
                />
              ))}
            </Carousel>
          </CarouselContainer>
        )}
        <Text className={hasImages ? 'hasImages' : ''}>
          {diaryData.text}
        </Text>
      </Content>
      <DiaryHabits habits={diaryData.Habits} />
    </Wrapper>
  );
};

export default DiaryInList;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 16px;
  margin: 16px 0;
`;

const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  flex-shrink: 0;
  overflow: hidden;

  padding: 0 16px;
  
  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  line-height: 1.8;
  color: rgb(var(--greyTitle));

  &.hasImages{
    -webkit-line-clamp: 4;
  }
  @media (max-width: 479px) {
    -webkit-line-clamp: 3;
    &.hasImages{
      -webkit-line-clamp: 3;
    }
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
  
  @media (min-width: 1024px) {
    height: 400px;
  }
`;

const CarouselImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Wrapper = styled(DiaryCardShell).attrs<{ $type?: 'large' }>({ $type: 'large' })``;
