import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  EMOTION_UNSELECTED,
  MONTH_UNSELECTED,
} from "@/common/constants/filterDefaults";

export const useDiaryListFilter = () => {
  const searchParams = useSearchParams();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(MONTH_UNSELECTED);
  const [emotionToggle, setEmotionToggle] = useState<number>(EMOTION_UNSELECTED);

  const queryParamsYear = searchParams.get('year');
  const queryParamsMonth = searchParams.get('month');
  const queryParamsEmotion = searchParams.get('emotion');

  useEffect(() => {
    if (queryParamsYear != null && /^\d{4}$/.test(queryParamsYear)) setSelectedYear(Number(queryParamsYear));
    else setSelectedYear(null);
    if (queryParamsYear != null && /^\d{4}$/.test(queryParamsYear) && queryParamsMonth != null && /^(?:[1-9]|1[0-2])$/.test(queryParamsMonth)) setSelectedMonth(Number(queryParamsMonth));
    else setSelectedMonth(MONTH_UNSELECTED);
    if (queryParamsEmotion != null && queryParamsEmotion !== '') setEmotionToggle(Number(queryParamsEmotion));
    else setEmotionToggle(EMOTION_UNSELECTED);
  }, [queryParamsYear, queryParamsMonth, queryParamsEmotion]);

  return {
    selectedYear,
    selectedMonth,
    emotionToggle,
    setSelectedYear,
    setSelectedMonth,
    setEmotionToggle,
  };
};
