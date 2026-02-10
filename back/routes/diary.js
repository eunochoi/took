const express = require("express");
const db = require("../models/index.js");
const tokenCheck = require("../middleware/tokenCheck.js");
const { getOrComputeStreak } = require('../function/computeStreaks.js');
const decrypt = require('../function/decrypt.js');
const encrypt = require('../function/encrypt.js');
const { validateDateFormat, getMonthRange } = require('../function/dateHelper.js');
const { sendError } = require('../utils/errorResponse.js');

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const router = express.Router();
const User = db.User;
const Diary = db.Diary;
const Image = db.Image;
const Habit = db.Habit;

/**
 * 용도: 일기 생성 또는 삭제된 일기 복원. 해당 날짜에 이미 visible 일기 있으면 400.
 * 요청: body { date(string 'yyyy-MM-dd'), text, images[], emotion(0-9) }, tokenCheck
 * 반환: 201 생성된 Diary(date: Date) / 200 복원된 Diary(date: Date) / 404 유저 없음 / 400 { error }
 */
router.post("/", tokenCheck, async (req, res) => {
  console.log('----- method : post, url : /diary -----');
  let { date, text, images, emotion } = req.body;
  const email = req.currentUserEmail;

  if (emotion === undefined || emotion === null || emotion < 0 || emotion > 9) {
    return sendError(res, 400, '감정 값이 올바르지 않습니다. (0-9)');
  }
  if (date == null || (typeof text !== 'string' && text != null)) {
    return sendError(res, 400, 'date와 text는 필수이며 text는 문자열이어야 합니다.');
  }
  if (!Array.isArray(images)) {
    images = [];
  }

  if (!validateDateFormat(date)) {
    return sendError(res, 400, '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)');
  }
  text = encrypt(text ?? '', process.env.DATA_SECRET_KEY);

  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!user) throw new Error("유저가 존재하지 않습니다.");

      const existingDiary = await Diary.findOne({
        where: { email, date: date },
        transaction: t
      });

      let diary;
      if (existingDiary) {
        if (existingDiary.visible) {
          throw new Error('해당 날짜에 일기가 이미 존재합니다.');
        }
        await existingDiary.update({
          visible: true,
          text,
          emotion
        }, { transaction: t });
        diary = existingDiary;
      } else {
        diary = await Diary.create({
          visible: true,
          UserId: user.id,
          email,
          emotion,
          date: date,
          text,
        }, { transaction: t });
      }

      if (images.length > 0) {
        const imagePromises = images.map((src, index) => ({
          src, order: index, diaryId: diary.id
        }));
        await Image.bulkCreate(imagePromises, { transaction: t });
      }

      return { diary, created: !existingDiary };
    });
    await getOrComputeStreak(email, { forceRecompute: true });
    return res.status(result.created ? 201 : 200).json(result.diary);

  } catch (e) {
    console.error(e);
    const isNotFound = e.message === '유저가 존재하지 않습니다.' || e.message === '게시글이 올바르지 않습니다.';
    return sendError(res, isNotFound ? 404 : 400, e.message);
  }
});

/**
 * 용도: 일기 수정. 본문·감정·이미지 교체.
 * 요청: query diaryId, body { text, images[], emotion(0-9) }, tokenCheck
 * 반환: 200 수정된 Diary / 404 유저·게시글 없음 / 400 { error }
 */
router.patch("/", tokenCheck, async (req, res) => {
  console.log('----- method : patch, url : /diary -----');
  const diaryId = req.query.diaryId;
  let { text, images, emotion } = req.body;
  const email = req.currentUserEmail;

  if (!diaryId) {
    return sendError(res, 400, 'diaryId는 query에 필수입니다.');
  }
  if (emotion === undefined || emotion === null || emotion < 0 || emotion > 9) {
    return sendError(res, 400, '감정 값이 올바르지 않습니다. (0-9)');
  }
  if (typeof text !== 'string') {
    return sendError(res, 400, 'text는 문자열이어야 합니다.');
  }
  if (!Array.isArray(images)) {
    images = [];
  }

  text = encrypt(text, process.env.DATA_SECRET_KEY);
  try {
    const result = await sequelize.transaction(async (t) => {
      const currentUser = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!currentUser) throw new Error('유저가 존재하지 않습니다.');

      const diary = await Diary.findOne({
        where: { id: diaryId, UserId: currentUser.id },
        transaction: t
      });
      if (!diary) throw new Error("게시글이 올바르지 않습니다.");

      await diary.update({
        text,
        emotion
      }, { transaction: t });

      await Image.destroy({
        where: { diaryId },
        transaction: t
      });

      if (images.length > 0) {
        const imagePromises = images.map((src, index) => ({
          src, order: index, diaryId
        }));
        await Image.bulkCreate(imagePromises, { transaction: t });
      }

      return diary;
    });

    return res.status(200).json(result);

  } catch (e) {
    console.error(e);
    const isNotFound = e.message === '유저가 존재하지 않습니다.' || e.message === '게시글이 올바르지 않습니다.';
    return sendError(res, isNotFound ? 404 : 400, e.message);
  }
});

/**
 * 용도: 일기 소프트 삭제. visible=false, 텍스트/이미지 비움. streak 캐시 갱신.
 * 요청: query id(diaryId), tokenCheck
 * 반환: 200 "일기 삭제 완료" / 404 유저·게시글 없음 / 400 에러 메시지
 */
router.delete("/", tokenCheck, async (req, res) => {
  console.log('----- method : delete, url :  /diary -----');
  const diaryId = req.query.id;
  const email = req.currentUserEmail;

  if (!diaryId) {
    return sendError(res, 400, 'id(diaryId)는 query에 필수입니다.');
  }

  try {
    await sequelize.transaction(async (t) => {
      const currentUser = await User.findOne({
        where: { email },
        transaction: t
      });
      if (!currentUser) throw new Error('유저가 존재하지 않습니다.');

      const diary = await Diary.findOne({
        where: { id: diaryId, UserId: currentUser.id },
        transaction: t
      });
      if (!diary) throw new Error('게시글이 올바르지 않습니다.');

      await diary.update({
        text: '',
        visible: false,
        emotion: 2,
      }, { transaction: t });

      await Image.destroy({
        where: { diaryId },
        transaction: t
      });
    });
    await getOrComputeStreak(email, { forceRecompute: true });
    return res.status(200).json('일기 삭제 완료');
  } catch (e) {
    console.error(e);
    const isNotFound = e.message === '유저가 존재하지 않습니다.' || e.message === '게시글이 올바르지 않습니다.';
    return sendError(res, isNotFound ? 404 : 400, e.message || '삭제 중 오류가 발생했습니다.');
  }
})

/**
 * 용도: 단일 일기 상세 조회. visible인 것만.
 * 요청: params diaryId, tokenCheck
 * 반환: 200 Diary(date: Date, Images, Habits 포함, text 복호화) / 404
 */
router.get("/id/:diaryId", tokenCheck, async (req, res) => {
  console.log('----- method : get, url : /diary/:id -----');
  const email = req.currentUserEmail;
  const diaryId = req.params.diaryId;

  try {
    const diary = await Diary.findOne({
      where: { email, id: diaryId, visible: true },
      include: [
        { model: Image },
        { model: Habit }
      ],
      order: [[Image, 'order', 'ASC']],
    });

    if (!diary) {
      return sendError(res, 404, '다이어리를 찾을 수 없습니다.');
    }
    diary.text = decrypt(diary.text, process.env.DATA_SECRET_KEY);
    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 일기 목록 페이징·필터. 연월·감정·정렬·페이지 지원.
 * 요청: query sort, search(감정), pageParam, limit, selectedYear, selectedMonth, tokenCheck
 * 반환: 200 Diary[](date: Date, Images, Habits 포함, text 복호화)
 */
router.get("/list", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /diary/list -----');
  const { sort, search, pageParam, limit, selectedYear, selectedMonth } = req.query;
  const email = req.currentUserEmail;
  const sortVal = sort === 'ASC' || sort === 'DESC' ? sort : 'DESC';
  const page = Math.max(0, Number(pageParam) || 0);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
  const offset = page * limitNum;

  try {
    const nYear = Number(selectedYear);
    const nMonth = Number(selectedMonth);

    let rangeStart = '0000-01-01';
    let rangeEnd = '9999-12-31';

    if (nYear && nMonth && nMonth !== 0) {
      const monthStr = String(nMonth).padStart(2, '0');
      rangeStart = `${nYear}-${monthStr}-01`;
      const lastDay = new Date(nYear, nMonth, 0).getDate();  // 말일
      rangeEnd = `${nYear}-${monthStr}-${String(lastDay).padStart(2, '0')}`;
    }

    const where = {
      email,
      visible: true,
      date: { [Op.between]: [rangeStart, rangeEnd] }
    };

    const emotionFilter = Number(search);
    if (emotionFilter !== 10 && emotionFilter >= 0 && emotionFilter <= 9) {
      where.emotion = emotionFilter;
    }
    const diaries = await Diary.findAll({
      where,
      offset,
      limit: limitNum,
      include: [
        { model: Image },
        { model: Habit }
      ],
      order: [
        ['date', sortVal],
        [Image, 'order', 'ASC'],
        [Habit, 'priority', 'DESC']
      ],
    });
    diaries.forEach(diary => {
      diary.text = decrypt(diary.text, process.env.DATA_SECRET_KEY);
    });

    return res.status(200).json(diaries);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 특정 날짜 일기 한 건 조회. 삭제된 일기도 조회 가능.
 * 요청: query date(string 'yyyy-MM-dd'), tokenCheck
 * 반환: 200 Diary(date: Date, Images, Habits 포함) / 404
 */
router.get("/date", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /diary/date -----');
  const { date } = req.query;
  const email = req.currentUserEmail;

  if (!date) {
    return sendError(res, 400, 'date는 query에 필수입니다.');
  }
  if (!validateDateFormat(date)) {
    return sendError(res, 400, '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)');
  }

  try {
    const diary = await Diary.findOne({
      where: { email, date: date },
      include: [
        { model: Image },
        { model: Habit }
      ],
      order: [
        [Image, 'order', 'ASC'],
        [Habit, 'priority', 'DESC']
      ],
    });

    if (!diary) {
      return sendError(res, 404, '다이어리가 존재하지 않습니다.');
    }

    diary.text = decrypt(diary.text, process.env.DATA_SECRET_KEY);
    return res.status(200).json(diary);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

/**
 * 용도: 월별 일기 데이터 조회. 날짜별 일기 존재 여부, 감정, 완료한 습관 정보.
 * 요청: query month ('yyyy-MM'), tokenCheck
 * 반환: 200 [ { date, visible, emotion, Habits: [ { name } ] } ]
 */
router.get("/month", tokenCheck, async (req, res) => {
  console.log('----- method : get, url :  /diary/month -----');
  const { month } = req.query;
  const email = req.currentUserEmail;

  try {
    const { startDate, endDate } = getMonthRange(month);
    const diaries = await Diary.findAll({
      where: {
        email,
        date: { [Op.between]: [startDate, endDate] }
      },
      attributes: ['date', 'visible', 'emotion'],
      include: [{
        model: Habit,
        attributes: ['name']
      }]
    });

    return res.status(200).json(diaries);
  } catch (e) {
    console.error(e);
    return sendError(res, 500, '서버 에러가 발생했습니다.');
  }
})

module.exports = router;