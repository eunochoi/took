import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { authTokenIssuer, clearAccessRefreshToken, parseAuthTokenPayload, refreshAccessToken } from "@/common/auth/token";
import { getEnvValue } from "@/common/utils/getEnvValue";

/**
 * 리프레시 토큰을 검증하고 새로운 액세스 토큰을 발급한다.
*/
export const POST = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, getEnvValue('REFRESH_SECRET_KEY'), {
      issuer: authTokenIssuer,
    });
    const { email, provider } = parseAuthTokenPayload(decoded);

    if (!email || !provider) {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 });
    }

    const accessToken = await refreshAccessToken({ email, provider });
    return NextResponse.json({ result: true, accessToken });

  } catch (e: any) {
    console.error("refresh error:", e);
    await clearAccessRefreshToken();

    if (e.name === 'TokenExpiredError') {
      return NextResponse.json({ error: "리프레시 토큰이 만료되었습니다." }, { status: 401 });
    } else if (e.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 });
    }

    return NextResponse.json({ error: "서버 에러가 발생했습니다." }, { status: 500 });
  }
}
