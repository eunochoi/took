const express = require("express");
const db = require("../models/index.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const { getOrComputeStreak } = require('../function/computeStreaks.js');
const decrypt = require('../function/decrypt.js');
const { getYearRange } = require('../function/dateHelper.js');
const { sendError } = require('../utils/errorResponse.js');

const Op = db.Sequelize.Op;
const router = express.Router();
const Diary = db.Diary;
const Habit = db.Habit;

const daysToUnits = (days) => ({
  days,
  weeks: Math.floor(days / 7),
  months: Math.floor(days / 30)
});

/**
 * 용도: 유저가 일기 쓴 연도 목록 조회 (visible 일기 기준).
 * 요청: tokenCheck
 * 반환: 200 number[] (연도 내림차순)
 */
router.get("/years", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /stats/years -----');
  const email = req.currentUserEmail;

  try {
    const diaries = await Diary.findAll({
      where: { email, visible: true },
      attributes: ['date']
    });
    const years = [...new Set(diaries.map(d => parseInt(d.date.split('-')[0], 10)))].sort((a, b) => b - a);
    return res.status(200).json(years);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
});

/**
 * 용도: 해당 연도 일기 통계. 총 개수, 감정 분포, 스트릭, 월별·감정별 집계, 총 글자 수.
 * 요청: params year(string 'yyyy' 또는 number), tokenCheck
 * 반환: 200 { totalCount, emotionCounts, currentStreak, longestStreak, monthlyCount, totalTextLength, monthlyEmotionCounts } / 404 유저 없음
 */
router.get("/diary/:year", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /stats/diary/:year -----');
  const email = req.currentUserEmail;
  const year = parseInt(req.params.year, 10);

  if (!Number.isFinite(year) || year < 1900 || year > 2100) {
    return sendError(res, 400, 'year는 1900~2100 사이의 유효한 연도여야 합니다.');
  }
  try {
    const { startDate, endDate } = getYearRange(year);
    const diaries = await Diary.findAll({
      where: {
        email,
        visible: true,
        date: { [Op.between]: [startDate, endDate] }
      },
      attributes: ['date', 'emotion', 'text'],
      order: [['date', 'ASC']]
    });
    const streak = await getOrComputeStreak(email);
    if (!streak) {
      return sendError(res, 404, '유저를 찾을 수 없습니다.');
    }

    if (diaries.length === 0) {
      return res.status(200).json({
        totalCount: 0,
        emotionCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        currentStreak: daysToUnits(streak.currentStreak),
        longestStreak: daysToUnits(streak.longestStreak),
        monthlyCount: Array(12).fill(0),
        totalTextLength: 0,
        monthlyEmotionCounts: Array(12).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      });
    }
    const emotionCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyCount = Array(12).fill(0);
    const monthlyEmotionCounts = Array(12).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let totalTextLength = 0;

    diaries.forEach(d => {
      if (d.emotion >= 0 && d.emotion <= 9) {
        emotionCounts[d.emotion]++;
      }
      const month = parseInt(d.date.split('-')[1], 10) - 1;
      monthlyCount[month]++;
      if (d.emotion >= 0 && d.emotion <= 9) {
        monthlyEmotionCounts[month][d.emotion]++;
      }
      try {
        const decryptedText = decrypt(d.text, process.env.DATA_SECRET_KEY);
        totalTextLength += decryptedText.length;
      } catch (e) {
        console.error('Failed to decrypt text:', e);
      }
    });

    return res.status(200).json({
      totalCount: diaries.length,
      emotionCounts,
      currentStreak: daysToUnits(streak.currentStreak),
      longestStreak: daysToUnits(streak.longestStreak),
      monthlyCount,
      totalTextLength,
      monthlyEmotionCounts
    });
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
});

/**
 * 용도: 해당 연도 습관 통계. 상위/하위 습관, 완료 횟수, 일기·습관 연동 집계 등.
 * 요청: params year(string 'yyyy' 또는 number), tokenCheck
 * 반환: 200 { topHabits, bottomHabits, totalCompletions, diariesWithHabits, totalDiaries, habitCompletionDays, avgHabitsPerDiaryWithHabits, avgHabitsPerCompletionDay, totalHabits }
 */
router.get("/habit/:year", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /stats/habit/:year -----');
  const email = req.currentUserEmail;
  const year = parseInt(req.params.year, 10);

  if (!Number.isFinite(year) || year < 1900 || year > 2100) {
    return sendError(res, 400, 'year는 1900~2100 사이의 유효한 연도여야 합니다.');
  }
  try {
    const { startDate, endDate } = getYearRange(year);
    const totalHabits = await Habit.count({ where: { email } });
    const allHabits = await Habit.findAll({
      where: { email },
      attributes: ['id', 'name', 'priority']
    });

    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [startDate, endDate] }
      },
      attributes: ['id', 'visible', 'date'],
      include: [{
        model: Habit,
        attributes: ['id', 'name', 'priority'],
        through: { attributes: [] }
      }]
    });
    const habitCounts = {};
    allHabits.forEach(habit => {
      habitCounts[habit.id] = { id: habit.id, name: habit.name, priority: habit.priority, count: 0 };
    });

    let totalHabitCompletions = 0;
    let visibleDiariesWithHabits = 0;
    let totalHabitsInDiariesWithHabits = 0;
    const habitCompletionDates = new Set();
    diaries.forEach(diary => {
      if (diary.Habits && diary.Habits.length > 0) {
        const habitCount = diary.Habits.length;
        if (diary.visible) {
          visibleDiariesWithHabits++;
          totalHabitsInDiariesWithHabits += habitCount;
        }
        habitCompletionDates.add(diary.date);

        diary.Habits.forEach(habit => {
          totalHabitCompletions++;
          if (habitCounts[habit.id]) {
            habitCounts[habit.id].count++;
          }
        });
      }
    });
    const sortedHabits = Object.values(habitCounts).sort((a, b) => b.count - a.count);
    const topHabits = sortedHabits.slice(0, 5);
    const bottomHabits = sortedHabits.length > 5
      ? sortedHabits.slice(-5).reverse()
      : sortedHabits.slice().reverse();

    const visibleDiaries = diaries.filter(d => d.visible).length;
    const avgHabitsPerDiaryWithHabits = visibleDiariesWithHabits > 0
      ? (totalHabitsInDiariesWithHabits / visibleDiariesWithHabits).toFixed(1)
      : 0;
    const avgHabitsPerCompletionDay = habitCompletionDates.size > 0
      ? (totalHabitCompletions / habitCompletionDates.size).toFixed(1)
      : 0;

    return res.status(200).json({
      topHabits,
      bottomHabits,
      totalCompletions: totalHabitCompletions,
      diariesWithHabits: visibleDiariesWithHabits,
      totalDiaries: visibleDiaries,
      habitCompletionDays: habitCompletionDates.size,
      avgHabitsPerDiaryWithHabits: parseFloat(avgHabitsPerDiaryWithHabits),
      avgHabitsPerCompletionDay: parseFloat(avgHabitsPerCompletionDay),
      totalHabits
    });
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
});

module.exports = router;
