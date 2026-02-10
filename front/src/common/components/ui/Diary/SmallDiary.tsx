'use client';

import type { DiaryData } from '@/common/types/diary';
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Carousel from "../Carousel";
import DiaryAddButton from "./DiaryAddButton";
import DiaryHabits from "./DiaryHabits";
import DiaryHeader from "./DiaryHeader";

interface Props {
  diaryData: DiaryData;
}

// 캘린더 작은 카드
const SmallDiary = ({ diaryData }: Props) => {
  const router = useRouter();
  const dateString = diaryData.date;  // yyyy-MM-dd

  const hasText = diaryData.visible;
  const images = diaryData.Images ?? [];

  const handleNavigateToZoom = () => {
    if (diaryData.id) {
      router.push(`/inter/zoom?id=${diaryData.id}`, { scroll: false });
    }
  };

  // 있음
  if (hasText) {
    return (
      <Wrapper>
        <Carousel resetOnChange showIndicator={false}>
          <FirstSlide>
            <DiaryHeader diaryData={diaryData} type="small" />
            <TextWrapper onClick={handleNavigateToZoom}>
              <Text>{diaryData.text}</Text>
              {images.length > 0 && (
                <MoreImagesText>{images.length} images ➝</MoreImagesText>
              )}
            </TextWrapper>
            <DiaryHabits habits={diaryData.Habits} />
          </FirstSlide>
          {images.map((img) => (
            <SlideImage
              onClick={handleNavigateToZoom}
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
  }

  // 없음
  return (
    <Wrapper>
      <EmptySlide>
        <DiaryHeader diaryData={diaryData} type="small" />
        <DiaryAddButton date={dateString} />
        <DiaryHabits habits={diaryData.Habits} />
      </EmptySlide>
    </Wrapper>
  );
};

export default SmallDiary;

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  
  @media (min-width:1025px) {
    height: 230px;
  }

  border-radius: 20px;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
`

const FirstSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  flex-shrink: 0;
`

const EmptySlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  padding-right: 14px;
`

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
`

const MoreImagesText = styled.button`
  align-self: flex-end;
  text-align: right;
  font-size: 16px;
  color: ${(props) => props.theme.themeColor ?? '#979FC7'};
`

const SlideImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`
