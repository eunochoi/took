import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useDiaryNavigation = (diaryId: number) => {
  const router = useRouter();

  const navigateToZoom = useCallback(() => {
    if (diaryId) {
      router.push(`/inter/zoom?id=${diaryId}`, { scroll: false });
    }
  }, [diaryId, router]);

  return { navigateToZoom };
};

export default useDiaryNavigation;
