import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

const makeCalendarDates = (displayDate: Date) => {

  //displayDate를 기준으로 달력 날짜 정의
  const startDateOfMonth = startOfMonth(displayDate); //1~31
  const endDateOfMonth = endOfMonth(displayDate); //1~31
  const startDateOfWeek = startOfWeek(startDateOfMonth, { weekStartsOn: 1 });//일요일 시작 기준이라 월요일 시작 기준으로 처리 필요
  const endDateOfWeek = endOfWeek(endDateOfMonth, { weekStartsOn: 1 });


  let day = startDateOfWeek;
  const calendarDates: Array<Array<Date>> = [[]];


  while (day <= endDateOfWeek) {
    const weeksIndex = calendarDates.length - 1;
    calendarDates[weeksIndex].push(day);
    if (calendarDates[weeksIndex].length === 7) {
      calendarDates.push([]);
    }
    day = addDays(day, 1);
  }
  calendarDates.pop();

  return { calendarDates };
}

export default makeCalendarDates;