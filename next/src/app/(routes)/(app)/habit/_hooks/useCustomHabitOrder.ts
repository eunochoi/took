import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { SortPreferences } from "@/common/types/sort";
import { useCallback, useEffect, useRef } from "react";

const HABIT_ORDER_CHANGED_EVENT = 'took:habit-order-changed';

interface HabitOrderChangedDetail {
  key: string;
  order: number[];
  source: symbol;
}

export const useCustomHabitOrder = () => {
  const { data: user } = useCurrentUser();
  const storageKey = user?.email ? `took:${user.email}:sort` : null;
  const source = useRef(Symbol('habit-order'));

  const { value: sortPreferences, setStoredValue: setSortPreferences, isStorageReady } = useLocalStorage<SortPreferences>(storageKey, {});

  const customHabitOrder = sortPreferences.habitCustom ?? [];

  useEffect(() => {
    if (!storageKey) return;

    const onOrderChanged = (event: Event) => {
      const { key, order, source: eventSource } = (event as CustomEvent<HabitOrderChangedDetail>).detail;
      if (key !== storageKey || eventSource === source.current) return;
      setSortPreferences((previousPreferences) => ({ ...previousPreferences, habitCustom: order }));
    };

    window.addEventListener(HABIT_ORDER_CHANGED_EVENT, onOrderChanged);
    return () => window.removeEventListener(HABIT_ORDER_CHANGED_EVENT, onOrderChanged);
  }, [setSortPreferences, storageKey]);

  const setCustomHabitOrder = useCallback((value: number[]) => {
    setSortPreferences((previousPreferences) => ({ ...previousPreferences, habitCustom: value }));
    if (storageKey) {
      window.dispatchEvent(new CustomEvent<HabitOrderChangedDetail>(HABIT_ORDER_CHANGED_EVENT, {
        detail: { key: storageKey, order: value, source: source.current },
      }));
    }
  }, [setSortPreferences, storageKey]);

  return {
    customHabitOrder,
    setCustomHabitOrder,
    isStorageReady,
  };
}
