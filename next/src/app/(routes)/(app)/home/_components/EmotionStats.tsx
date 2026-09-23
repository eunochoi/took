'use client';

import Image from "next/image";
import { useMemo, useState } from "react";

import { AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection/section";
import AppUnderlineTabs from "@/common/components/ui/AppUnderlineTabs";
import { EMOTIONS } from "@/common/constants/emotions";

interface Props {
  emotionCounts: number[];
  halfYearEmotionCounts: number[][];
}

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

  const firstPlaceEmotionIds = useMemo(() => {
    const maxCount = Math.max(...displayEmotionCounts);
    if (maxCount === 0) return [];

    return displayEmotionCounts
      .map((count, emotionId) => count === maxCount ? emotionId : -1)
      .filter((emotionId) => emotionId !== -1);
  }, [displayEmotionCounts]);

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

      <AppSurfaceCard>
        <div className="grid grid-cols-[repeat(5,max-content)] justify-between gap-y-7 my-2">
          {EMOTIONS.map((emotion) => (
            <div key={emotion.id} className="flex flex-col min-w-0 justify-center items-center gap-1">
              <span className="relative">
                <Image
                  className="h-12 w-12 shrink-0 object-contain"
                  src={emotion.src}
                  alt={emotion.nameKr}
                  width={56}
                  height={56}
                />
                {firstPlaceEmotionIds.includes(emotion.id) && (
                  <span className="absolute -right-3 -top-2 flex h-6 min-w-7 items-center justify-center rounded-[50%_45%_55%_50%/60%_50%_50%_55%] bg-theme-accent px-1 text-xs font-semibold text-theme-text-on-accent">
                    1등
                  </span>
                )}
              </span>
              <div className="flex items-center shrink-0 items-baseline gap-1 font-title tabular-nums">
                <span className="text-lg font-semibold text-theme-accent">{displayEmotionCounts[emotion.id]}</span>
                <span className="text-base text-theme-text-tertiary">회</span>
              </div>
              <span className="min-w-0 flex-1 text-sm whitespace-nowrap text-theme-text-primary">
                {emotion.nameKr}
              </span>
            </div>
          ))}
        </div>
      </AppSurfaceCard>
    </AppSection>
  );
};

export default EmotionStats;
