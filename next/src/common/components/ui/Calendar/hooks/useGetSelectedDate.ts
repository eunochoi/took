import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

// 'yyyy-MM-dd' string을 로컬 Date로 변환
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export const useGetSelectedDate = () => {
  const params = useSearchParams();

  const selectedDate = useMemo(() => {
    const dateFromParams = params.get('date');

    if (!dateFromParams) {
      return new Date();
    }
    
    return parseLocalDate(dateFromParams);
  }, [params]);

  return { selectedDate };
}