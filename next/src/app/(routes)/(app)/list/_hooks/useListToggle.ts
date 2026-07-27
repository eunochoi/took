import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { ListSortType, Order } from "@/common/types/order";
import { MutableRefObject, useCallback } from "react";


const SORT_LIST: ListSortType[] = ['ASC', 'DESC'] as const;

export const useListToggle = ({ ref }: { ref: MutableRefObject<HTMLDivElement | null> }) => {
  const { data: user } = useCurrentUser();
  const key = `took:${user?.email}:order`;

  const { value: order, setStoredValue: setOrder } = useLocalStorage<Order>(key, {});
  const toggleValue = order?.list ?? 'DESC';

  const sortOrderChange = useCallback(() => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });

    const currentIdx = SORT_LIST.findIndex(e => e === toggleValue);
    const nextIdx = (currentIdx + 1) % SORT_LIST.length;
    setOrder((prev) => ({ ...prev, list: SORT_LIST[nextIdx] }));
  }, [ref, setOrder, toggleValue]);

  return { toggleValue, sortOrderChange };
}
