import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { LocalUserStorage } from "@/common/types";
import { useCallback } from "react";

type SORT = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';
const SORT_TYPE: SORT[] = ['DESC', 'ASC', 'PRIORITY', 'CUSTOM'];

export const useHabitToggle = () => {
  const { data: user } = useCurrentUser();
  const currentUserEmail = user?.email ?? '';
  const { storedValue, setValue } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const toggleValue = storedValue?.habitSortType ?? 'DESC'; //기본값 처리

  const onToggle = useCallback(() => {
    const currentIdx = SORT_TYPE.findIndex(e => e === toggleValue);
    const nextIdx = (currentIdx + 1) % SORT_TYPE.length;
    setValue({ ...storedValue, habitSortType: SORT_TYPE[nextIdx] });
  }, [toggleValue]);

  return {
    toggleValue,
    onToggle
  };
}
