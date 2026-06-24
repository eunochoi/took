## Decision Log

decision.md는 중요한 설계 결정이 있을 때만 업데이트한다.

기록 대상:
- 아키텍처 결정
- 라이브러리 선택
- 데이터 모델 결정
- 성능/보안 관련 판단

기록 제외:
- 단순 리팩토링
- 스타일 수정
- 파일 이동
- 네이밍 변경

## 인증 라우팅 구조

앱 영역의 인증 확인은 `useAuthRoute`와 `authAction` 두 단계로 유지한다.

- `useAuthRoute`는 `(routes)/(app)/layout.tsx`에서 앱 영역 최초 진입 시 현재 유저를 확인하고, 인증되지 않은 사용자를 `/login`으로 이동시킨다.
- App Router의 레이아웃은 하위 페이지 전환마다 다시 마운트되지 않을 수 있으므로, 레이아웃 훅만으로 앱 사용 중 로그아웃/토큰 만료를 모두 감지하지 않는다.
- `authAction`은 서버 액션 실행 시점마다 인증 결과를 확인하고, access token 만료 또는 미로그인 상태면 refresh token으로 재발급을 시도한다.
- refresh 실패 또는 재시도 후에도 인증 실패가 유지되면 NextAuth 세션을 정리하고 `/login`으로 이동시킨다.
- 클라이언트 컴포넌트에서 서버 액션을 호출하는 경우에는 `authAction`을 통해 로그인 여부 판단과 access token 갱신을 함께 처리한다.
- 서버 컴포넌트의 prefetch는 refresh token으로 access token을 갱신하지 않으므로 `authAction`을 사용하지 않는다.
- prefetch에서 호출하는 서버 액션은 내부의 `getAuth`가 access token 쿠키를 확인해 로그인 여부를 판단한다.
- 따라서 `useAuthRoute`는 라우트 진입 보호, `authAction`은 요청 단위 인증 보호를 담당한다.
