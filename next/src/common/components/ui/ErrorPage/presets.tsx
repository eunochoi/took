import { ReactNode } from "react";

export interface ErrorPagePreset {
  title: string;
  description: string | ReactNode;
}

export const ERROR_PAGE_PRESETS = {
  notFound: {
    title: "404 Error",
    description: "요청하신 페이지를 찾을 수 없습니다.",
  },
  appError: {
    title: "문제가 발생했습니다",
    description: (
      <>
        일시적인 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </>
    ),
  },
  unauthorized: {
    title: "인증 실패",
    description: "인증에 실패했습니다. 다시 로그인해주세요.",
  },
  offline: {
    title: "오프라인",
    description: "인터넷 연결 상태를 확인해주세요.",
  },
} satisfies Record<string, ErrorPagePreset>;
