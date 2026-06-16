# 마이그레이션 체크리스트

이 파일은 Codex와 함께 진행 상황을 확인하는 간단한 체크리스트입니다.

## 사용 방법

```text
AGENTS.md와 codex/migration/README.md를 읽어줘.
codex/migration/tasks.md에서 [] 작업만 진행해줘.
끝나면 검증하고 tasks.md도 업데이트해줘.
```

## 전체 작업

- [ ] 1. `front`, `back` 실행 명령 확인
- [ ] 2. PostgreSQL 로컬 개발 환경 준비
- [ ] 3. Prisma 설치와 기본 설정
- [ ] 4. Prisma schema 작성
- [ ] 5. MySQL에서 PostgreSQL로 데이터 이관 계획 작성
- [ ] 6. 인증/유저 기능을 Next + Prisma로 옮기기
- [ ] 7. 일기 기능을 Next + Prisma로 옮기기
- [ ] 8. 습관 기능을 Next + Prisma로 옮기기
- [ ] 9. 통계 기능을 Next + Prisma로 옮기기
- [ ] 10. 이미지 업로드를 OCI Object Storage 기준으로 옮기기
- [ ] 11. styled-components를 Tailwind로 조금씩 옮기기
- [ ] 12. 모든 기능 검증 후 Express 백엔드 제거

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

## 작업 메모

- 2026-06-16: 현재 `front`에는 Prisma 의존성과 `front/prisma` 폴더가 없습니다.
- 2026-06-16: Tailwind 설정은 있지만 UI 대부분은 styled-components 기반입니다.
- 2026-06-16: 기존 Sequelize 모델에는 `Habit.themeColor`가 있지만 새 DB schema에는 포함하지 않습니다.
- 2026-06-16: 이미지 업로드는 OCI Object Storage 기준으로 정리합니다.
