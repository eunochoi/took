# Took Codex 작업 가이드

이 파일은 Codex가 이 저장소에서 작업할 때 가장 먼저 참고할 프로젝트 지침입니다.

프로젝트 표시명은 `Took`입니다. 이전 이름인 `everstamp`/`에버스탬프`를 새 문서나 코드 이름에 새로 사용하지 않습니다.

## 권장 작업 흐름

1. `codex/migration/README.md`를 읽습니다.
2. `codex/migration/tasks.md`에서 작은 작업 하나를 고릅니다.
3. 구현과 필요한 검증을 진행합니다.
4. `codex/migration/tasks.md`의 작업 상태와 검증 메모를 갱신합니다.
5. 완료 보고 전에 가장 작고 의미 있는 검증 명령을 실행합니다.
6. 중요한 설계 결정이 있을 때만 `codex/migration/decision.md`를 업데이트합니다.


## 코딩 메모

- 마이그레이션 작업 중 넓은 리팩터링은 피합니다.
- 모든 Next 흐름이 검증되기 전까지 `back`을 제거하지 않습니다.
- 여러 테이블을 함께 쓰는 변경 작업은 Prisma transaction을 사용합니다.
- `front/src/app/(routes)/(app)` 아래의 라우트 그룹과 모달 라우팅 동작은 유지합니다.
