import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  EMOTION_UNSELECTED,
  MONTH_UNSELECTED,
} from "@/common/constants/filterDefaults";

export const useDiaryListFilter = () => {
  const searchParams = useSearchParams();
  const queryParamsYear = searchParams.get('year');
  const queryParamsMonth = searchParams.get('month');
  const queryParamsEmotion = searchParams.get('emotion');
  const parsedYear = queryParamsYear != null && /^\d{4}$/.test(queryParamsYear) ? Number(queryParamsYear) : null;
  const parsedMonth = parsedYear !== null && queryParamsMonth != null && /^(?:[1-9]|1[0-2])$/.test(queryParamsMonth)
    ? Number(queryParamsMonth) : MONTH_UNSELECTED;
  const parsedEmotion = queryParamsEmotion != null && queryParamsEmotion !== ''
    ? Number(queryParamsEmotion) : EMOTION_UNSELECTED;

  const [selectedYear, setSelectedYear] = useState<number | null>(parsedYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(parsedMonth);
  const [emotionToggle, setEmotionToggle] = useState<number>(parsedEmotion);

  useEffect(() => {
    setSelectedYear(parsedYear);
    setSelectedMonth(parsedMonth);
    setEmotionToggle(parsedEmotion);
  }, [parsedYear, parsedMonth, parsedEmotion]);

  return {
    selectedYear,
    selectedMonth,
    emotionToggle,
    setSelectedYear,
    setSelectedMonth,
    setEmotionToggle,
  };
};
