// 연속 기록 일수별 메시지
const STREAK_STAGES: { minDays: number; message: string }[] = [
  { minDays: 0, message: '아직 연속 기록이 없어요. 오늘부터 작은 걸음으로 시작해보세요.' },
  { minDays: 1, message: '어제 일기를 쓰셨네요. 오늘도 한 줄만 남겨보면 어때요?' },
  { minDays: 2, message: '이틀 연속이에요. 습관이 잡히기 시작했어요.' },
  { minDays: 3, message: '{days}일째예요. 꾸준히 기록하는 모습이 좋아요.' },
  { minDays: 5, message: '{days}일 연속 기록 중이에요. 이대로만 가도 충분히 대단해요.' },
  { minDays: 7, message: '일 주일을 채우셨어요. {days}일 연속, 정말 잘하고 있어요.' },
  { minDays: 10, message: '{days}일째 일기를 쓰고 계시네요. 기록이 쌓일수록 소중해져요.' },
  { minDays: 14, message: '두 주를 넘겼어요. {days}일 연속 기록, 멋져요.' },
  { minDays: 20, message: '{days}일이에요. 작은 습관이 큰 차이를 만든다는 걸 보여주고 있어요.' },
  { minDays: 30, message: '한 달을 채우셨어요. {days}일 연속 기록, 정말 대단해요.' },
  { minDays: 45, message: '{days}일째예요. 이제 기록이 일상의 일부가 됐네요.' },
  { minDays: 60, message: '두 달을 넘겼어요. {days}일 연속, 놀라운 끈기예요.' },
  { minDays: 75, message: '{days}일 연속 기록 중이에요. 당신의 하루가 차곡차곡 쌓이고 있어요.' },
  { minDays: 90, message: '석 달을 채우셨어요. {days}일, 정말 멋진 성취예요.' },
  { minDays: 120, message: '{days}일째예요. 꾸준함이 만든 결과, 자랑스러워요.' },
  { minDays: 150, message: '150일을 넘겼어요. {days}일 연속 기록, 누구나 부러워할 거예요.' },
  { minDays: 180, message: '반 년을 채우셨어요. {days}일 연속, 정말 대단한 분이에요.' },
  { minDays: 270, message: '{days}일째 기록하고 계시네요. 이 정도면 습관의 달인이라 해도 돼요.' },
  { minDays: 365, message: '일 년을 채우셨어요. {days}일 연속 기록, 축하해요.' },
  { minDays: 500, message: '{days}일 연속이에요. 당신의 기록은 이제 누구보다 특별해요.' },
];

export const getStreakMessage = (days: number): string => {
  let chosen = STREAK_STAGES[0];
  for (const stage of STREAK_STAGES) {
    if (days >= stage.minDays) chosen = stage;
    else break;
  }
  return chosen.message.replace('{days}', String(days));
};
