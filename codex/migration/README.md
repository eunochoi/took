# Took 마이그레이션 README

이 문서는 Codex에게 마이그레이션 작업을 맡길 때 보는 간단한 안내서입니다.

목표는 현재 프로젝트를 아래처럼 바꾸는 것입니다.

```text
현재: MySQL + Sequelize + Express + styled-components + React Query
목표: PostgreSQL + Prisma + Next Server Actions + Tailwind CSS
```

## 1. 현재 프로젝트 상태

현재 브랜치 기준 상태입니다.

- `front`: Next.js, React, TypeScript, React Query, axios, styled-components 사용
- `back`: Express, Sequelize, MySQL 사용
- Tailwind는 설정되어 있지만 대부분의 UI는 styled-components로 작성됨
- Prisma는 아직 설치되어 있지 않음
- `front/prisma` 폴더도 아직 없음
- 프론트는 `front/src/api/Api.ts`를 통해 백엔드 Express API를 호출함
- 이미지 업로드는 현재 Express + multer + sharp 흐름이고, 저장소는 AWS S3를 사용함

## 2. 꼭 기억할 결정

### themeColor는 DB에서 사용하지 않습니다

중요합니다.

- 기존 Sequelize `Habit` 모델에는 `themeColor`가 있습니다.
- 하지만 새 Prisma schema에는 `themeColor`를 넣지 않습니다.
- `User.themeColor`도 만들지 않습니다.
- 데이터 이관 시 기존 `Habit.themeColor` 값은 버립니다.
- 프론트 테마 색상은 localStorage/settings context 성격의 UI 설정으로만 유지합니다.

### 이미지 저장소 변경 관련

- 기존 코드는 AWS S3를 사용합니다.
- 마이그레이션하면서 OCI Image Storage 또는 OCI Object Storage를 사용하도록 수정합니다.
- 문서와 환경 변수 이름도 OCI 기준으로 정리합니다.

## 3. 추천 마이그레이션 순서

### 1단계. 준비

- `front`, `back` 실행 명령 확인
- PostgreSQL 로컬 실행 방법 준비
- Prisma 설치 준비

### 2단계. Prisma와 PostgreSQL 도입

- `front`에 `prisma`, `@prisma/client` 추가
- `front/prisma/schema.prisma` 생성
- `front/lib/prisma.ts` 생성
- PostgreSQL 연결 설정
- 첫 migration 생성

이때 `themeColor`는 schema에 넣지 않습니다.

### 3단계. 데이터 이관 계획

- MySQL 데이터를 PostgreSQL로 옮기는 방법 정리
- 옮길 필드와 버릴 필드 정리
- `Habit.themeColor`는 버리는 필드로 기록
- 이관 후 row count와 샘플 데이터 확인

### 4단계. 인증/유저 옮기기

- Express `/user/auth`
- Express `/user/current`
- Express `/user/logout`
- Express `DELETE /user`

위 기능을 NextAuth + Prisma 기반 코드로 옮깁니다.

### 5단계. 일기 기능 옮기기

- 일기 생성
- 일기 수정
- 일기 삭제
- 일기 상세 조회
- 날짜별 조회
- 월별 조회
- 목록 조회

일기 본문 암호화/복호화 동작은 유지합니다.

### 6단계. 습관 기능 옮기기

- 습관 목록
- 습관 생성/수정/삭제
- 습관 체크/체크 해제
- 오늘 습관 통계
- 월별/연별 습관 통계

습관 체크 시 일기가 없으면 invisible diary를 만드는 기존 동작을 유지합니다.

### 7단계. 통계 기능 옮기기

- 작성 연도 목록
- 연도별 일기 통계
- 연도별 습관 통계
- streak 계산

### 8단계. 이미지 업로드 옮기기

- Express `/image`를 Next Route Handler로 옮깁니다.
- 기존 AWS S3 업로드를 OCI Image Storage 또는 OCI Object Storage 업로드로 변경합니다.
- AWS S3 전용 설정, 버킷 이름, URL 생성 방식은 OCI 기준으로 다시 정리합니다.

### 9단계. 스타일 옮기기

- styled-components를 한 번에 지우지 않습니다.
- 공통 UI부터 Tailwind로 조금씩 바꿉니다.
- 모든 styled 사용이 없어졌을 때 styled-components를 제거합니다.

### 10단계. Express 백엔드 제거

모든 기능이 Next + Prisma로 옮겨지고 검증된 뒤에만 제거합니다.

## 4. React Query 관련

당장은 그대로 사용
나중에 불필요한 부분은 점진적으로 제거


## 6. Codex에게 시키면 좋은 첫 작업

첫 작업은 이 순서가 좋습니다.

1. `front`, `back` 실행 명령 확인
2. PostgreSQL 로컬 설정 추가
3. Prisma 설치
4. Prisma schema 생성
5. `themeColor`가 schema에 없는지 검증

복사해서 쓸 수 있는 요청:

```text
AGENTS.md와 codex/migration/README.md를 읽어줘.
codex/migration/tasks.md의 "`front`에 `prisma`, `@prisma/client` 의존성 추가" 작업만 진행해줘.
themeColor는 DB에서 사용하지 않는다는 결정을 반드시 지켜줘.
작업 후 검증하고 tasks.md도 업데이트해줘.
```

## 7. 작업할 때 주의할 것

- 한 번에 큰 작업을 맡기지 않습니다.
- 한 번에 파일을 너무 많이 바꾸지 않습니다.
- `themeColor`를 DB schema에 추가하지 않습니다.
- Express 백엔드는 마지막까지 남겨둡니다.
- 이미지 업로드 저장소 기준은 OCI Object Storage입니다.
- 작업이 끝날 때마다 `tasks.md`를 업데이트합니다.

## 8. 완료 기준

마이그레이션이 끝났다고 보려면 아래가 모두 되어야 합니다.

- PostgreSQL + Prisma로 데이터 조회/수정이 동작함
- Server Actions로 주요 write 동작이 처리됨
- 이미지 업로드가 OCI Object Storage로 동작함
- styled-components 사용이 Tailwind로 대체됨
- Express 백엔드 없이 앱이 동작함
- `themeColor`가 DB schema에 없음
