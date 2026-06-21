import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { LocalUserStorage } from "@/common/types";
import { useCallback } from "react";

export const useCustomHabitOrder = () => {
  const { data: user } = useCurrentUser();
  const userStorageKey = user?.email;
  const { value: userStorage, setStoredValue: setUserStorage } = useLocalStorage<LocalUserStorage>(userStorageKey, {});
  const customOrder = userStorage?.habitCustomOrder ?? [];  //기본값 처리

  const setCustomOrder = useCallback((value: number[]) => {
    setUserStorage((prev) => ({ ...prev, habitCustomOrder: value }));
  }, [setUserStorage]);

  return {
    customOrder,
    setCustomOrder,
  };
}
