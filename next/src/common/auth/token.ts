import jwt, { type JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createHash, randomUUID } from 'node:crypto';

import { getEnvValue } from '@/common/utils/getEnvValue';
import { prisma } from '../../../lib/prisma';

export type AuthTokenPayload = {
  email: string;
  provider: string;
  sessionId: string;
};

export type RefreshTokenPayload = AuthTokenPayload & {
  absoluteSessionExpiresAtSeconds: number;
};

export type CreateAuthSessionParams = {
  userId: number;
  email: string;
  provider: string;
};

export const authTokenIssuer = 'took';
export const accessTokenMaxAge = 5 * 60;
export const refreshTokenMaxAge = 7 * 24 * 60 * 60;
const accessTokenPath = '/';
const refreshTokenPath = '/api/auth/refresh';

export class RefreshTokenError extends Error {
  constructor(message: string, public readonly code: 'INVALID' | 'EXPIRED' | 'REUSED') {
    super(message);
    this.name = 'RefreshTokenError';
  }
}

const nowInSeconds = () => Math.floor(Date.now() / 1000);

export const hashRefreshToken = (refreshToken: string) => {
  return createHash('sha256').update(refreshToken).digest('hex');
};

// 토큰에서 access token 인증에 필요한 값만 꺼냄
export const parseAuthTokenPayload = (decoded: string | JwtPayload): AuthTokenPayload => {
  if (
    typeof decoded === 'string' ||
    typeof decoded.email !== 'string' ||
    typeof decoded.provider !== 'string' ||
    typeof decoded.sessionId !== 'string'
  ) {
    throw new Error('Invalid auth token payload.');
  }

  return {
    email: decoded.email,
    provider: decoded.provider,
    sessionId: decoded.sessionId,
  };
};

export const parseRefreshTokenPayload = (decoded: string | JwtPayload): RefreshTokenPayload => {
  if (
    typeof decoded === 'string' ||
    typeof decoded.email !== 'string' ||
    typeof decoded.provider !== 'string' ||
    typeof decoded.sessionId !== 'string' ||
    typeof decoded.absoluteSessionExpiresAtSeconds !== 'number' ||
    !Number.isSafeInteger(decoded.absoluteSessionExpiresAtSeconds)
  ) {
    throw new RefreshTokenError('유효하지 않은 리프레시 토큰입니다.', 'INVALID');
  }

  return {
    email: decoded.email,
    provider: decoded.provider,
    sessionId: decoded.sessionId,
    absoluteSessionExpiresAtSeconds: decoded.absoluteSessionExpiresAtSeconds,
  };
};

// 쿠키 옵션 공통 설정
const createCookieOptions = (path: string, maxAge: number) => {
  const secure = process.env.NODE_ENV === 'production';
  const domain = getEnvValue('NEXT_PUBLIC_DOMAIN').trim();

  return {
    httpOnly: true,
    secure,
    sameSite: 'lax' as const,
    maxAge,
    path,
    domain,
  };
};

const signAccessToken = (payload: AuthTokenPayload) => {
  return jwt.sign(payload, getEnvValue('ACCESS_SECRET_KEY'), {
    expiresIn: accessTokenMaxAge,
    issuer: authTokenIssuer,
    algorithm: 'HS256',
  });
};

const signRefreshToken = ({
  email,
  provider,
  sessionId,
  absoluteSessionExpiresAtSeconds,
}: RefreshTokenPayload) => {
  const expiresIn = absoluteSessionExpiresAtSeconds - nowInSeconds();

  if (expiresIn <= 0) {
    throw new RefreshTokenError('리프레시 세션이 만료되었습니다.', 'EXPIRED');
  }

  return jwt.sign(
    {
      email,
      provider,
      sessionId,
      absoluteSessionExpiresAtSeconds,
    },
    getEnvValue('REFRESH_SECRET_KEY'),
    {
      expiresIn,
      issuer: authTokenIssuer,
      algorithm: 'HS256',
    },
  );
};

const setAuthCookies = async ({
  accessToken,
  refreshToken,
  refreshMaxAge,
}: {
  accessToken: string;
  refreshToken: string;
  refreshMaxAge: number;
}) => {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, createCookieOptions(accessTokenPath, accessTokenMaxAge));
  cookieStore.set('refreshToken', refreshToken, createCookieOptions(refreshTokenPath, refreshMaxAge));
};

// OAuth 로그인 성공 시 로그인 세션과 access / refresh 토큰을 생성한다.
export const setAccessRefreshToken = async ({ userId, email, provider }: CreateAuthSessionParams) => {
  const sessionId = randomUUID();
  const absoluteSessionExpiresAtSeconds = nowInSeconds() + refreshTokenMaxAge; //로그인시 결정되는 세션 만료 시각
  const refreshToken = signRefreshToken({
    email,
    provider,
    sessionId,
    absoluteSessionExpiresAtSeconds,
  });
  const accessToken = signAccessToken({ email, provider, sessionId });

  await prisma.refreshSession.create({
    data: {
      userId,
      sessionId,
      currentTokenHash: hashRefreshToken(refreshToken),
      absoluteSessionExpiresAt: new Date(absoluteSessionExpiresAtSeconds * 1000),
    },
  });

  await setAuthCookies({
    accessToken,
    refreshToken,
    refreshMaxAge: refreshTokenMaxAge,
  });
};

export const revokeRefreshSession = async (sessionId: string) => {
  await prisma.refreshSession.updateMany({
    where: {
      sessionId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

export const revokeSessionByRefreshToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, getEnvValue('REFRESH_SECRET_KEY'), {
      issuer: authTokenIssuer,
      algorithms: ['HS256'],
    });
    const { sessionId } = parseRefreshTokenPayload(decoded);
    await revokeRefreshSession(sessionId);
  } catch {
    // 로그아웃은 이미 만료되거나 변조된 토큰이어도 쿠키 삭제를 계속 수행한다.
  }
};

// refresh token을 검증하고 현재 로그인 세션의 access / refresh 토큰을 rotation한다.
export const rotateRefreshToken = async (refreshToken: string) => {
  // 1. refresh token JWT 자체를 검증한다.
  //    서명, issuer, 허용 알고리즘, JWT의 exp를 확인한다.
  const decodedRefreshToken = jwt.verify(refreshToken, getEnvValue('REFRESH_SECRET_KEY'), {
    issuer: authTokenIssuer,
    algorithms: ['HS256'],
  });

  // 2. refresh token payload의 필수 값과 타입을 확인한다.
  const refreshTokenPayload = parseRefreshTokenPayload(decodedRefreshToken);

  const nowDate = new Date();
  const nowMilliseconds = nowDate.getTime();

  // 3. refresh token의 sessionId로 서버 세션을 조회한다.
  //    이 단계부터는 JWT 자체가 아니라 DB의 현재 세션 상태를 확인한다.
  const session = await prisma.refreshSession.findUnique({
    where: { sessionId: refreshTokenPayload.sessionId },
  });

  if (!session) {
    throw new RefreshTokenError('유효하지 않은 로그인 세션입니다.', 'INVALID');
  }

  // 4. 서버에서 폐기한 세션인지 확인한다.
  if (session.revokedAt) {
    throw new RefreshTokenError('이미 폐기된 로그인 세션입니다.', 'INVALID');
  }

  // 5. DB의 Date 값을 비교에 사용할 단위로 명확하게 변환한다.
  const absoluteSessionExpiresAtDate = session.absoluteSessionExpiresAt;
  const absoluteSessionExpiresAtMilliseconds = absoluteSessionExpiresAtDate.getTime();
  const absoluteSessionExpiresAtSeconds = Math.floor(
    absoluteSessionExpiresAtMilliseconds / 1000,
  );

  // 6. DB의 서버 세션 절대 만료 시각을 확인한다.
  if (absoluteSessionExpiresAtMilliseconds <= nowMilliseconds) {
    await revokeRefreshSession(refreshTokenPayload.sessionId);
    throw new RefreshTokenError('리프레시 세션이 만료되었습니다.', 'EXPIRED');
  }

  // 7. refresh token payload에 들어 있는 절대 만료 시각도 확인한다.
  //    JWT의 숫자는 초 단위이므로 비교할 때 밀리초로 변환한다.
  const tokenAbsoluteSessionExpiresAtMilliseconds =
    refreshTokenPayload.absoluteSessionExpiresAtSeconds * 1000;

  if (tokenAbsoluteSessionExpiresAtMilliseconds <= nowMilliseconds) {
    await revokeRefreshSession(refreshTokenPayload.sessionId);
    throw new RefreshTokenError('리프레시 세션이 만료되었습니다.', 'EXPIRED');
  }

  // 8. JWT의 만료 시각과 DB의 만료 시각이 같은 세션을 가리키는지 확인한다.
  if (
    refreshTokenPayload.absoluteSessionExpiresAtSeconds !==
    absoluteSessionExpiresAtSeconds
  ) {
    await revokeRefreshSession(refreshTokenPayload.sessionId);
    throw new RefreshTokenError('유효하지 않은 리프레시 세션입니다.', 'INVALID');
  }

  // 9. 요청으로 들어온 raw refresh token을 해시한다.
  //    DB에는 raw token이 없고 현재 사용 가능한 token의 해시만 저장되어 있다.
  const presentedRefreshTokenHash = hashRefreshToken(refreshToken);

  // 10. 같은 로그인 세션을 유지하면서 새 토큰을 발급한다.
  const nextRefreshToken = signRefreshToken({
    email: refreshTokenPayload.email,
    provider: refreshTokenPayload.provider,
    sessionId: refreshTokenPayload.sessionId,
    absoluteSessionExpiresAtSeconds,
  });
  const nextAccessToken = signAccessToken({
    email: refreshTokenPayload.email,
    provider: refreshTokenPayload.provider,
    sessionId: refreshTokenPayload.sessionId,
  });

  // 11. 현재 해시가 요청 토큰의 해시와 일치할 때만 원자적으로 교체한다.
  //     sessionId가 unique이므로 결과는 정상적으로 0개 또는 1개다.
  //     0개라면 이미 다른 요청이 먼저 교체했거나, 폐기/만료/재사용된 token이다.
  const updated = await prisma.refreshSession.updateMany({
    where: {
      sessionId: refreshTokenPayload.sessionId,
      currentTokenHash: presentedRefreshTokenHash,
      revokedAt: null,
      absoluteSessionExpiresAt: { gt: nowDate },
    },
    data: {
      currentTokenHash: hashRefreshToken(nextRefreshToken),
    },
  });

  // updated.count === 0 :존재하지 않는 or 이전에 사용된 presentedRefreshTokenHash가 업데이트에 사용된 경우
  // updated.count > 1 : sessionId가 유니크이기 때문에 사실상 불가능
  if (updated.count !== 1) {
    // 12. 현재 토큰 재사용 또는 동시 refresh를 보수적으로 세션 탈취로 처리한다.
    await revokeRefreshSession(refreshTokenPayload.sessionId);
    throw new RefreshTokenError('리프레시 토큰 재사용이 의심됩니다.', 'REUSED');
  }

  // 13. 서버 세션의 최초 만료 시각까지 남은 시간만 refresh 쿠키에 설정한다.
  //     이 값은 DB 세션 만료 자체가 아니라 브라우저 쿠키의 보관 기간이다.
  const refreshMaxAge = Math.max(
    1,
    absoluteSessionExpiresAtSeconds - nowInSeconds(),
  );

  // 14. 토큰 원문은 JSON body로 반환하지 않고 Set-Cookie 헤더로 교체한다.
  await setAuthCookies({
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
    refreshMaxAge,
  });
};

// 로그아웃, 토큰 오류 시 access / refresh 토큰 제거
export const clearAccessRefreshToken = async () => {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', '', createCookieOptions(accessTokenPath, 0));
  cookieStore.set('refreshToken', '', createCookieOptions(refreshTokenPath, 0));
};
