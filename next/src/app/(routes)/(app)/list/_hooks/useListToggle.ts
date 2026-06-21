import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { LocalUserStorage } from "@/common/types";
import { MutableRefObject, useCallback } from "react";


type SORT = 'ASC' | 'DESC';
const SORT_TYPE: SORT[] = ['ASC', 'DESC'];

export const useListToggle = ({ ref }: { ref: MutableRefObject<HTMLDivElement | null> }) => {
  const { data: user } = useCurrentUser();
  const userStorageKey = user?.email;

  const { value: userStorage, setStoredValue: setUserStorage } = useLocalStorage<LocalUserStorage>(userStorageKey, {});
  const toggleValue = userStorage?.listSortType ?? 'DESC';

  const sortOrderChange = useCallback(() => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });

    const currentIdx = SORT_TYPE.findIndex(e => e === toggleValue);
    const nextIdx = (currentIdx + 1) % SORT_TYPE.length;
    setUserStorage((prev) => ({ ...prev, listSortType: SORT_TYPE[nextIdx] }));
  }, [ref, setUserStorage, toggleValue]);

  return { toggleValue, sortOrderChange };
}
