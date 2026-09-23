'use client';

import { cn } from "@/common/utils/cn";
import Image from "next/image";
import { useMemo, useState } from "react";

import { AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection/section";
import AppUnderlineTabs from "@/common/components/ui/AppUnderlineTabs";
import { EMOTIONS } from "@/common/constants/emotions";
import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { getEmotionMessage } from "../_messages/emotionMessages";

interface Props {
  emotionCounts: number[];
  halfYearEmotionCounts: number[][];
}

const EMOTION_NAMES_KR = ['행복', '기쁨', '사랑', '평온', '놀람', '불안', '슬픔', '화남', '혼란', '?'];
const HALF_YEAR_OPTIONS = ['전체', '전반기', '후반기'];
const HALF_YEAR_TAB_OPTIONS = HALF_YEAR_OPTIONS.map((label, value) => ({ label, value }));

const EmotionStats = ({ emotionCounts, halfYearEmotionCounts }: Props) => {
  const [selectedHalfYear, setSelectedHalfYear] = useState<number>(0);

  const displayEmotionCounts = useMemo(() => {
    if (selectedHalfYear === 0) {
      const expandedCounts = [...emotionCounts];
      while (expandedCounts.length < 10) {
        expandedCounts.push(0);
      }
      return expandedCounts.slice(0, 10);
    }
    return halfYearEmotionCounts[selectedHalfYear - 1] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }, [selectedHalfYear, emotionCounts, halfYearEmotionCounts]);

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
      selectedMonth: selectedHalfYear === 0 ? MONTH_UNSELECTED : selectedHalfYear,
      selectedMonthName: HALF_YEAR_OPTIONS[selectedHalfYear],
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
          <span className="text-sm font-semibold text-theme-text-primary">{displayEmotionCounts[index + startIndex]}</span>
        </div>
      ))}
    </div>
  );

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>감정 기록</AppSectionTitle>
        <AppSectionMeta>전체 {totalCount}개의 감정 기록</AppSectionMeta>
      </AppSectionHeader>

      <AppUnderlineTabs
        options={HALF_YEAR_TAB_OPTIONS}
        value={selectedHalfYear}
        onChange={setSelectedHalfYear}
      />

      <AppSurfaceCard className="px-4 py-5">
        {renderEmotionRow(0)}
        {renderEmotionRow(5)}
      </AppSurfaceCard>
    </AppSection>
  );
};

export default EmotionStats;
