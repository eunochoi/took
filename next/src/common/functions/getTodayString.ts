import { format } from "date-fns";

// 오늘 날짜를 yyyy-MM-dd 형식 문자열로 반환
export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}