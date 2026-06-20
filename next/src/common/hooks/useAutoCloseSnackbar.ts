'use client';

import { usePathname } from "next/navigation";
import { closeSnackbar } from "notistack";
import { useEffect } from "react";

export const useAutoCloseSnackbar = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      closeSnackbar();
    }
  }, [pathname, closeSnackbar]);
}