import { getYear } from "date-fns";

import { EMOTIONS } from "@/common/constants/emotions";

// 감정 필터 "전체" = 이 값 (개수랑 같음)
export const EMOTION_TOTAL_COUNT = EMOTIONS.length;
export const EMOTION_UNSELECTED = EMOTIONS.length;

// 월 필터 "전체" = 0
export const MONTH_TOTAL_COUNT = 12;
export const MONTH_UNSELECTED = 0;

// 연도 기본값. URL에 year 없으면 이 값 씀
export const getDefaultYear = () => getYear(new Date());
