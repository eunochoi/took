import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";

interface EmotionMessageParams {
  totalCount: number;
  selectedMonth: number;
  selectedMonthName: string;
  dominantEmotion: {
    index: number;
    name: string;
    count: number;
  } | null;
}

export const getEmotionMessage = ({
  totalCount,
  selectedMonth,
  selectedMonthName,
  dominantEmotion,
}: EmotionMessageParams): string => {
  if (totalCount === 0) {
    if (selectedMonth === MONTH_UNSELECTED) return '아직 기록된 감정이 없어요. 일기를 작성하며 감정을 기록해보세요.';
    return `${selectedMonthName}에는 아직 기록된 감정이 없어요.`;
  }
  if (!dominantEmotion) return '';

  const percentage = Math.round((dominantEmotion.count / totalCount) * 100);
  const period = selectedMonth === MONTH_UNSELECTED ? '' : `${selectedMonthName}에는 `;

  if (dominantEmotion.index <= 1) {
    return `${period}총 ${totalCount}개의 감정 기록 중 ${dominantEmotion.name} 감정이 ${dominantEmotion.count}개(${percentage}%)로 가장 많아요. 힘든 시간이 있었나요? 괜찮아질 거예요.`;
  }
  
  if (dominantEmotion.index === 2) {
    return `${period}총 ${totalCount}개의 감정 기록 중 ${dominantEmotion.name} 감정이 ${dominantEmotion.count}개(${percentage}%)로 가장 많아요. 평온한 일상을 보내고 있네요.`;
  }
  
  return `${period}총 ${totalCount}개의 감정 기록 중 ${dominantEmotion.name} 감정이 ${dominantEmotion.count}개(${percentage}%)로 가장 많아요! 행복한 시간을 많이 보내셨네요!`;
};
