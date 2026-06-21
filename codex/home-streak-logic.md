# 홈 연속 기록 계산 로직 정리

## 1. 연속 기록이 의미하는 것

홈의 일기 정보 영역에는 두 가지 연속 기록이 표시된다.

1. 현재 연속 기록 또는 유지 중인 기록
2. 최장 연속 기록

현재 연속 기록은 사용자가 지금 이어가고 있는 일기 작성 흐름을 나타낸다. 오늘 일기를 작성했다면 오늘 날짜를 포함해서 계산한다. 오늘 일기를 아직 작성하지 않았지만 어제까지 이어진 기록이 있다면, 그 기록은 아직 오늘 작성으로 이어갈 수 있으므로 `유지 중인 기록`으로 표시한다.

최장 연속 기록은 전체 visible 일기 날짜 중 가장 길게 이어진 구간을 나타낸다. 오늘 일기가 있다면 오늘도 최장 기록 후보에 포함된다.

## 2. 새 기준

연속 기록 계산 기준은 아래와 같다.

| 상황 | 첫 번째 카드 라벨 | 첫 번째 카드 값 | 의미 |
| --- | --- | --- | --- |
| 오늘 일기가 있음 | 현재 연속 기록 | 오늘 포함 연속 일수 | 오늘 기록까지 반영된 현재 기록 |
| 오늘 일기는 없고 어제 일기가 있음 | 유지 중인 기록 | 어제까지의 연속 일수 | 오늘 작성하면 이어지는 기록 |
| 오늘 일기도 없고 어제 일기도 없음 | 현재 연속 기록 | 0일 | 이어지고 있는 기록 없음 |

예시는 아래와 같다.

| 일기 작성 날짜 | 오늘 기준 | 표시 |
| --- | --- | --- |
| 오늘 | 오늘 있음 | 현재 연속 기록 1일 |
| 어제 | 오늘 없음, 어제 있음 | 유지 중인 기록 1일 |
| 어제, 오늘 | 오늘 있음 | 현재 연속 기록 2일 |
| 그제, 어제, 오늘 | 오늘 있음 | 현재 연속 기록 3일 |
| 그제, 어제 | 오늘 없음, 어제 있음 | 유지 중인 기록 2일 |
| 그제 | 오늘 없음, 어제 없음 | 현재 연속 기록 0일 |

## 3. 관련 파일

연속 기록 계산과 표시에는 아래 파일들이 관여한다.

| 파일 | 역할 |
| --- | --- |
| `next/src/common/actions/streak/index.ts` | 연속 기록 계산의 중심. 날짜 배열을 받아 현재/유지 기록과 최장 기록을 계산한다. |
| `next/src/common/actions/stats/getDiaryStats.ts` | 홈 통계 서버 액션. 계산된 streak 값을 `DiaryStats` 응답에 포함한다. |
| `next/src/common/actions/stats/utils/index.ts` | 홈 통계에서 streak를 가져오고, 저장된 User streak 값이 다르면 갱신한다. |
| `next/src/common/actions/diary/utils/index.ts` | 일기 생성/삭제 후 streak 재계산 함수를 호출한다. |
| `next/src/common/actions/stats/types/index.ts` | 홈 통계 응답 타입을 정의한다. |
| `next/src/app/(routes)/(app)/home/_components/DiaryAnalysis.tsx` | 홈에서 streak 값을 카드로 보여준다. |

## 4. 전체 데이터 흐름

홈 화면에서 연속 기록이 표시되는 흐름은 아래 순서다.

1. `HomePage` 또는 `HomeView.client.tsx`에서 `getDiaryStats({ year })`를 호출한다.
2. `getDiaryStats`는 현재 사용자의 visible 일기 목록을 조회한다.
3. `getDiaryStats`는 `getOrComputeStreak(auth.email)`을 호출한다.
4. `getOrComputeStreak`는 `computeDiaryStreakByEmail(email)`을 호출한다.
5. `computeDiaryStreakByEmail`은 DB에서 visible 일기 날짜를 모두 가져온다.
6. `calculateDiaryStreak`가 날짜 목록을 기준으로 streak를 계산한다.
7. 계산된 streak가 User 테이블에 저장된 값과 다르면 User의 `currentStreakDays`, `longestStreakDays`를 업데이트한다.
8. `getDiaryStats`는 계산 결과를 `DiaryStats` 데이터에 담아 반환한다.
9. `DiaryAnalysis.tsx`가 `streakStatus`를 보고 카드 라벨을 결정한다.
10. `currentStreak.days`, `longestStreak.days`가 홈 카드에 표시된다.

일기 생성/삭제 시에는 흐름이 조금 다르다.

1. `createDiary` 또는 `deleteDiary`가 DB의 일기 데이터를 변경한다.
2. 변경이 끝나면 `recomputeStreak(auth.email)`을 호출한다.
3. `recomputeStreak`는 내부에서 `recomputeUserDiaryStreak(email)`을 호출한다.
4. `recomputeUserDiaryStreak`는 현재 DB 상태를 기준으로 streak를 다시 계산한다.
5. 계산 결과를 User 테이블의 `currentStreakDays`, `longestStreakDays`에 저장한다.

## 5. 핵심 계산 코드

연속 기록 계산의 핵심 파일은 `next/src/common/actions/streak/index.ts`다. 이 파일은 크게 네 단계로 나뉜다.

1. 타입 정의
2. 특정 날짜에서 뒤로 이어지는 연속 일수 계산
3. 전체 날짜 중 최장 연속 구간 계산
4. DB에서 날짜를 가져오고 User 테이블에 저장

현재 코드는 아래와 같은 구조다.

```ts
import { prisma } from '../../../../lib/prisma';
import { addDaysToDateString, getDateStringDayDiff, getTodayStringInUserTimezone } from '../../utils/date/userTimezone';

export type DiaryStreakStatus = 'current' | 'pending' | 'none';

export interface DiaryStreakResult {
  currentStreak: number;
  longestStreak: number;
  hasTodayDiary: boolean;
  hasYesterdayDiary: boolean;
  status: DiaryStreakStatus;
}
```

`DiaryStreakStatus`는 UI에서 어떤 라벨을 보여줄지 판단하는 값이다.

- `current`: 오늘 일기가 있어서 오늘 포함 현재 기록을 보여준다.
- `pending`: 오늘 일기는 없지만 어제까지 이어진 기록이 있어서 유지 중인 기록을 보여준다.
- `none`: 오늘도 어제도 기록이 없어서 이어지는 기록이 없다.

`DiaryStreakResult`는 계산 결과 전체를 담는다.

- `currentStreak`: 홈의 첫 번째 streak 카드에 표시할 값
- `longestStreak`: 홈의 최장 연속 기록 카드에 표시할 값
- `hasTodayDiary`: 오늘 일기 존재 여부
- `hasYesterdayDiary`: 어제 일기 존재 여부
- `status`: UI 라벨 판단용 상태

## 6. 특정 날짜 기준으로 뒤로 세는 함수

```ts
const countConsecutiveDatesEndingAt = (dates: string[], endDate: string) => {
  const endDateIndex = dates.indexOf(endDate);
  if (endDateIndex < 0) return 0;

  let streak = 1;
  for (let i = endDateIndex - 1; i >= 0; i -= 1) {
    const diffDays = getDateStringDayDiff(dates[i], dates[i + 1]);

    if (diffDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
};
```

이 함수는 `endDate`에서 시작해서 과거 방향으로 하루씩 이어지는 날짜가 있는지 확인한다.

예를 들어 `dates`가 아래와 같다고 하자.

```ts
['2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21']
```

그리고 `endDate`가 `2026-06-21`이라면 계산은 이렇게 진행된다.

1. `2026-06-21`의 인덱스를 찾는다.
2. streak를 `1`로 시작한다.
3. 바로 앞 날짜 `2026-06-20`과 현재 기준 날짜 `2026-06-21`의 차이를 구한다.
4. 차이가 `1일`이면 streak를 증가시킨다.
5. 다시 `2026-06-19`와 `2026-06-20`의 차이를 구한다.
6. 계속 하루 차이라면 streak를 증가시킨다.
7. 중간에 하루 차이가 아닌 구간을 만나면 반복을 멈춘다.

이 함수는 현재 기록과 유지 중인 기록을 계산할 때 사용된다.

오늘 일기가 있으면 `endDate`는 오늘이다.

```ts
countConsecutiveDatesEndingAt(uniqueDates, todayStr);
```

오늘 일기가 없고 어제 일기가 있으면 `endDate`는 어제다.

```ts
countConsecutiveDatesEndingAt(uniqueDates, yesterdayStr);
```

## 7. 최장 연속 기록 계산 함수

```ts
const getLongestStreak = (dates: string[]) => {
  if (dates.length === 0) return 0;

  let longestStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < dates.length; i += 1) {
    const diffDays = getDateStringDayDiff(dates[i - 1], dates[i]);

    if (diffDays === 1) {
      tempStreak += 1;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  return Math.max(longestStreak, tempStreak);
};
```

이 함수는 전체 날짜 배열을 처음부터 끝까지 훑으면서 가장 긴 연속 구간을 찾는다.

예를 들어 날짜가 아래와 같다고 하자.

```ts
[
  '2026-06-01',
  '2026-06-02',
  '2026-06-04',
  '2026-06-05',
  '2026-06-06'
]
```

연속 구간은 두 개다.

1. `2026-06-01` ~ `2026-06-02`: 2일
2. `2026-06-04` ~ `2026-06-06`: 3일

이 경우 `longestStreak`는 `3`이 된다.

`tempStreak`는 현재 확인 중인 연속 구간의 길이다. 날짜가 하루 차이로 이어지면 증가한다. 중간에 끊기면 지금까지의 `tempStreak`를 `longestStreak`와 비교한 뒤, `tempStreak`를 다시 `1`로 초기화한다.

## 8. 전체 계산 함수

```ts
export const calculateDiaryStreak = async (diaryDates: string[]): Promise<DiaryStreakResult> => {
  const uniqueDates = Array.from(new Set(diaryDates)).sort();
  const todayStr = await getTodayStringInUserTimezone();
  const yesterdayStr = addDaysToDateString(todayStr, -1);

  const hasTodayDiary = uniqueDates.includes(todayStr);
  const hasYesterdayDiary = uniqueDates.includes(yesterdayStr);
  const streakEndDate = hasTodayDiary ? todayStr : hasYesterdayDiary ? yesterdayStr : null;
  const currentStreak = streakEndDate
    ? countConsecutiveDatesEndingAt(uniqueDates, streakEndDate)
    : 0;
  const longestStreak = getLongestStreak(uniqueDates);

  return {
    currentStreak,
    longestStreak,
    hasTodayDiary,
    hasYesterdayDiary,
    status: hasTodayDiary ? 'current' : currentStreak > 0 ? 'pending' : 'none',
  };
};
```

이 함수가 실제 정책을 결정한다.

먼저 중복 날짜를 제거한다.

```ts
const uniqueDates = Array.from(new Set(diaryDates)).sort();
```

하루에 일기가 하나만 있어야 하지만, 계산 함수는 안전하게 중복 제거를 한다. 이렇게 하면 같은 날짜가 여러 번 들어와도 streak가 잘못 증가하지 않는다.

그 다음 사용자 타임존 기준 오늘을 구한다.

```ts
const todayStr = await getTodayStringInUserTimezone();
```

이 프로젝트는 서버 시간이 아니라 사용자 타임존 기준 날짜를 사용한다. 그래서 한국 사용자가 밤늦게 쓰는 일기가 서버 날짜 때문에 다른 날짜로 계산되는 일을 줄인다.

어제 날짜는 오늘 문자열에서 하루를 뺀다.

```ts
const yesterdayStr = addDaysToDateString(todayStr, -1);
```

오늘 일기와 어제 일기가 있는지 확인한다.

```ts
const hasTodayDiary = uniqueDates.includes(todayStr);
const hasYesterdayDiary = uniqueDates.includes(yesterdayStr);
```

그리고 현재 계산의 끝 날짜를 정한다.

```ts
const streakEndDate = hasTodayDiary ? todayStr : hasYesterdayDiary ? yesterdayStr : null;
```

이 한 줄이 새 UX의 핵심이다.

- 오늘 일기가 있으면 오늘을 기준으로 센다.
- 오늘 일기가 없고 어제 일기가 있으면 어제를 기준으로 센다.
- 둘 다 없으면 이어지는 기록이 없으므로 `null`이다.

그 다음 현재 표시할 streak를 계산한다.

```ts
const currentStreak = streakEndDate
  ? countConsecutiveDatesEndingAt(uniqueDates, streakEndDate)
  : 0;
```

최장 streak는 오늘/어제 여부와 상관없이 전체 날짜 기준으로 계산한다.

```ts
const longestStreak = getLongestStreak(uniqueDates);
```

마지막으로 UI 상태를 만든다.

```ts
status: hasTodayDiary ? 'current' : currentStreak > 0 ? 'pending' : 'none'
```

상태 의미는 아래와 같다.

- 오늘 일기가 있으면 `current`
- 오늘 일기는 없지만 현재 표시할 streak가 있으면 `pending`
- 표시할 streak가 없으면 `none`

## 9. DB에서 계산하는 함수

```ts
export const computeDiaryStreakByEmail = async (email: string) => {
  const diaries = await prisma.diary.findMany({
    where: { email, visible: true },
    select: { date: true },
  });

  return calculateDiaryStreak(diaries.map((diary) => diary.date));
};
```

이 함수는 특정 사용자의 visible 일기 날짜를 DB에서 가져온다.

중요한 점은 `visible: true` 조건이다. 삭제된 일기는 실제 DB에서 완전히 지워지는 것이 아니라 `visible: false`로 숨겨진다. 따라서 streak 계산에서는 visible 일기만 사용해야 한다.

`select: { date: true }`만 가져오는 것도 중요하다. streak 계산에는 본문, 감정, 이미지가 필요 없다. 날짜만 가져오면 DB에서 가져오는 데이터 양을 줄일 수 있다.

## 10. User 테이블에 저장하는 함수

```ts
export const recomputeUserDiaryStreak = async (email: string) => {
  const streak = await computeDiaryStreakByEmail(email);

  await prisma.user.update({
    where: { email },
    data: {
      currentStreakDays: streak.currentStreak,
      longestStreakDays: streak.longestStreak,
    },
  });

  return streak;
};
```

이 함수는 계산된 값을 User 테이블에 저장한다.

User 테이블에는 아래 필드가 있다.

```prisma
currentStreakDays Int?
longestStreakDays Int?
```

이 필드는 빠르게 streak 값을 조회하기 위한 캐시처럼 사용할 수 있다. 하지만 날짜가 바뀌면 아무 일기 생성/삭제가 없어도 현재 streak가 달라질 수 있다. 그래서 홈 통계 조회에서는 저장된 값만 믿지 않고 다시 계산한다.

## 11. 홈 통계 조회 시 계산

홈 통계 조회에서는 `getDiaryStats`가 호출된다.

```ts
const streak = await getOrComputeStreak(auth.email);
```

`getOrComputeStreak`는 현재 이렇게 동작한다.

```ts
export const getOrComputeStreak = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      currentStreakDays: true,
      longestStreakDays: true,
    },
  });

  if (!user) return null;

  const streak = await computeDiaryStreakByEmail(email);

  if (
    user.currentStreakDays !== streak.currentStreak ||
    user.longestStreakDays !== streak.longestStreak
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreakDays: streak.currentStreak,
        longestStreakDays: streak.longestStreak,
      },
    });
  }

  return streak;
};
```

이 함수는 먼저 User를 조회한다. User가 없으면 `null`을 반환한다.

그 다음 `computeDiaryStreakByEmail(email)`로 현재 DB 상태 기준 streak를 다시 계산한다.

계산값과 User에 저장된 값이 다르면 User를 업데이트한다. 같으면 업데이트하지 않는다.

이 방식의 장점은 정확성과 효율의 균형이다.

- 정확성: 홈을 볼 때마다 사용자 타임존 기준 오늘/어제 상태를 다시 반영한다.
- 효율: 값이 같으면 User 업데이트 쿼리는 실행하지 않는다.

## 12. 홈 응답 타입

`DiaryStats` 타입에는 streak 표시를 위한 필드가 추가되어 있다.

```ts
export interface DiaryStats {
  totalCount: number;
  emotionCounts: number[];
  currentStreak: StreakUnits;
  longestStreak: StreakUnits;
  hasTodayDiary: boolean;
  hasYesterdayDiary: boolean;
  streakStatus: 'current' | 'pending' | 'none';
  monthlyCount: number[];
  totalTextLength: number;
  monthlyEmotionCounts: number[][];
}
```

`currentStreak`와 `longestStreak`는 화면에 숫자로 표시된다.

`hasTodayDiary`, `hasYesterdayDiary`는 오늘/어제 일기 존재 여부다. 지금 UI에서는 직접 사용하지 않지만, 나중에 “오늘 기록 완료” 같은 뱃지나 안내문을 만들 때 사용할 수 있다.

`streakStatus`는 현재 카드 라벨을 정한다.

## 13. 서버 응답에 담기는 위치

`getDiaryStats.ts`에서는 계산된 streak를 응답에 포함한다.

```ts
return {
  ok: true,
  data: {
    totalCount: diaries.length,
    emotionCounts,
    currentStreak: daysToUnits(streak.currentStreak),
    longestStreak: daysToUnits(streak.longestStreak),
    hasTodayDiary: streak.hasTodayDiary,
    hasYesterdayDiary: streak.hasYesterdayDiary,
    streakStatus: streak.status,
    monthlyCount,
    totalTextLength,
    monthlyEmotionCounts,
  },
};
```

`daysToUnits`는 일 단위 숫자를 일/주/월 단위 객체로 바꾼다.

```ts
export const daysToUnits = (days: number) => ({
  days,
  weeks: Math.floor(days / 7),
  months: Math.floor(days / 30),
});
```

현재 홈 화면은 `days`만 사용하지만, 나중에 주/월 단위 표시가 필요할 수 있어서 이 구조가 유지되고 있다.

## 14. 홈 UI 표시

`DiaryAnalysis.tsx`는 `streakStatus`를 보고 첫 번째 카드 라벨을 결정한다.

```tsx
const currentStreak = stats?.currentStreak?.days ?? 0;
const longestStreak = stats?.longestStreak?.days ?? 0;
const currentStreakLabel = stats?.streakStatus === 'pending' ? '유지 중인 기록' : '현재 연속 기록';
const streakInfoText = stats?.streakStatus === 'pending'
  ? '* 오늘 일기를 작성하면 유지 중인 기록이 현재 연속 기록으로 이어집니다.'
  : '* 오늘 일기를 작성하면 오늘 기록까지 포함돼요.';
```

`pending`은 오늘 일기가 없고 어제까지 이어진 기록이 있는 상태다. 그래서 이때만 라벨이 `유지 중인 기록`이 된다.

그 외에는 `현재 연속 기록`으로 표시한다.

카드 부분은 아래와 같다.

```tsx
<HomeCard>
  <HomeCardLabel>{currentStreakLabel}</HomeCardLabel>
  <HomeCardValueWrapper>
    <HomeCardValue>{currentStreak}</HomeCardValue>
    <HomeCardUnit>일</HomeCardUnit>
  </HomeCardValueWrapper>
</HomeCard>
```

안내 문구는 같은 상태값을 사용한다.

```tsx
<HomeInfoText>
  {streakInfoText}
</HomeInfoText>
```

## 15. 계산 타이밍과 효율성

연속 기록은 언제 계산하느냐에 따라 정확성과 성능이 달라진다.

### 15.1 일기 생성/삭제 때만 계산

일기를 생성하거나 삭제할 때만 streak를 재계산하는 방식이다.

장점:

- 홈 조회가 빠르다.
- User 테이블에 저장된 값만 읽으면 된다.
- 쓰기 이벤트가 있을 때만 계산하므로 DB 부하가 적다.

단점:

- 날짜가 바뀌는 상황을 놓칠 수 있다.
- 예를 들어 어제까지 5일 연속이었고 오늘 아무 일기도 쓰지 않았는데, 다음 날 홈을 열면 저장된 5일이 그대로 보일 수 있다.
- 현재 streak는 “오늘이 며칠인지”에 따라 달라지는 값이므로, 쓰기 이벤트만으로는 정확성을 보장하기 어렵다.

이 방식은 streak가 날짜 변화에 민감하지 않거나, 별도 배치 작업이 있는 서비스에 더 잘 맞는다.

### 15.2 홈 조회 때마다 계산

홈 통계를 볼 때마다 visible 일기 날짜를 가져와 streak를 다시 계산하는 방식이다.

장점:

- 항상 사용자 타임존 기준 오늘/어제를 반영한다.
- 날짜가 바뀌어도 홈 조회만으로 정확한 값이 나온다.
- 별도 배치 작업이 필요 없다.

단점:

- 홈 조회마다 일기 날짜 목록을 읽어야 한다.
- 일기가 아주 많아지면 계산 비용이 늘 수 있다.

현재 프로젝트에서는 이 방식이 적절하다. 이유는 streak 계산에 필요한 데이터가 `date` 하나뿐이고, `select: { date: true }`로 최소 데이터만 조회하기 때문이다.

### 15.3 홈 조회 때 계산하고, 값이 다를 때만 저장

현재 적용한 방식이다.

흐름은 아래와 같다.

1. 홈 조회 시 일기 날짜만 가져와 streak를 계산한다.
2. User 테이블에 저장된 `currentStreakDays`, `longestStreakDays`와 비교한다.
3. 값이 다르면 User 테이블을 업데이트한다.
4. 값이 같으면 업데이트하지 않는다.

장점:

- 날짜 변화에 따른 정확성을 확보한다.
- 매번 User 업데이트를 하지 않는다.
- 저장된 streak 값도 최신 상태에 가깝게 유지된다.

단점:

- 홈 조회마다 날짜 조회는 발생한다.
- 사용자가 매우 많은 서비스라면 최적화가 더 필요할 수 있다.

### 15.4 배치 작업으로 매일 계산

매일 자정 이후 전체 사용자의 streak를 다시 계산하는 방식이다.

장점:

- 홈 조회가 빠르다.
- 날짜 변경에 따른 만료 처리를 중앙에서 할 수 있다.

단점:

- 배치 인프라가 필요하다.
- 사용자 타임존이 다르면 자정 기준이 사용자마다 다르다.
- 작은 프로젝트에서는 운영 복잡도가 커진다.

현재 프로젝트에서는 과한 방식이다.

### 15.5 현재 선택한 방식

현재는 `홈 조회 때 계산하고, 값이 다를 때만 저장`하는 방식을 선택했다.

이유는 아래와 같다.

1. 홈 화면에서 streak는 중요한 정보라 정확성이 우선이다.
2. 날짜 변경으로 streak가 바뀌는 문제를 자연스럽게 해결할 수 있다.
3. 조회 데이터가 일기 날짜뿐이라 계산 비용이 비교적 작다.
4. 값이 같으면 User 업데이트를 하지 않으므로 불필요한 쓰기 비용을 줄인다.
5. 별도 배치 작업 없이도 사용자 타임존 기준 계산을 유지할 수 있다.

## 16. 시간 복잡도

사용자의 visible 일기 날짜 수를 `n`이라고 하면, 계산은 대략 아래 비용을 가진다.

1. 날짜 중복 제거: `O(n)`
2. 정렬: `O(n log n)`
3. 현재 streak 계산: 최악 `O(n)`
4. 최장 streak 계산: `O(n)`

전체적으로는 정렬 때문에 `O(n log n)`이다.

일기 앱에서 사용자 한 명의 일기 수가 수백 개에서 수천 개 수준이라면 충분히 감당 가능한 비용이다. 나중에 데이터가 커지면 아래 최적화를 고려할 수 있다.

1. DB에서 `orderBy: { date: 'asc' }`를 사용해서 정렬 비용을 줄이는 방향 검토
2. User 테이블에 `streakComputedAtDate` 같은 필드를 추가해서 같은 날짜에는 재계산 생략
3. 월별/연도별이 아닌 streak 계산 전용 날짜 테이블 또는 인덱스 최적화
4. 사용자가 홈을 매우 자주 여는 경우 React Query staleTime과 서버 캐시 전략 조정

## 17. 주의할 점

연속 기록은 단순히 날짜 개수를 세는 기능이 아니다. 오늘이라는 기준점이 계속 바뀌기 때문에 캐시만 믿으면 틀릴 수 있다.

특히 아래 케이스를 꼭 기억해야 한다.

1. 오늘 일기가 있으면 오늘 포함
2. 오늘 일기가 없고 어제 일기가 있으면 유지 중
3. 오늘도 어제도 없으면 현재 기록 없음
4. 최장 기록은 오늘 포함 전체 날짜 중 가장 긴 구간
5. visible이 false인 일기는 계산에서 제외
6. 사용자 타임존 기준 오늘을 사용

이 기준이 흔들리면 UI 문구와 실제 숫자가 어긋난다.

## 18. 테스트할 케이스

수동 또는 자동 테스트를 만든다면 아래 케이스를 확인해야 한다.

| 날짜 목록 | 오늘 | 예상 status | 예상 current | 예상 longest |
| --- | --- | --- | --- | --- |
| 없음 | 2026-06-21 | none | 0 | 0 |
| 2026-06-21 | 2026-06-21 | current | 1 | 1 |
| 2026-06-20 | 2026-06-21 | pending | 1 | 1 |
| 2026-06-20, 2026-06-21 | 2026-06-21 | current | 2 | 2 |
| 2026-06-19, 2026-06-20 | 2026-06-21 | pending | 2 | 2 |
| 2026-06-18, 2026-06-20, 2026-06-21 | 2026-06-21 | current | 2 | 2 |
| 2026-06-17, 2026-06-18, 2026-06-20 | 2026-06-21 | pending | 1 | 2 |
| 2026-06-17, 2026-06-18 | 2026-06-21 | none | 0 | 2 |

마지막 케이스가 중요하다. 최장 기록은 과거에 2일이지만, 현재 이어지는 기록은 없다. 그래서 `current`는 0이고 `longest`는 2다.
