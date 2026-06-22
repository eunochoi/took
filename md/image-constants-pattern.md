# 이미지 상수화 패턴

## 왜 이 패턴을 쓰는가

이미지를 JSX 안에서 바로 문자열로 쓰면 페이지가 커질수록 관리가 어려워진다.

```tsx
<Image src="/img/intro/calendar.png" alt="달력 화면" />
<Image src="/img/intro/list.png" alt="리스트 화면" />
```

이 방식은 처음에는 단순하지만, 같은 이미지를 여러 곳에서 다시 쓰거나 이미지 경로를 바꿀 때 실수하기 쉽다.
또 `alt` 텍스트도 컴포넌트마다 제각각 쓰게 된다.

그래서 이미지 경로, 섹션별 이미지 묶음, alt 텍스트를 한 파일에서 관리하는 패턴을 사용한다.

## 기본 구조

현재 인트로 페이지는 아래처럼 구성되어 있다.

```ts
export const INTRO_IMAGES = {
  calendar: '/img/intro/calendar.png',
  list: '/img/intro/list.png',
  habit: '/img/intro/habit.png',
  pc_calendar: '/img/intro/pc_calendar.png',
};

const IMG = INTRO_IMAGES;

export const SECTION_IMAGES = {
  intro: [IMG.calendar, IMG.list, IMG.habit],
  desktop: [IMG.pc_calendar],
};

export const IMAGE_ALT_TEXT: Record<string, string> = {
  [IMG.calendar]: '달력 화면',
  [IMG.list]: '일기 리스트 화면',
  [IMG.habit]: '습관 관리 화면',
  [IMG.pc_calendar]: 'PC 달력 화면',
};
```

역할은 세 가지다.

- `INTRO_IMAGES`: 이미지 경로를 이름으로 관리한다.
- `SECTION_IMAGES`: 여러 이미지를 화면 섹션 단위로 묶는다.
- `IMAGE_ALT_TEXT`: 이미지 경로별 대체 텍스트를 관리한다.

## `INTRO_IMAGES`

`INTRO_IMAGES`는 이미지 경로 사전이다.

```ts
export const INTRO_IMAGES = {
  calendar: '/img/intro/calendar.png',
  list: '/img/intro/list.png',
};
```

컴포넌트에서는 문자열 경로 대신 이름을 사용한다.

```tsx
<Image src={INTRO_IMAGES.calendar} alt="달력 화면" />
```

이렇게 하면 `/img/intro/calendar.png` 경로가 바뀌어도 상수 파일 한 곳만 수정하면 된다.

## `const IMG = INTRO_IMAGES`

섹션 배열을 만들 때 `INTRO_IMAGES.calendar`를 계속 쓰면 코드가 길어진다.

```ts
export const SECTION_IMAGES = {
  intro: [
    INTRO_IMAGES.calendar,
    INTRO_IMAGES.list,
    INTRO_IMAGES.habit,
  ],
};
```

그래서 짧은 alias를 둔다.

```ts
const IMG = INTRO_IMAGES;

export const SECTION_IMAGES = {
  intro: [IMG.calendar, IMG.list, IMG.habit],
};
```

기능 차이는 없다. 읽기 쉽게 만들기 위한 별칭이다.

## `SECTION_IMAGES`

`SECTION_IMAGES`는 이미지를 사용 목적별로 묶는 배열이다.

```ts
export const SECTION_IMAGES = {
  record: [IMG.calendar, IMG.list, IMG.list2, IMG.zoom1],
  habit: [IMG.habit, IMG.habitbox, IMG.habitinfo1, IMG.habitinfo2],
};
```

이렇게 해두면 컴포넌트에서는 섹션 이름만 보고 어떤 이미지 묶음인지 알 수 있다.

```tsx
<IntroImageCarousel images={SECTION_IMAGES.record} />
```

이미지 개수를 바꾸고 싶을 때도 JSX를 수정하지 않고 배열만 수정하면 된다.

## `IMAGE_ALT_TEXT`

`IMAGE_ALT_TEXT`는 이미지별 접근성 문구를 관리한다.

```ts
export const IMAGE_ALT_TEXT: Record<string, string> = {
  [IMG.calendar]: '달력 화면',
  [IMG.list]: '일기 리스트 화면',
};
```

여기서 key는 이미지 경로다.

```ts
[IMG.calendar]: '달력 화면'
```

이 문법은 계산된 속성 이름이다. 실제로는 아래와 같은 객체가 된다.

```ts
{
  '/img/intro/calendar.png': '달력 화면'
}
```

그래서 컴포넌트에서는 이미지 경로로 alt 텍스트를 찾을 수 있다.

```tsx
alt={`${IMAGE_ALT_TEXT[src] ?? '앱 화면'} 미리보기`}
```

`?? '앱 화면'`은 혹시 alt 텍스트를 등록하지 않은 이미지가 있어도 기본 문구를 쓰기 위한 안전장치다.

## 공통 이미지 컴포넌트

이미지 배열을 여러 곳에서 반복 렌더링하면 JSX가 길어진다.
그래서 현재 인트로 페이지는 `IntroImageCarousel` 같은 공통 컴포넌트를 사용한다.

```tsx
interface IntroImageCarouselProps {
  images: string[];
  height?: number;
  priorityFirst?: boolean;
  sizes: string;
}
```

사용 예시는 다음과 같다.

```tsx
<IntroImageCarousel
  images={RECORD_IMAGES}
  height={420}
  sizes="86vw"
/>
```

컴포넌트 내부에서는 배열을 순회한다.

```tsx
{images.map((src, index) => (
  <Image
    key={src}
    src={src}
    alt={`${IMAGE_ALT_TEXT[src] ?? 'TOOK 앱 화면'} 미리보기`}
    priority={priorityFirst && index === 0}
  />
))}
```

이렇게 하면 어떤 섹션이든 이미지 배열만 넘기면 같은 방식으로 렌더링할 수 있다.

## `priorityFirst`

Next Image의 `priority`는 첫 화면에서 반드시 빨리 보여야 하는 이미지에만 사용한다.

```tsx
priority={priorityFirst && index === 0}
```

이 코드는 `priorityFirst`가 `true`이고 첫 번째 이미지일 때만 `priority`를 켠다.

모든 이미지에 `priority`를 주면 초기 로딩이 무거워질 수 있다.
보통 히어로 섹션의 첫 번째 이미지에만 사용한다.

## 새 페이지에서 따라 쓰는 순서

1. 사용할 이미지 파일을 `public/img/...` 아래에 넣는다.
2. `_constants/images.ts` 같은 파일을 만든다.
3. 이미지 경로를 `PAGE_IMAGES` 객체에 모은다.
4. 자주 같이 쓰는 이미지들을 `SECTION_IMAGES` 배열로 묶는다.
5. 이미지별 `IMAGE_ALT_TEXT`를 작성한다.
6. 컴포넌트에서는 문자열 경로 대신 상수와 배열을 사용한다.
7. 이미지 렌더링 방식이 반복되면 공통 컴포넌트로 뺀다.

예시:

```ts
export const PRODUCT_IMAGES = {
  main: '/img/product/main.png',
  detail: '/img/product/detail.png',
  dashboard: '/img/product/dashboard.png',
};

const IMG = PRODUCT_IMAGES;

export const PRODUCT_SECTION_IMAGES = {
  hero: [IMG.main, IMG.dashboard],
  detail: [IMG.detail, IMG.dashboard],
};

export const PRODUCT_IMAGE_ALT_TEXT: Record<string, string> = {
  [IMG.main]: '제품 메인 화면',
  [IMG.detail]: '제품 상세 화면',
  [IMG.dashboard]: '제품 대시보드 화면',
};
```

## 이 패턴이 좋은 경우

- 이미지가 여러 개 이상이다.
- 같은 이미지를 여러 섹션에서 재사용한다.
- 섹션별로 이미지 묶음을 바꿀 일이 있다.
- alt 텍스트를 일관되게 관리하고 싶다.
- 캐러셀, 갤러리, 소개 페이지처럼 배열 렌더링이 많다.

## 과하게 쓰지 않아도 되는 경우

이미지가 한두 개뿐이고 한 컴포넌트에서만 쓰인다면 바로 써도 괜찮다.

```tsx
<Image src="/img/logo.png" alt="서비스 로고" />
```

상수화는 관리 포인트를 줄이기 위한 도구다. 코드가 더 복잡해질 정도로 작은 경우에는 억지로 적용하지 않아도 된다.

## 장점 요약

- 이미지 경로 수정이 쉽다.
- JSX가 짧아진다.
- 섹션별 이미지 구성이 명확하다.
- alt 텍스트를 한 곳에서 관리할 수 있다.
- 캐러셀이나 갤러리 컴포넌트와 잘 맞는다.

## 기억할 점

이미지 상수화 패턴의 핵심은 “이미지를 데이터처럼 다루는 것”이다.

컴포넌트는 화면을 그리는 일에 집중하고, 어떤 이미지를 쓸지는 상수 파일이 담당한다.
이렇게 역할을 나누면 나중에 이미지가 늘어나도 구조가 덜 흔들린다.
