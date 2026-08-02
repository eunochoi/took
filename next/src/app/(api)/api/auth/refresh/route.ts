import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  clearAccessRefreshToken,
  rotateRefreshToken,
  RefreshTokenError,
} from "@/common/auth/token";

/**
 * 리프레시 토큰을 검증하고 현재 로그인 세션을 rotation한다.
 */
export const POST = async () => {
  // 1. refresh token은 HttpOnly 쿠키이므로 서버에서 직접 읽는다.
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    // 2. JWT 검증, 서버 세션 검증, currentTokenHash 비교,
    //    rotation, 새 쿠키 저장까지 rotateRefreshToken에서 수행한다.
    await rotateRefreshToken(refreshToken);

    // 3. 토큰 원문은 JSON으로 반환하지 않는다.
    //    성공 시 Set-Cookie 헤더로 브라우저 쿠키가 교체된다.
    return NextResponse.json({ result: true });
  } catch (error) {
    console.error("refresh error:", error);

    // 4. refresh 실패 시 브라우저의 두 인증 쿠키를 제거한다.
    await clearAccessRefreshToken();

    if (error instanceof RefreshTokenError && error.code === 'EXPIRED') {
      return NextResponse.json({ error: "리프레시 토큰이 만료되었습니다." }, { status: 401 });
    }

    if (
      error instanceof RefreshTokenError ||
      (error instanceof Error && (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'))
    ) {
      return NextResponse.json({ error: "유효하지 않은 리프레시 토큰입니다." }, { status: 401 });
    }

    return NextResponse.json({ error: "서버 에러가 발생했습니다." }, { status: 500 });
  }
};
