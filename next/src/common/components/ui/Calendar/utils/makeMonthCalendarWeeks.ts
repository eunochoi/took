import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

// 달력 화면 한 장에 필요한 주 단위 날짜 배열을 만든다.
// visibleMonth의 첫 주 월요일부터 마지막 주 일요일까지 포함한다.
const makeMonthCalendarWeeks = (visibleMonth: Date): Date[][] => {
  const startDateOfMonth = startOfMonth(visibleMonth);
  const endDateOfMonth = endOfMonth(visibleMonth);
  const startDateOfWeek = startOfWeek(startDateOfMonth, { weekStartsOn: 1 });
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

  return calendarDates;
}

export default makeMonthCalendarWeeks;
