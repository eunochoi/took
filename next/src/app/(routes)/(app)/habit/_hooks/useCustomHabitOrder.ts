import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { Order } from "@/common/types/order";
import { useCallback } from "react";

export const useCustomHabitOrder = () => {
  const { data: user } = useCurrentUser();
  const key = `took:${user?.email}:order`;

  const { value: order, setStoredValue: setOrder } = useLocalStorage<Order>(key, {});

  const customOrder = order?.habitCustom ?? [];  //기본값 처리

  const setCustomOrder = useCallback((value: number[]) => {
    setOrder((prev) => ({ ...prev, habitCustom: value }));
  }, [setOrder]);

  return {
    customOrder,
    setCustomOrder,
  };
}
