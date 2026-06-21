# Habit Info Calculation Notes

This document summarizes the calculation rules used by `HabitInfoView`.

## Monthly Data Source

`MonthInfo` loads monthly habit completion records with:

```ts
getHabitMonthlyStatus({ id: habitId, month: format(displayDate, 'yyyy-MM') })
```

The action returns one record per completed diary date for the selected habit and month.

## Monthly Completion Count

The monthly completion count is the number of returned completion records.

```ts
const doneCount = data?.length ?? 0;
```

This value is displayed as `n월 완료`.

## Monthly Completion Rate

The monthly completion rate uses the full number of days in the selected month.

```ts
const totalDays = differenceInCalendarDays(monthEndDate, monthStartDate) + 1;
const completionRate = ((doneCount / totalDays) * 100).toFixed(1);
```

Display rule:

- Always show one decimal place.
- Round at the second decimal place through `toFixed(1)`.
- Example: `2 / 30 * 100 = 6.666...`, displayed as `6.7%`.

## Missed Completion Count

Habits can only be checked for the most recent 4-day window including today. Dates older than that are no longer editable.

```ts
const today = startOfDay(new Date());
const lastUneditableDate = subDays(today, 4);
```

The missed completion count is:

```ts
missedTargetDays - missedDoneCount
```

The final display value is guarded so it never drops below zero.

```ts
const missedCount = Math.max(missedTargetDays - missedDoneCount, 0);
```

### Past Month

If the selected month ended before today, the entire month is no longer editable.

```ts
missedTargetDays = totalDays;
missedDoneCount = doneCount;
```

### Current Month

If the selected month is the current month, only dates from the first day of the month through `lastUneditableDate` are counted.

Completed records after `lastUneditableDate` are excluded because those dates are still editable.

```ts
missedTargetDays = differenceInCalendarDays(lastUneditableDate, monthStartDate) + 1;
missedDoneCount = data?.filter(({ date }) => {
  const doneDate = startOfDay(parseISO(date));
  return !isAfter(doneDate, lastUneditableDate);
}).length ?? 0;
```

### Future Month

Future months have no missed completions.

The default values stay at `0`.

## Calendar Completion Map

The calendar receives a map keyed by `yyMMdd`.

```ts
const habitDateDataMap: { [key: string]: boolean } = {};

data?.forEach(({ date }) => {
  habitDateDataMap[format(parseISO(date), 'yyMMdd')] = true;
});
```

`renderHabitInfoPageContent` uses this boolean value to render completed days with the theme color.

## Yearly Data Source

`YearInfo` loads yearly habit completion counts with:

```ts
getHabitYearlyStatus({ id: habitId, year: format(displayDate, 'yyyy') })
```

The action returns a 12-item array. Each item is the completion count for that month.

## Yearly Completion Count

The yearly completion count is the sum of the monthly counts.

```ts
const count = data?.reduce((acc: number, cur: number) => (acc + cur), 0);
```

## Yearly Completion Rate

The yearly completion rate uses the full number of days in the selected year.

```ts
const totalDays = isLeapYear(displayDate) ? 366 : 365;
const completionRate = Math.round(((count ?? 0) / totalDays) * 100);
```

This rate is currently displayed as an integer percentage.

## Monthly Bar Chart

`MonthlyBarChart` receives the 12-item yearly data array.

The tallest bar is scaled against the highest monthly count in the selected year.

```ts
const maxCount = Math.max(...(data ?? [1]), 1);
```

Each bar height is calculated as:

```ts
data[i] > 0 ? Math.max((data[i] / maxCount) * 160, 8) : 4
```

Display rules:

- Months with completions get at least `8px` height.
- Months without completions show a `4px` inactive bar.
- The chart area uses a `200px` vertical footprint.
- The year header follows the compact calendar header pattern: previous button, current year button, next button.
