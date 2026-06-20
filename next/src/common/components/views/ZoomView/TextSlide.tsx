'use client';

import { diaryData } from "@/app/(routes)/(app)/list/_types/diaryData";
import Image from "next/image";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";

interface TextSlideProps {
  diaryData: diaryData;
}

export const TextSlide = ({ diaryData }: TextSlideProps) => {
  const text = diaryData?.text;
  const emotion = EMOTIONS[diaryData?.emotion];

  return (<Wrapper className="slideChild">
    <EmotionImageWrapper>
      <Image
        width={64}
        height={64}
        src={emotion?.src}
        alt={emotion?.nameKr || '감정'} />
    </EmotionImageWrapper>
    {diaryData?.Habits.length > 0 &&
      <HabitWrapper>
        {diaryData?.Habits?.map((e: { name: string }) => <span key={e.name}>#{e.name}</span>)}
      </HabitWrapper>}
    <Text>{text}</Text>
  </Wrapper>);
}


const EmotionImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    img{
      width: 48px;
      height: 48px;
    }
  }
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 24px;
  gap: 32px;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 12px 4dvw;
    gap: 12px;
  }
`
const HabitWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  span{
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    font-size: ${(props) => props.theme.fontSize ?? '15pt'};
    flex-shrink: 0;
    margin-right: 8px;
    white-space: nowrap;
  }
`
const Text = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  line-height: 1.8;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  color: rgb(var(--greyTitle));
`