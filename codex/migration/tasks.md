# 마이그레이션 체크리스트

이 파일은 Codex와 함께 진행 상황을 확인하는 간단한 체크리스트입니다.

## 사용 방법

```text
AGENTS.md와 codex/migration/README.md를 읽어줘.
codex/migration/tasks.md에서 [] 작업만 진행해줘.
끝나면 검증하고 tasks.md도 업데이트해줘.
```

## 전체 작업

## TODO

- [x] PostgreSQL, Prisma 환경 구성
- [x] Prisma Schema 작성, PostgreSQL db 생성
- [x] 로그인 기능 마이그레이션
- [ ] 일기 기능 마이그레이션
- [ ] 습관 기능 마이그레이션
- [ ] 통계 기능 마이그레이션
- [ ] 이미지 업로드 마이그레이션
- [ ] Tailwind 전환
- [ ] Express 제거

## 꼭 지킬 것

- `themeColor`는 DB에 저장하지 않습니다.
- 새 Prisma schema에 `Habit.themeColor`를 넣지 않습니다.
- 새 Prisma schema에 `User.themeColor`도 만들지 않습니다.
- 이미지 저장소 기준은 OCI Object Storage입니다.
- React Query는 처음부터 제거하지 않습니다.
- Express 백엔드는 마지막까지 남겨둡니다.

## 완료한 작업

- [x] 현재 `main` 브랜치 기준 프로젝트 재분석
- [x] 마이그레이션 README 단순화
- [x] `themeColor`를 DB에서 사용하지 않는 결정 문서화
- [x] pnpm 기준으로 `front`, `back` 의존성 재설치
- [x] PostgreSQL, Prisma 환경 구성
- [x] Prisma Schema 작성, PostgreSQL db 생성
- [x] 로그인 기능 마이그레이션

## 작업 메모

- 2026-06-16: `front`에 Node 18 호환 Prisma 6.19.3 기준으로 `@prisma/client`와 `prisma`를 추가했습니다.
- 2026-06-16: `front/prisma/schema.prisma`에 기존 Sequelize `User`, `Diary`, `Habit`, `Image`, `DiaryHabit` 구조를 Prisma 모델로 옮겼습니다. `Habit.themeColor`와 `User.themeColor`는 포함하지 않았습니다.
- 2026-06-16: `front/lib/prisma.ts`에 개발 환경 중복 연결을 막는 Prisma Client 싱글턴을 추가했습니다.
- 2026-06-16: 검증 명령 `pnpm prisma:validate`, `pnpm prisma:generate`, `pnpm exec tsc --noEmit` 통과.
- 2026-06-16: 로컬 PostgreSQL `took_db`는 이미 존재했고, `User`, `Diary`, `Habit`, `Image`, `DiaryHabit` 테이블도 생성되어 있었습니다. 초기 migration `20260616121000_init`을 baseline으로 등록했습니다.
- 2026-06-16: 검증 명령 `pnpm exec prisma migrate status`, `pnpm exec prisma migrate diff --from-url postgresql://euno@localhost:5432/took_db --to-schema-datamodel prisma/schema.prisma --exit-code` 통과.
- 2026-06-16: Express `user` API 의존을 제거하고 NextAuth signIn callback에서 Prisma로 유저 확인/생성 및 자체 access/refresh token 쿠키 발급을 수행하도록 변경했습니다.
- 2026-06-16: 현재 유저 조회, 로그아웃, 회원탈퇴를 Server Action으로 옮겼고 refresh token은 `/api/auth/refresh` Route Handler에만 실리도록 `Path=/api/auth/refresh`를 유지했습니다.
- 2026-06-16: 로그인 마이그레이션 검증 명령 `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, `curl -I http://localhost:3000/login`, `curl -i -X POST http://localhost:3000/api/auth/refresh` 통과.
- 2026-06-18: 프론트의 현재 유저 조회를 `useCurrentUser` 훅으로 통합했고, 회원탈퇴 후 NextAuth 세션 정리와 로그인 화면 이동이 로그아웃 흐름과 같도록 정리했습니다.
- 2026-06-16: Tailwind 설정은 있지만 UI 대부분은 styled-components 기반입니다.
- 2026-06-16: 기존 Sequelize 모델에는 `Habit.themeColor`가 있지만 새 DB schema에는 포함하지 않습니다.
- 2026-06-16: 이미지 업로드는 OCI Object Storage 기준으로 정리합니다.
