import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  EMOTION_UNSELECTED,
  getDefaultYear,
  MONTH_UNSELECTED,
} from "@/common/constants/filterDefaults";

export const useFilter = () => {
  const searchParams = useSearchParams();

  const [selectedYear, setSelectedYear] = useState<number>(getDefaultYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(MONTH_UNSELECTED);
  const [emotionToggle, setEmotionToggle] = useState<number>(EMOTION_UNSELECTED);

  const queryParamsYear = searchParams.get('year');
  const queryParamsMonth = searchParams.get('month');
  const queryParamsEmotion = searchParams.get('emotion');

  useEffect(() => {
    if (queryParamsYear != null && queryParamsYear !== '') setSelectedYear(Number(queryParamsYear));
    else setSelectedYear(getDefaultYear());
    if (queryParamsMonth != null && queryParamsMonth !== '') setSelectedMonth(Number(queryParamsMonth));
    else setSelectedMonth(MONTH_UNSELECTED);
    if (queryParamsEmotion != null && queryParamsEmotion !== '') setEmotionToggle(Number(queryParamsEmotion));
    else setEmotionToggle(EMOTION_UNSELECTED);
  }, [queryParamsYear, queryParamsMonth, queryParamsEmotion])


  return { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle };
}