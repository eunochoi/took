import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { SortPreferences } from "@/common/types/sort";
import { useCallback } from "react";

export const useCustomHabitOrder = () => {
  const { data: user } = useCurrentUser();
  const storageKey = `took:${user?.email}:sort`;

  const { value: sortPreferences, setStoredValue: setSortPreferences } = useLocalStorage<SortPreferences>(storageKey, {});

  const customHabitOrder = sortPreferences.habitCustom ?? [];

  const setCustomHabitOrder = useCallback((value: number[]) => {
    setSortPreferences((previousPreferences) => ({ ...previousPreferences, habitCustom: value }));
  }, [setSortPreferences]);

  return {
    customHabitOrder,
    setCustomHabitOrder,
  };
}
