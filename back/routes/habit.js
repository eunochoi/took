const express = require("express");
const db = require("../models/index.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const { validateDateFormat, getUserTimezone, getTodayInTimezone, getDaysAgoInTimezone, getMonthRange, getYearRange } = require('../function/dateHelper.js');
const { sendError } = require('../utils/errorResponse.js');

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const router = express.Router();
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;

/**
 * 용도: 오늘 습관 현황. 생성된 습관 개수, 오늘 완료한 습관 개수.
 * 요청: tokenCheck
 * 반환: 200 { createdHabits, todayDoneHabits }
 */
router.get("/today", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/today -----');
  const email = req.currentUserEmail;

  try {
    const userTimezone = getUserTimezone(req);
    const todayDate = getTodayInTimezone(userTimezone);
    const [habitCount, todayDiary] = await Promise.all([
      Habit.count({ where: { email } }),
      Diary.findOne({
        where: { email, date: todayDate },
        include: [{ model: Habit, attributes: ['id'] }]
      })
    ]);

    return res.status(200).json({
      createdHabits: habitCount,
      todayDoneHabits: todayDiary?.Habits?.length || 0
    });
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 습관 한 건 조회 (id로).
 * 요청: query id, tokenCheck
 * 반환: 200 Habit / 404
 */
router.get("/", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit?id -----');
  const { id } = req.query;
  const email = req.currentUserEmail;

  if (id == null || id === '') {
    return sendError(res, 400, 'id는 query에 필수입니다.');
  }
  try {
    const habit = await Habit.findOne({
      where: { id, email }
    });

    if (!habit) {
      return sendError(res, 404, '습관을 찾을 수 없습니다.');
    }
    return res.status(200).json(habit);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 습관 목록 조회. sort(ASC/DESC/CUSTOM/PRIORITY), customOrder(쉼표 구분 id) 지원.
 * 요청: query sort, customOrder(선택), tokenCheck
 * 반환: 200 Habit[] (빈 배열 포함)
 */
router.get("/list", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/list -----');
  try {
    const { sort } = req.query;
    let { customOrder } = req.query;
    const email = req.currentUserEmail;

    // customOrder 숫자만 (SQL injection 방지)
    if (typeof customOrder === 'string' && customOrder) {
      customOrder = customOrder.split(',').map(e => Number(e.trim())).filter(n => Number.isFinite(n));
    } else if (!Array.isArray(customOrder)) {
      customOrder = [];
    } else {
      customOrder = customOrder.map(n => Number(n)).filter(n => Number.isFinite(n));
    }

    // 정렬 옵션
    const findOptions = {
      where: { email }
    };

    if (sort === 'ASC' || sort === 'DESC') {
      findOptions.order = [['createdAt', sort]];
    } else if (sort === 'CUSTOM') {
      if (customOrder.length > 0) {
        const safeIds = customOrder.join(',');
        findOptions.order = [
          [sequelize.literal(`CASE WHEN id IN (${safeIds}) THEN 0 ELSE 1 END`), 'ASC'],
          [sequelize.literal(`FIELD(id, ${safeIds})`), 'ASC'],
          ['createdAt', 'ASC']
        ];
      } else {
        findOptions.order = [['createdAt', 'ASC']];
      }
    } else if (sort === 'PRIORITY') {
      findOptions.order = [
        ['priority', 'DESC'],
        ['createdAt', 'ASC'],
      ]
    }

    const habits = await Habit.findAll(findOptions);
    return res.status(200).json(habits);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
});

/**
 * 용도: 특정 습관의 최근 4일 체크 여부. date 기준 당일~3일 전. BETWEEN 사용.
 * 요청: query id(habitId), date(string 'yyyy-MM-dd'), tokenCheck
 * 반환: 200 boolean[] (4일치 순서대로 체크 여부)
 */
router.get("/recent", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/recent -----');
  const { id, date } = req.query;
  const email = req.currentUserEmail;

  try {
    if (!validateDateFormat(date)) {
      return sendError(res, 400, '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)');
    }

    const userTimezone = getUserTimezone(req);
    const startDateStr = getDaysAgoInTimezone(3, userTimezone);

    const recentDiaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [startDateStr, date] }
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: [],
        required: true
      }],
      order: [['date', 'DESC']]
    });

    const foundDates = new Set(recentDiaries.map(d => d.date));

    const recentDates = [
      date,
      getDaysAgoInTimezone(1, userTimezone),
      getDaysAgoInTimezone(2, userTimezone),
      getDaysAgoInTimezone(3, userTimezone)
    ];

    const result = recentDates.map(dateStr => foundDates.has(dateStr));

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})


/**
 * 용도: 한 습관의 한 달 치 기록. 해당 월에 해당 습관이 체크된 일기 목록.
 * 요청: query id(habitId), month(string 'yyyy-MM'), tokenCheck
 * 반환: 200 Diary[] (date: Date, Habit.name)
 */
router.get("/month/single", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/month/single -----');
  const { id, month } = req.query;
  const email = req.currentUserEmail;

  try {
    const { startDate, endDate } = getMonthRange(month);
    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [startDate, endDate] }
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: ['name'],
        required: true
      }]
    });
    return res.status(200).json(diaries);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 한 습관의 해당 연도 월별 완료 횟수. 12개월 배열(인덱스=월, 값=횟수).
 * 요청: query id(habitId), year(string 'yyyy'), tokenCheck
 * 반환: 200 number[12]
 */
router.get("/year/single", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /habit/year/single -----');
  const { id, year: yearParam } = req.query;
  const email = req.currentUserEmail;

  try {
    const { startDate, endDate } = getYearRange(yearParam);
    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [startDate, endDate] }
      },
      attributes: ['date'],
      include: [{
        model: Habit,
        where: { id },
        attributes: [],
        required: true
      }]
    });
    const result = Array(12).fill(0);
    diaries.forEach(diary => {
      const month = parseInt(diary.date.split('-')[1], 10) - 1;
      result[month]++;
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 습관 생성. 이름 중복·최대 18개 제한.
 * 요청: body { habitName, priority }, tokenCheck
 * 반환: 201 Habit / 400 중복 또는 개수 초과
 */
router.post("/", tokenCheck, async (req, res) => {
  console.log('----- method : post, url :  /habit -----');
  const { habitName, priority } = req.body;
  const email = req.currentUserEmail;

  if (habitName == null || typeof habitName !== 'string' || !habitName.trim()) {
    return sendError(res, 400, 'habitName은 필수이며 비어있을 수 없습니다.');
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 404, '유저가 존재하지 않습니다.');
    }
    const existingHabit = await Habit.findOne({
      where: { email, name: habitName }
    });
    if (existingHabit) {
      return sendError(res, 400, '같은 이름을 가진 습관이 이미 존재합니다.');
    }
    const habitCount = await Habit.count({ where: { email } });
    if (habitCount >= 18) {
      return sendError(res, 400, '습관은 최대 18개까지 생성 가능합니다.');
    }
    const habit = await Habit.create({
      UserId: user.id,
      email,
      name: habitName,
      priority
    });

    return res.status(201).json(habit);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 습관 수정. 이름·우선순위 변경. 이름 중복(자기 제외) 불가.
 * 요청: body { habitId, habitName, priority }, tokenCheck
 * 반환: 200 Habit / 404·400
 */
router.patch("/", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url :  /habit -----');
  const email = req.currentUserEmail;
  const { habitId, habitName, priority } = req.body;

  if (habitId == null || habitName == null || typeof habitName !== 'string' || !habitName.trim()) {
    return sendError(res, 400, 'habitId와 habitName은 필수이며 habitName은 비어있을 수 없습니다.');
  }
  try {
    const habit = await Habit.findOne({
      where: { id: habitId, email }
    });
    if (!habit) {
      return sendError(res, 404, '습관이 존재하지 않습니다.');
    }
    const duplicateName = await Habit.findOne({
      where: {
        email,
        name: habitName,
        id: { [Op.ne]: habitId }
      }
    });
    if (duplicateName) {
      return sendError(res, 400, '동일한 이름의 습관이 존재합니다.');
    }
    await habit.update({ name: habitName, priority });
    return res.status(200).json(habit);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 습관 삭제 (DB에서 제거).
 * 요청: query habitId, tokenCheck
 * 반환: 200 "습관이 삭제되었습니다." / 404
 */
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /habit?id -----');
  const email = req.currentUserEmail;
  const { habitId } = req.query;

  if (habitId == null || habitId === '') {
    return sendError(res, 400, 'habitId는 query에 필수입니다.');
  }
  try {
    const habit = await Habit.findOne({
      where: { id: habitId, email }
    });
    if (!habit) {
      return sendError(res, 404, '습관이 존재하지 않습니다.');
    }

    await habit.destroy();
    return res.status(200).json('습관이 삭제되었습니다.');
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})





/**
 * 용도: 해당 날짜에 습관 체크. 일기 없으면 생성(visible false) 후 습관 연결.
 * 요청: body { habitId, date(string 'yyyy-MM-dd') }, tokenCheck
 * 반환: 200 "checked" / 400 에러 메시지
 */
router.post("/check", tokenCheck, async (req, res) => {
  const { habitId, date } = req.body;
  const email = req.currentUserEmail;

  if (habitId == null || date == null) {
    return sendError(res, 400, 'habitId와 date는 body에 필수입니다.');
  }
  if (!validateDateFormat(date)) {
    return sendError(res, 400, '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)');
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error('유저 정보가 존재하지 않습니다.');

      const habit = await Habit.findOne({
        where: { email, id: habitId },
        transaction: t
      });
      if (!habit) throw new Error('습관이 존재하지 않습니다.');

      const [diary] = await Diary.findOrCreate({
        where: { email, date: date },
        defaults: {
          visible: false,
          UserId: user.id,
          email,
          emotion: 0,
          date: date,
          text: '-',
        },
        transaction: t
      });

      await diary.addHabit(habit, { transaction: t });
      return 'checked';
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    const msg = e.message || '습관 체크 중 오류가 발생했습니다.';
    const isNotFound = msg.includes('존재하지 않습니다');
    return sendError(res, isNotFound ? 404 : 400, msg);
  }
})

/**
 * 용도: 해당 날짜 습관 체크 해제. Diary-Habit 연결만 제거.
 * 요청: body { habitId, date(string 'yyyy-MM-dd') }, tokenCheck
 * 반환: 200 "unchecked" / 400 에러 메시지
 */
router.delete("/check", tokenCheck, async (req, res) => {
  const { habitId, date } = req.body;
  const email = req.currentUserEmail;

  if (habitId == null || date == null) {
    return sendError(res, 400, 'habitId와 date는 body에 필수입니다.');
  }
  if (!validateDateFormat(date)) {
    return sendError(res, 400, '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)');
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error('유저 정보가 존재하지 않습니다.');
      const habit = await Habit.findOne({
        where: { email, id: habitId },
        transaction: t
      });
      if (!habit) throw new Error('습관이 존재하지 않습니다.');
      const diary = await Diary.findOne({
        where: { email, date: date },
        transaction: t
      });
      if (!diary) throw new Error('다이어리가 존재하지 않습니다.');
      await diary.removeHabit(habit, { transaction: t });
      return 'unchecked';
    });

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    const msg = e.message || '습관 체크 해제 중 오류가 발생했습니다.';
    const isNotFound = msg.includes('존재하지 않습니다');
    return sendError(res, isNotFound ? 404 : 400, msg);
  }
})


module.exports = router;