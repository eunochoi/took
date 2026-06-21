# useMutation 제거 변경 비교

## 목표

서버 액션으로 이미 옮겨진 생성, 수정, 삭제, 체크 액션을 `useMutation`으로 한 번 더 감싸지 않고 필요한 컴포넌트에서 직접 호출하도록 정리했다.

기존 흐름:

```text
컴포넌트
-> useSubmitDiary / useSubmitHabit / useHabitAction
-> useMutation
-> authAction
-> server action
```

변경 후 흐름:

```text
컴포넌트
-> authAction
-> server action
```

조회 캐시 관리는 계속 React Query를 사용한다. 이번 변경은 서버 상태 조회용 `useQuery` 제거가 아니라, 서버 액션 실행을 위한 `useMutation` 래핑 제거다.

## 전체 변경 요약

제거된 `useMutation` 호출은 총 8개다.

- 습관 생성: `createHabit`
- 습관 수정: `updateHabit`
- 습관 체크: `checkHabit`
- 습관 체크 해제: `uncheckHabit`
- 습관 삭제: `deleteHabit`
- 일기 생성: `createDiary`
- 일기 수정: `updateDiary`
- 일기 삭제: `deleteDiary`

삭제된 커스텀 훅 파일은 3개다.

- `next/src/common/components/views/HabitInputView/utils/useSubmitHabit.ts`
- `next/src/common/components/views/DiaryInputView/hooks/useSubmitDiary.ts`
- `next/src/app/(routes)/(app)/habit/_components/HabitBox/utils/useHabitAction.ts`

## HabitInputView

### 이전 코드

`HabitInputView`는 직접 서버 액션을 알지 못하고, `useSubmitHabit` 훅에서 만들어진 mutation 객체를 받아서 실행했다.

```tsx
const { addHabit, editHabit } = useSubmitHabit();
const onMutation = isEdit ? editHabit : addHabit;

const onSubmit = () => {
  if (habitName.length > 0 && habitName.length <= 10) {
    if (isEdit && habitId) onMutation.mutate({ habitId, habitName, priority });
    else onMutation.mutate({ habitName, priority });
  }
  else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.', { variant: 'info' });
};
```

실제 서버 액션 호출, 캐시 갱신, 뒤로가기, snackbar 처리는 `useSubmitHabit` 안에 있었다.

```tsx
const addHabit = useMutation({
  mutationFn: ({ habitName, priority }: HabitProps) => authAction(() => createHabit({ habitName, priority })),
  onSuccess: () => {
    handleSuccess('습관 항목 생성 완료');
  },
  onError: () => {
    handleError('습관 항목 생성 실패');
  },
});
```

### 변경 후 코드

이제 `HabitInputView`에서 필요한 서버 액션을 직접 호출한다.

```tsx
const onSubmit = async () => {
  if (habitName.length > 0 && habitName.length <= 10) {
    const successMessage = isEdit ? '습관 항목 수정 완료' : '습관 항목 생성 완료';
    const errorMessage = isEdit ? '습관 항목 수정 실패' : '습관 항목 생성 실패';

    try {
      if (isEdit && habitId) {
        await authAction(() => updateHabit({ habitId, habitName, priority }));
      }
      else {
        await authAction(() => createHabit({ habitName, priority }));
      }

      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      router.back();
      setTimeout(() => enqueueSnackbar(successMessage, { variant: 'success' }), 300);
    } catch (error) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  }
  else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.', { variant: 'info' });
};
```

서버 액션 호출, 캐시 무효화, 화면 이동, 알림 표시가 한 함수 안에 모여서 제출 흐름을 한 파일에서 읽을 수 있다.

## DiaryInputView

### 이전 코드

일기 입력은 이미지 업로드 후 `submitAction.mutate`를 호출했다.

```tsx
const { addDiary, editDiary } = useSubmitDiary();
const submitAction = isEdit ? editDiary : addDiary;

if (isEdit && diaryId) {
  submitAction.mutate({ text, images: finalImages, diaryId, emotion });
} else {
  submitAction.mutate({ date, text, images: finalImages, emotion });
}
```

이미지 영역 로딩 상태도 mutation 객체의 `isPending`에 의존했다.

```tsx
<DiaryInputImages
  imageUploadRef={imageUploadRef}
  images={images}
  setImages={setImages}
  isLoading={submitAction.isPending}
/>
```

### 변경 후 코드

이미지 업로드와 일기 저장이 하나의 `try/catch/finally` 흐름 안에서 이어진다.

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async () => {
  if (isSubmitting) return;

  try {
    setIsSubmitting(true);

    const fileImages = images.filter((img): img is File => img instanceof File);
    const stringImages = images.filter((img): img is string => typeof img === 'string');

    let uploadedImageUrls: string[] = [];

    if (fileImages.length > 0) {
      const imageFormData = new FormData();
      fileImages.forEach(file => {
        imageFormData.append("image", file);
      });

      uploadedImageUrls = await authAction(() => uploadImages(imageFormData));
    }

    const finalImages = [...stringImages, ...uploadedImageUrls];

    const diaryData = isEdit && diaryId
      ? await authAction(() => updateDiary({ text, images: finalImages, diaryId, emotion }))
      : await authAction(() => createDiary({ date, text, images: finalImages, emotion }));

    queryClient.setQueryData(['diary', 'date', diaryData.date], diaryData);
    queryClient.setQueryData(['diary', 'id', String(diaryData.id)], diaryData);

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['diary', 'month'] }),
      queryClient.invalidateQueries({ queryKey: ['diary', 'list'] }),
      queryClient.invalidateQueries({ queryKey: ['stats'] }),
    ]);

    router.back();
    setTimeout(() => {
      enqueueSnackbar(isEdit ? '일기 수정 완료' : '일기 작성 완료', { variant: 'success' });
    }, 300);
  } catch (error) {
    console.error('일기 저장 실패:', error);
    enqueueSnackbar(isEdit ? '일기 수정 실패' : '일기 작성 실패', { variant: 'error' });
  } finally {
    setIsSubmitting(false);
  }
};
```

`submitAction.isPending`은 로컬 상태로 대체했다.

```tsx
<DiaryInputImages
  imageUploadRef={imageUploadRef}
  images={images}
  setImages={setImages}
  isLoading={isSubmitting}
/>
```

## HabitBox

### 이전 코드

`HabitBox`는 `useHabitAction`에서 세 mutation을 받아왔다.

```tsx
const { checkHabit, uncheckHabit, deleteHabit } = useHabitAction();
```

체크 변경은 mutation 객체를 통해 실행했다.

```tsx
const habitToggle = (e: ChangeEvent<HTMLInputElement>, dateString: string) => {
  if (e.currentTarget.checked === true) {
    checkHabit.mutate({ habitId: id, date: dateString });
  }
  else {
    uncheckHabit.mutate({ habitId: id, date: dateString });
  }
};
```

### 변경 후 코드

`HabitBox`에서 서버 액션을 직접 호출하고, 성공하면 기존처럼 캐시를 무효화한다.

```tsx
const habitToggle = async (e: ChangeEvent<HTMLInputElement>, dateString: string) => {
  try {
    if (e.currentTarget.checked === true) {
      await authAction(() => checkHabitAction({ habitId: id, date: dateString }));
      console.log('chack habit success');
    }
    else {
      await authAction(() => uncheckHabitAction({ habitId: id, date: dateString }));
      console.log('unchack habit success');
    }

    queryClient.invalidateQueries({ queryKey: ['habits'] });
    queryClient.invalidateQueries({ queryKey: ['habit'] });
  } catch (error) {
    enqueueSnackbar(error instanceof Error ? error.message : '습관 체크 변경 실패', { variant: 'error' });
    console.log('uncheck habit error');
  }
};
```

삭제도 확인 버튼에서 바로 처리한다.

```tsx
yesAction={async () => {
  closeSnackbar('deleteHabit');
  try {
    await authAction(() => deleteHabitAction({ habitId: id }));
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    queryClient.invalidateQueries({ queryKey: ['habit'] });
    console.log('delete habit success');
    enqueueSnackbar('습관 항목 삭제 완료', { variant: 'success' });
  } catch (error) {
    enqueueSnackbar(error instanceof Error ? error.message : '습관 항목 삭제 실패', { variant: 'error' });
    console.log('delete habit error');
  }
}}
```

`useHabitAction`은 `HabitBox`에서만 쓰였기 때문에 별도 훅으로 분리할 실익이 작았다. 변경 후에는 체크, 체크 해제, 삭제 흐름을 같은 파일에서 읽을 수 있다.

## DiaryMenus

### 이전 코드

`DiaryMenus`는 파일 안에서 바로 `useMutation`을 만들었다.

```tsx
const deleteDiaryMutation = useMutation({
  mutationFn: async ({ id }: { id: number }) => {
    await authAction(() => deleteDiary({ id }));
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['diary'] });
    queryClient.invalidateQueries({ queryKey: ['stats'] });
    console.log('success delete diary');
    closeSnackbar('diaryDelete');
    enqueueSnackbar('일기 삭제 완료', { variant: 'success' });
  },
  onError: (error: Error) => {
    enqueueSnackbar(error.message || '일기 삭제 실패', { variant: 'error' });
    console.log('delete diary error');
  },
});
```

### 변경 후 코드

삭제 확인 버튼에서 바로 서버 액션을 호출한다.

```tsx
yesAction={async () => {
  closeSnackbar('diaryDelete');
  try {
    await authAction(() => deleteDiary({ id: diaryData.id }));
    queryClient.invalidateQueries({ queryKey: ['diary'] });
    queryClient.invalidateQueries({ queryKey: ['stats'] });
    console.log('success delete diary');
    enqueueSnackbar('일기 삭제 완료', { variant: 'success' });
  } catch (error) {
    enqueueSnackbar(error instanceof Error ? error.message : '일기 삭제 실패', { variant: 'error' });
    console.log('delete diary error');
  }
}}
```

## 간결해진 부분

변경 전 대상 파일과 훅의 총 라인 수는 약 1092줄이었다. 변경 후 주요 컴포넌트 4개의 총 라인 수는 약 949줄이고, 훅 파일 3개는 삭제되었다.

라인 수 기준 순감소는 약 143줄이다. 더 큰 변화는 파일 이동 비용이 줄었다는 점이다.

예전에는 일기 저장 흐름을 이해하려면 아래 두 파일을 함께 봐야 했다.

```text
DiaryInputView/index.tsx
DiaryInputView/hooks/useSubmitDiary.ts
```

이제는 아래 한 파일에서 흐름을 볼 수 있다.

```text
DiaryInputView/index.tsx
```

## 유지한 것

다음 동작은 기존과 동일하게 유지했다.

- `authAction`을 통한 인증 오류 처리와 access token refresh
- 성공 후 관련 React Query 캐시 무효화
- 일기 저장 후 `setQueryData`로 상세 캐시 즉시 반영
- 저장/삭제 성공 snackbar
- 실패 snackbar
- 모달 저장 후 `router.back()`
- 조회용 `useQuery`

## 주의할 점

`useMutation`을 제거하면서 mutation이 자동으로 제공하던 상태값은 사라졌다. 현재 상태값이 필요했던 곳은 일기 입력의 이미지 영역뿐이어서 `isSubmitting` state로 대체했다.

습관 체크/해제는 아직 낙관적 업데이트를 사용하지 않는다. 기존에도 mutation 성공 후 invalidate하는 방식이었으므로 이번 변경에서는 동작을 유지했다.
