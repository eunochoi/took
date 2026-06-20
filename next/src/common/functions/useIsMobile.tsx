'use client';

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// 페이지 전환해도 값 유지하려고 전역으로 저장
let lastKnownValue: boolean | null = null;

const useIsMobile = () => {
  const [mobile, setMobile] = useState<boolean | null>(lastKnownValue);

  const mode = useMediaQuery({
    query: "(max-width: 1024px)"
  });

  useEffect(() => {
    lastKnownValue = mode;
    setMobile(mode);
  }, [mode])

  return mobile;
};

export default useIsMobile;