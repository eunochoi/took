'use client';

import { cn } from "@/common/utils/cn";
import Image from "next/image";
import { useMemo, useState } from "react";

import { AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import { AppInfoCard, AppInfoContent, AppInfoText } from "@/common/components/ui/AppSection/info";
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection/section";
import AppUnderlineTabs from "@/common/components/ui/AppUnderlineTabs";
import { EMOTIONS } from "@/common/constants/emotions";
import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { getEmotionMessage } from "../_messages/emotionMessages";

interface Props {
  emotionCounts: number[];
  monthlyEmotionCounts: number[][];
}

const EMOTION_NAMES_KR = ['행복', '기쁨', '사랑', '평온', '놀람', '불안', '슬픔', '화남', '혼란', '?'];
const QUARTER_OPTIONS = ['전체', '1분기', '2분기', '3분기', '4분기'];
const QUARTER_TAB_OPTIONS = QUARTER_OPTIONS.map((label, value) => ({ label, value }));

const QUARTER_MONTHS = [
  [],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

const EmotionStats = ({ emotionCounts, monthlyEmotionCounts }: Props) => {
  const [selectedQuarter, setSelectedQuarter] = useState<number>(0);

  const displayEmotionCounts = useMemo(() => {
    if (selectedQuarter === 0) {
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

  const renderEmotionRow = (startIndex: number) => (
    <div className={cn("flex justify-between gap-2", startIndex > 0 && "mt-4")}>
      {EMOTIONS.slice(startIndex, startIndex + 5).map((emotion, index) => (
        <div key={emotion.id} className="flex flex-1 flex-col items-center gap-2.5">
          <Image
            className="h-11 w-11"
            src={emotion.src}
            alt={emotion.nameKr}
            width={77}
            height={77}
          />
          <span className="text-sm font-semibold text-grey-title">{displayEmotionCounts[index + startIndex]}</span>
        </div>
      ))}
    </div>
  );

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>감정 정보</AppSectionTitle>
        <AppSectionMeta>전체 {totalCount}개의 감정 기록</AppSectionMeta>
      </AppSectionHeader>

      <AppUnderlineTabs
        options={QUARTER_TAB_OPTIONS}
        value={selectedQuarter}
        onChange={setSelectedQuarter}
      />

      <AppSurfaceCard className="px-4 py-5">
        {renderEmotionRow(0)}
        {renderEmotionRow(5)}
      </AppSurfaceCard>

      <AppInfoCard>
        <AppInfoContent>
          <span>{getMessage()}</span>
        </AppInfoContent>
        {totalCount > 0 && totalCount < 10 && (
          <AppInfoText>
            * 기록이 적어서 정확한 분석이 어려울 수 있어요.
          </AppInfoText>
        )}
      </AppInfoCard>
    </AppSection>
  );
};

export default EmotionStats;
