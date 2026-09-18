-- 기존 습관에는 기본 아이콘을 적용한다. 새 앱 코드를 배포하기 전에 실행한다.
ALTER TABLE "Habit"
ADD COLUMN IF NOT EXISTS "iconKey" VARCHAR(32) NOT NULL DEFAULT 'goal';
