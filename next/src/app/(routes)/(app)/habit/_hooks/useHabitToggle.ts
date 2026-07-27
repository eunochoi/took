import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { HabitSortType, Order } from "@/common/types/order";
import { useCallback } from "react";

const SORT_LIST: HabitSortType[] = ['DESC', 'ASC', 'PRIORITY', 'CUSTOM'] as const;

export const useHabitToggle = () => {
  const { data: user } = useCurrentUser();
  const key = `took:${user?.email}:order`;

  const { value: order, setStoredValue: setOrder } = useLocalStorage<Order>(key, {});
  const toggleValue = order?.habit ?? 'DESC'; //기본값 처리

  const onToggle = useCallback(() => {
    const currentIdx = SORT_LIST.findIndex(e => e === toggleValue);
    const nextIdx = (currentIdx + 1) % SORT_LIST.length;
    setOrder((prev) => ({ ...prev, habit: SORT_LIST[nextIdx] }));
  }, [setOrder, toggleValue]);

  return {
    toggleValue,
    onToggle
  };
}
