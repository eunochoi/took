'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitCount, HabitStats, YearParams } from './types';
import { createAuthErrorResult, createServerErrorResult, getYearRange } from './utils';

export const getHabitStats = async ({ year }: YearParams): Promise<ActionResult<HabitStats>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const { startDate, endDate } = getYearRange(year);
    const [totalHabits, allHabits, diaries] = await Promise.all([
      prisma.habit.count({ where: { email: auth.email } }),
      prisma.habit.findMany({
        where: { email: auth.email },
        select: {
          id: true,
          name: true,
          priority: true,
        },
      }),
      prisma.diary.findMany({
        where: {
          email: auth.email,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          visible: true,
          date: true,
          diaryHabits: {
            select: {
              habit: {
                select: {
                  id: true,
                  name: true,
                  priority: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const habitCounts: Record<number, HabitCount> = {};
    allHabits.forEach((habit) => {
      habitCounts[habit.id] = {
        id: habit.id,
        name: habit.name,
        priority: habit.priority,
        count: 0,
      };
    });

    let totalHabitCompletions = 0;
    let visibleDiariesWithHabits = 0;
    let totalHabitsInDiariesWithHabits = 0;
    const habitCompletionDates = new Set<string>();

    diaries.forEach((diary) => {
      const habits = diary.diaryHabits.map(({ habit }) => habit);
      if (habits.length > 0) {
        const habitCount = habits.length;

        if (diary.visible) {
          visibleDiariesWithHabits += 1;
          totalHabitsInDiariesWithHabits += habitCount;
        }

        habitCompletionDates.add(diary.date);
        habits.forEach((habit) => {
          totalHabitCompletions += 1;
          if (habitCounts[habit.id]) {
            habitCounts[habit.id].count += 1;
          }
        });
      }
    });

    const sortedHabits = Object.values(habitCounts).sort((a, b) => b.count - a.count);
    const topHabits = sortedHabits.slice(0, 5);
    const bottomHabits = sortedHabits.length > 5
      ? sortedHabits.slice(-5).reverse()
      : sortedHabits.slice().reverse();

    const visibleDiaries = diaries.filter((diary) => diary.visible).length;
    const avgHabitsPerDiaryWithHabits = visibleDiariesWithHabits > 0
      ? Number((totalHabitsInDiariesWithHabits / visibleDiariesWithHabits).toFixed(1))
      : 0;
    const avgHabitsPerCompletionDay = habitCompletionDates.size > 0
      ? Number((totalHabitCompletions / habitCompletionDates.size).toFixed(1))
      : 0;

    return {
      ok: true,
      data: {
        topHabits,
        bottomHabits,
        totalCompletions: totalHabitCompletions,
        diariesWithHabits: visibleDiariesWithHabits,
        totalDiaries: visibleDiaries,
        habitCompletionDays: habitCompletionDates.size,
        avgHabitsPerDiaryWithHabits,
        avgHabitsPerCompletionDay,
        totalHabits,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_YEAR') {
      return { ok: false, code: 'INVALID_YEAR', message: 'year는 1900~2100 사이의 유효한 연도여야 합니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
