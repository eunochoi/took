import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { LocalUserStorage } from "@/common/types";
import { useCallback } from "react";

type SORT = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';
const SORT_TYPE: SORT[] = ['DESC', 'ASC', 'PRIORITY', 'CUSTOM'];

export const useHabitToggle = () => {
  const { data: user } = useCurrentUser();
  const userStorageKey = user?.email;
  const { value: userStorage, setStoredValue: setUserStorage } = useLocalStorage<LocalUserStorage>(userStorageKey, {});
  const toggleValue = userStorage?.habitSortType ?? 'DESC'; //기본값 처리

  const onToggle = useCallback(() => {
    const currentIdx = SORT_TYPE.findIndex(e => e === toggleValue);
    const nextIdx = (currentIdx + 1) % SORT_TYPE.length;
    setUserStorage((prev) => ({ ...prev, habitSortType: SORT_TYPE[nextIdx] }));
  }, [setUserStorage, toggleValue]);

  return {
    toggleValue,
    onToggle
  };
}
