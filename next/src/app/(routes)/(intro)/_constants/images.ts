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

// 섹션별 이미지 배열
export const SECTION_IMAGES = {
  intro: [IMG.calendar, IMG.list, IMG.list2, IMG.zoom1, IMG.zoom2, IMG.habit, IMG.habitinfo1, IMG.habitinfo2, IMG.setting, IMG.habitorder],
  view: [IMG.calendar, IMG.list, IMG.list2, IMG.zoom1],
  habit: [IMG.habitinfo1, IMG.habitinfo2],
  otherInfo: [IMG.otherinfo1, IMG.otherinfo2, IMG.otherinfo3],
  ui: [
    IMG.calendar, IMG.pc_calendar, IMG.ipad_calendar,
    IMG.list, IMG.pc_list, IMG.ipad_list,
    IMG.list2, IMG.pc_list2, IMG.ipad_list2,
    IMG.zoom1, IMG.pc_zoom1, IMG.zoom2,
    IMG.habit, IMG.pc_habit, IMG.pc_addHabit,
    IMG.habitinfo1, IMG.pc_habitinfo1,
    IMG.habitinfo2, IMG.pc_habitinfo2,
    IMG.login, IMG.pc_login, IMG.ipad_login,
    IMG.setting, IMG.pc_setting,
  ],
};
