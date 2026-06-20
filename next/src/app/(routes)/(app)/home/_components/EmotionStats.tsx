'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";
import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { getEmotionMessage } from "../_messages/emotionMessages";

interface Props {
  emotionCounts: number[];
  monthlyEmotionCounts: number[][];
  isLoading: boolean;
}

const EMOTION_NAMES_KR = ['행복', '기쁨', '사랑', '평온', '놀람', '불안', '슬픔', '화남', '혼란', '?'];
const QUARTER_OPTIONS = ['전체', '1분기', '2분기', '3분기', '4분기'];

const QUARTER_MONTHS = [
  [],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

const EmotionStats = ({ emotionCounts, monthlyEmotionCounts, isLoading }: Props) => {
  const [selectedQuarter, setSelectedQuarter] = useState<number>(0);

  const displayEmotionCounts = useMemo(() => {
    if (selectedQuarter === 0) {
      // 전체 탭: emotionCounts를 10개로 확장 (부족한 부분은 0으로 채움)
      const expandedCounts = [...emotionCounts];
      while (expandedCounts.length < 10) {
        expandedCounts.push(0);
      }
      return expandedCounts.slice(0, 10);
    }
    const quarterMonths = QUARTER_MONTHS[selectedQuarter];
    const quarterCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    quarterMonths.forEach(monthIndex => {
      const monthCounts = monthlyEmotionCounts[monthIndex] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      monthCounts.forEach((count, emotionIndex) => {
        quarterCounts[emotionIndex] += count;
      });
    });

    return quarterCounts;
  }, [selectedQuarter, emotionCounts, monthlyEmotionCounts]);

  const totalCount = useMemo(() =>
    displayEmotionCounts.reduce((sum, count) => sum + count, 0)
    , [displayEmotionCounts]);

  const dominantEmotion = useMemo(() => {
    if (totalCount === 0) return null;
    const maxIndex = displayEmotionCounts.indexOf(Math.max(...displayEmotionCounts));
    return { index: maxIndex, name: EMOTION_NAMES_KR[maxIndex], count: displayEmotionCounts[maxIndex] };
  }, [displayEmotionCounts, totalCount]);

  const getMessage = () => {
    return getEmotionMessage({
      totalCount,
      selectedMonth: selectedQuarter === 0 ? MONTH_UNSELECTED : selectedQuarter,
      selectedMonthName: QUARTER_OPTIONS[selectedQuarter],
      dominantEmotion,
    });
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <SectionTitle>감정 정보</SectionTitle>
        <TotalCount>{totalCount}개의 감정 기록</TotalCount>
      </TitleWrapper>

      <TabWrapper>
        {QUARTER_OPTIONS.map((quarter, index) => (
          <Tab
            key={index}
            $active={selectedQuarter === index}
            onClick={() => setSelectedQuarter(index)}>
            {quarter}
          </Tab>
        ))}
      </TabWrapper>

      <EmotionCard>
        <EmotionList>
          {EMOTIONS.slice(0, 5).map((emotion, index) => (
            <EmotionItem key={emotion.id}>
              <EmotionImage
                src={emotion.src}
                alt={emotion.nameKr}
                width={77}
                height={77}
              />
              <EmotionCount>{displayEmotionCounts[index]}</EmotionCount>
            </EmotionItem>
          ))}
        </EmotionList>
        <EmotionList>
          {EMOTIONS.slice(5, 10).map((emotion, index) => (
            <EmotionItem key={emotion.id}>
              <EmotionImage
                src={emotion.src}
                alt={emotion.nameKr}
                width={77}
                height={77}
              />
              <EmotionCount>{displayEmotionCounts[index + 5]}</EmotionCount>
            </EmotionItem>
          ))}
        </EmotionList>
      </EmotionCard>

      <EmotionMessageCard>
        <EmotionMessageContent>
          <span>{getMessage()}</span>
        </EmotionMessageContent>
        {totalCount > 0 && totalCount < 10 && (
          <LowDataWarning>
            * 기록이 적어서 정확한 분석이 어려울 수 있어요.
          </LowDataWarning>
        )}
      </EmotionMessageCard>
    </Wrapper>
  );
};

export default EmotionStats;

const Wrapper = styled.section`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  flex: 1;
  
  @media (min-width: 1025px) {
    font-size: 36px;
  }
`;

const TotalCount = styled.span`
  font-size: 16px;
  color: rgba(var(--greyTitle), 0.6);
  white-space: nowrap;
  flex-shrink: 0;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Tab = styled.button<{ $active: boolean }>`
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active }) => ($active ? 'rgb(var(--greyTitle))' : 'rgba(var(--greyTitle), 0.5)')};
  padding-bottom: 4px;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme.themeColor ?? '#979FC7') : 'transparent'};
`;

const EmotionCard = styled.div`
  padding: 20px 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 480px) {
    padding: 24px 20px;
  }
`;

const EmotionList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const EmotionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const EmotionImage = styled(Image)`
  width: 56px;
  height: 56px;
  
  @media (min-width: 480px) {
    width: 64px;
    height: 64px;
  }
`;

const EmotionCount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
  
  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

const DominantEmotionImage = styled(Image)`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  
  @media (min-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

const EmotionMessageCard = styled.div`
  padding: 20px 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (min-width: 480px) {
    padding: 24px 20px;
  }
`;

const EmotionMessageContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  span {
    font-size: 16px;
    color: rgb(var(--greyTitle));
    line-height: 1.5;
    overflow-wrap: break-word;
    text-align: justify;
    flex: 1;
  }
`;

const LowDataWarning = styled.p`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.5);
  line-height: 1.4;
  margin: 0;
  padding-top: 8px;
  
  @media (min-width: 480px) {
    font-size: 16px;
  }
`;
