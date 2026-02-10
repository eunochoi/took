'use client';

import type { DiaryData } from '@/common/types/diary';
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Carousel from "../Carousel";
import DiaryHabits from "./DiaryHabits";
import DiaryHeader from "./DiaryHeader";

interface Props {
  diaryData: DiaryData;
}

// 리스트 큰 카드
const LargeDiary = ({ diaryData }: Props) => {
  const router = useRouter();
  const { Images: images } = diaryData;
  const hasImages = images.length >= 1;

  const handleContentClick = () => {
    router.push(`/inter/zoom?id=${diaryData.id}`, { scroll: false });
  };

  return (
    <Wrapper>
      <DiaryHeader diaryData={diaryData} type="large" />
      <Content onClick={handleContentClick}>
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

export default LargeDiary;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 16px;
  margin: 16px 0;
`
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
`
const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
  
  @media (min-width: 1024px) {
    height: 400px;
  }
`

const CarouselImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-shrink: 0;

  width: 100%;
  height: auto;
  min-height: 250px;
  overflow: hidden;

  box-sizing: border-box;

  border-radius: 20px;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);

  @media (max-width: 479px) {
    min-height: 200px;
  }
  @media (min-width:1024px) {
    min-height: 300px;
  }
`
