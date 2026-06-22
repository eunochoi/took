// 인트로 페이지 이미지 경로
export const INTRO_IMAGES = {
  // 모바일 스크린샷
  calendar: '/img/intro/calendar.png',
  list: '/img/intro/list.png',
  list2: '/img/intro/list2.png',
  zoom1: '/img/intro/zoom1.png',
  zoom2: '/img/intro/zoom2.png',
  habit: '/img/intro/habit.png',
  habitinfo1: '/img/intro/habitinfo1.png',
  habitinfo2: '/img/intro/habitinfo2.png',
  setting: '/img/intro/setting.png',
  habitorder: '/img/intro/habitorder.png',
  habitbox: '/img/intro/habitbox.png',
  login: '/img/intro/login.png',
  otherinfo1: '/img/intro/otherinfo1.png',
  otherinfo2: '/img/intro/otherinfo2.png',
  otherinfo3: '/img/intro/otherinfo3.png',

  // PC 스크린샷
  pc_calendar: '/img/intro/pc_calendar.png',
  pc_list: '/img/intro/pc_list.png',
  pc_list2: '/img/intro/pc_list2.png',
  pc_zoom1: '/img/intro/pc_zoom1.png',
  pc_habit: '/img/intro/pc_habit.png',
  pc_addHabit: '/img/intro/pc_addHabit.png',
  pc_habitinfo1: '/img/intro/pc_habitinfo1.png',
  pc_habitinfo2: '/img/intro/pc_habitinfo2.png',
  pc_setting: '/img/intro/pc_setting.png',
  pc_login: '/img/intro/pc_login.png',

  // iPad 스크린샷
  ipad_calendar: '/img/intro/ipad_calendar.png',
  ipad_list: '/img/intro/ipad_list.png',
  ipad_list2: '/img/intro/ipad_list2.png',
  ipad_login: '/img/intro/ipad_login.png',

  // 기타
  emotions: '/img/emotion/emotions.png',
};

const IMG = INTRO_IMAGES;

export const IMAGE_ALT_TEXT: Record<string, string> = {
  [IMG.calendar]: '달력 화면',
  [IMG.list]: '일기 리스트 화면',
  [IMG.list2]: '감정 필터 리스트 화면',
  [IMG.zoom1]: '일기 확대 화면',
  [IMG.zoom2]: '이미지 확대 화면',
  [IMG.habit]: '습관 관리 화면',
  [IMG.habitinfo1]: '월간 습관 정보 화면',
  [IMG.habitinfo2]: '연간 습관 정보 화면',
  [IMG.setting]: '설정 화면',
  [IMG.habitorder]: '습관 순서 변경 화면',
  [IMG.habitbox]: '습관 체크 박스 화면',
  [IMG.login]: '로그인 화면',
  [IMG.otherinfo1]: '부가 정보 화면',
  [IMG.otherinfo2]: '부가 정보 상세 화면',
  [IMG.otherinfo3]: '부가 통계 화면',
  [IMG.pc_calendar]: 'PC 달력 화면',
  [IMG.pc_list]: 'PC 일기 리스트 화면',
  [IMG.pc_list2]: 'PC 감정 필터 리스트 화면',
  [IMG.pc_zoom1]: 'PC 일기 확대 화면',
  [IMG.pc_habit]: 'PC 습관 관리 화면',
  [IMG.pc_addHabit]: 'PC 습관 추가 화면',
  [IMG.pc_habitinfo1]: 'PC 월간 습관 정보 화면',
  [IMG.pc_habitinfo2]: 'PC 연간 습관 정보 화면',
  [IMG.pc_setting]: 'PC 설정 화면',
  [IMG.pc_login]: 'PC 로그인 화면',
  [IMG.ipad_calendar]: '태블릿 달력 화면',
  [IMG.ipad_list]: '태블릿 일기 리스트 화면',
  [IMG.ipad_list2]: '태블릿 감정 필터 리스트 화면',
  [IMG.ipad_login]: '태블릿 로그인 화면',
  [IMG.emotions]: '감정 선택 화면',
};
