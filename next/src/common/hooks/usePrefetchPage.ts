import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePrefetchPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/calendar');
    router.prefetch('/list');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [])
}